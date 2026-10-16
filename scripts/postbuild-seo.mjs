// Post-build SEO step for the static Netlify deploy.
//
// 1. Writes one HTML file per service page (dist/.../pos/index.html, ...) with its
//    own title, description, canonical URL, social preview tags and structured
//    data, so Google, WhatsApp and LinkedIn read the right page without running JS.
// 2. Adds structured data (organization, website, services, FAQ, breadcrumbs).
// 3. Generates sitemap.xml with the build date and fills %SITE_URL% everywhere.
//
// The copy comes from the Spanish translations, the same text visitors see.
// Netlify sets URL automatically on every build; SITE_URL overrides it.
import { build } from 'esbuild';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const OUT_DIR = 'dist/AstraDev/browser';
const SITE_URL_TOKEN = '%SITE_URL%';
const EMAIL = 'astra.dev.tech@gmail.com';
const siteUrl = (process.env.SITE_URL || process.env.URL || '').replace(/\/$/, '');

if (!siteUrl) {
  console.warn('[postbuild-seo] SITE_URL/URL not set: links stay relative.');
}

const { TRANSLATIONS, SERVICE_PAGE_PATHS, whatsappUrl } = await loadAppData();
const copy = TRANSLATIONS.es;
const today = new Date().toISOString().slice(0, 10);
const abs = (path = '') => `${SITE_URL_TOKEN}/${path}`;
const index = await readFile(`${OUT_DIR}/index.html`, 'utf8');

const organization = {
  '@type': 'ProfessionalService',
  '@id': abs('#organization'),
  name: 'Astra Dev',
  slogan: 'Ideas que construyen futuro',
  description: metaContent(index, 'name', 'description'),
  url: abs(),
  logo: abs('brand/logo-stacked.png'),
  image: abs('og-image.jpg'),
  email: EMAIL,
  areaServed: { '@type': 'Country', name: 'Colombia' },
  knowsLanguage: ['es', 'en', 'pt'],
  priceRange: '$$',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: EMAIL,
    url: whatsappUrl(),
    availableLanguage: ['Spanish', 'English', 'Portuguese'],
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: copy.services.title,
    itemListElement: copy.services.items.map((service) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        ...(service.page && { url: abs(SERVICE_PAGE_PATHS[service.page]) }),
      },
    })),
  },
};

const website = {
  '@type': 'WebSite',
  '@id': abs('#website'),
  name: 'Astra Dev',
  url: abs(),
  inLanguage: 'es',
  publisher: { '@id': abs('#organization') },
};

// Home page: keep its head, add the full structured data graph.
await writePage('index.html', index, {
  graph: [
    organization,
    website,
    webPage(abs(), copy.title, organization.description),
    faqPage(abs(), copy.faq.items),
  ],
});

// One static entry point per service page.
for (const [key, path] of Object.entries(SERVICE_PAGE_PATHS)) {
  const page = copy.servicePages.pages[key];
  const url = abs(path);
  await writePage(`${path}/index.html`, index, {
    title: page.seoTitle,
    description: page.seoDescription,
    url,
    graph: [
      organization,
      website,
      webPage(url, page.seoTitle, page.seoDescription),
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: page.eyebrow,
        serviceType: page.eyebrow,
        description: page.seoDescription,
        url,
        image: abs('og-image.jpg'),
        provider: { '@id': abs('#organization') },
        areaServed: { '@type': 'Country', name: 'Colombia' },
        audience: page.idealFor.map((name) => ({ '@type': 'BusinessAudience', name })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: abs() },
          { '@type': 'ListItem', position: 2, name: page.eyebrow, item: url },
        ],
      },
      faqPage(url, page.faq),
    ],
  });
}

await writeFile(`${OUT_DIR}/sitemap.xml`, sitemap(['', ...Object.values(SERVICE_PAGE_PATHS)]));

const files = ['index.html', 'robots.txt', 'sitemap.xml'].concat(
  Object.values(SERVICE_PAGE_PATHS).map((path) => `${path}/index.html`),
);
for (const file of files) {
  const target = `${OUT_DIR}/${file}`;
  const content = await readFile(target, 'utf8');
  await writeFile(target, content.replaceAll(SITE_URL_TOKEN, siteUrl));
}

console.log(`[postbuild-seo] ${siteUrl || '(relative)'} -> ${files.join(', ')}`);

// ---------------------------------------------------------------------------

/** Bundles the app's translations and route paths so this script reads the same copy. */
async function loadAppData() {
  const result = await build({
    stdin: {
      contents: [
        "export { TRANSLATIONS } from './src/app/core/i18n/translations';",
        "export { SERVICE_PAGE_PATHS } from './src/app/shared/data/service-pages';",
        "export { whatsappUrl } from './src/app/shared/utils/whatsapp';",
      ].join('\n'),
      resolveDir: process.cwd(),
      loader: 'ts',
    },
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
    logLevel: 'silent',
  });
  const code = result.outputFiles[0].text;
  return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
}

async function writePage(file, html, { title, description, url, graph }) {
  if (title) {
    html = replaceOnce(html, /<title>[^<]*<\/title>/, () => `<title>${escapeHtml(title)}</title>`);
    html = setMeta(html, 'property', 'og:title', title);
    html = setMeta(html, 'name', 'twitter:title', title);
  }
  if (description) {
    html = setMeta(html, 'name', 'description', description);
    html = setMeta(html, 'property', 'og:description', description);
    html = setMeta(html, 'name', 'twitter:description', description);
  }
  if (url) {
    html = setMeta(html, 'property', 'og:url', url);
    html = replaceOnce(
      html,
      /(<link rel="canonical" href=")[^"]*(")/,
      (_, open, close) => open + url + close,
    );
  }
  const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(
    /</g,
    '\\u003c',
  );
  html = replaceOnce(
    html,
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    () => `<script type="application/ld+json">${jsonLd}</script>`,
  );

  const target = `${OUT_DIR}/${file}`;
  await mkdir(target.slice(0, target.lastIndexOf('/')), { recursive: true });
  await writeFile(target, html);
}

function webPage(url, name, description) {
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: 'es',
    isPartOf: { '@id': abs('#website') },
    about: { '@id': abs('#organization') },
    primaryImageOfPage: abs('og-image.jpg'),
  };
}

function faqPage(url, items) {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

function sitemap(paths) {
  const urls = paths
    .map(
      (path) => `  <url>\n    <loc>${abs(path)}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function metaPattern(attr, key) {
  return new RegExp(`(<meta\\s+${attr}="${key.replace(/[.:]/g, '\\$&')}"\\s+content=")[^"]*(")`);
}

function metaContent(html, attr, key) {
  const match = html.match(metaPattern(attr, key));
  if (!match) {
    throw new Error(`[postbuild-seo] <meta ${attr}="${key}"> not found in index.html`);
  }
  return html.slice(match.index + match[1].length, match.index + match[0].length - 1);
}

function setMeta(html, attr, key, value) {
  return replaceOnce(
    html,
    metaPattern(attr, key),
    (_, open, close) => open + escapeHtml(value) + close,
  );
}

/** Fails the build if the expected tag is gone, instead of shipping a page without it. */
function replaceOnce(html, pattern, replacer) {
  if (!pattern.test(html)) {
    throw new Error(`[postbuild-seo] ${pattern} not found in index.html`);
  }
  return html.replace(pattern, replacer);
}

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}
