import { whatsappUrl } from '../../shared/utils/whatsapp';
import { AppCopy, Lang } from './i18n.models';

export const TRANSLATIONS: Record<Lang, AppCopy> = {
  es: {
    title: 'AstraDev — Software a la medida e Inteligencia Artificial',
    nav: [
      { label: 'Proyectos', fragment: 'proyectos' },
      { label: 'Soluciones', fragment: 'servicios' },
      { label: 'IA', fragment: 'ia' },
      { label: 'Proceso', fragment: 'proceso' },
      { label: 'Preguntas', fragment: 'preguntas' },
      { label: 'Contacto', fragment: 'contacto' },
    ],
    header: {
      quote: 'Cotizar',
      openMenu: 'Abrir menú',
      language: 'Cambiar idioma',
      theme: 'Cambiar tema',
    },
    whatsapp: {
      href: whatsappUrl('Hola Astra Dev, quiero cotizar un proyecto.'),
      phone: '314 872 1707',
    },
    floating: {
      label: 'Cotizar por WhatsApp',
      aria: 'Escribir a Astra Dev por WhatsApp',
    },
    chat: {
      nudge: '👋 ¿Te ayudo a elegir la solución para tu negocio?',
      nudgeClose: 'Cerrar mensaje',
      open: 'Abrir el asistente de Astra Dev',
      close: 'Cerrar el asistente',
      title: 'Astra · Asistente virtual',
      status: 'Responde al instante',
      greeting:
        '¡Hola! 👋 Soy Astra, el asistente de Astra Dev. Cuéntame qué tipo de negocio tienes o qué quieres resolver y te digo cómo te podemos ayudar.',
      suggestions: [
        '¿Qué pueden hacer con IA?',
        'Quiero validar pagos automáticamente',
        'Tengo una tienda, ¿qué me recomiendas?',
      ],
      placeholder: 'Escribe tu pregunta…',
      send: 'Enviar',
      handoff: 'Hablar con una persona por WhatsApp',
      handoffMessage:
        'Hola Astra Dev, vengo del asistente de la página y quiero hablar con alguien.',
      handoffWithQuery: 'Hola Astra Dev, vengo del asistente de la página. Mi consulta: {query}',
      error: 'No pude responder en este momento. Inténtalo de nuevo o escríbenos por WhatsApp.',
      rateLimited:
        'Estoy recibiendo muchas preguntas. Espera un momento o escríbenos por WhatsApp.',
    },
    hero: {
      badge: 'Software a la medida + Inteligencia Artificial',
      title: 'Tu negocio vendiendo y atendiendo clientes,',
      highlight: 'incluso mientras duermes.',
      body: 'Bots de WhatsApp con IA, sistemas POS, ERP y CRM, y páginas web que trabajan por ti: responden a tus clientes, controlan tu inventario y te muestran cuánto vendes, sin hojas de cálculo.',
      ctaPrimary: 'Cotiza gratis por WhatsApp',
      ctaSecondary: 'Ver proyectos',
      trust: [
        'Te explicamos todo sin tecnicismos',
        'Entregas por etapas',
        'Acompañamiento después de lanzar',
      ],
      chat: {
        name: 'Asistente de tu tienda',
        status: 'en línea',
        messages: [
          { from: 'client', text: 'Hola, ¿tienen los tenis blancos en talla 40?' },
          {
            from: 'business',
            text: '¡Hola! Sí, nos quedan 3 pares. Cuestan $189.900. ¿Te aparto unos?',
          },
          { from: 'client', text: 'Sí, por favor. Paso hoy en la tarde.' },
          {
            from: 'business',
            text: 'Listo, quedaron a tu nombre hasta las 7:00 p. m. ¡Te esperamos!',
          },
        ],
        notificationTitle: 'Venta apartada en tu POS',
        notificationBody: 'El inventario se actualizó solo.',
      },
    },
    services: {
      eyebrow: 'Soluciones',
      title: 'Todo el software que tu negocio necesita',
      intro: 'Elige por dónde empezar. Cada solución se adapta a tu negocio y puede crecer con él.',
      idealFor: 'Ideal para',
      cta: 'Cotizar',
      unsureTitle: '¿No sabes cuál necesitas?',
      unsureBody: 'Cuéntanos qué quieres resolver y te recomendamos la mejor opción.',
      unsureCta: 'Pedir asesoría',
      unsureHref: whatsappUrl(
        'Hola Astra Dev, quiero mejorar mi negocio con software pero no sé por dónde empezar.',
      ),
      popular: 'Más pedido',
      groups: {
        all: 'Todas',
        manage: 'Organiza tu negocio',
        sell: 'Vende más',
        automate: 'Automatiza con IA',
      },
      items: [
        {
          icon: 'point_of_sale',
          group: 'manage',
          popular: true,
          page: 'pos',
          title: 'Sistema POS',
          description:
            'Cobra rápido, factura y controla la caja. Sabes qué se vendió cada día sin hojas de cálculo.',
          idealFor: 'tiendas, restaurantes y ferreterías',
          href: whatsappUrl('Hola Astra Dev, quiero cotizar un sistema POS.'),
        },
        {
          icon: 'inventory_2',
          group: 'manage',
          title: 'ERP',
          description:
            'Inventario, compras, ventas y reportes conectados en un solo sistema para toda la empresa.',
          idealFor: 'distribuidoras y empresas en crecimiento',
          href: whatsappUrl('Hola Astra Dev, quiero cotizar un ERP.'),
        },
        {
          icon: 'groups',
          group: 'manage',
          title: 'CRM',
          description:
            'Organiza clientes y oportunidades. Haz seguimiento a cada venta para que ninguna se pierda.',
          idealFor: 'equipos comerciales y empresas de servicios',
          href: whatsappUrl('Hola Astra Dev, quiero cotizar un CRM.'),
        },
        {
          icon: 'chat',
          group: 'sell',
          popular: true,
          page: 'bot',
          title: 'Bots de WhatsApp',
          description:
            'Un asistente con IA que responde, agenda y vende por WhatsApp a cualquier hora del día.',
          idealFor: 'negocios que reciben muchos mensajes',
          href: whatsappUrl('Hola Astra Dev, quiero cotizar un bot de WhatsApp.'),
        },
        {
          icon: 'web',
          group: 'sell',
          title: 'Páginas web y landing pages',
          description:
            'Sitios rápidos y claros que explican lo que haces y convierten visitas en clientes.',
          idealFor: 'negocios que quieren vender en línea',
          href: whatsappUrl('Hola Astra Dev, quiero cotizar una página web.'),
        },
        {
          icon: 'cloud',
          group: 'sell',
          title: 'Plataformas SaaS',
          description:
            'Convertimos tu idea en un producto web por suscripción, listo para recibir usuarios y cobrar.',
          idealFor: 'emprendedores y startups',
          href: whatsappUrl('Hola Astra Dev, quiero cotizar una plataforma SaaS.'),
        },
        {
          icon: 'neurology',
          group: 'automate',
          page: 'ia',
          title: 'Integraciones de IA',
          description:
            'Conectamos inteligencia artificial a tus sistemas para automatizar tareas y responder con tu propia información.',
          idealFor: 'empresas que quieren ahorrar tiempo',
          href: whatsappUrl(
            'Hola Astra Dev, quiero integrar inteligencia artificial en mi negocio.',
          ),
        },
        {
          icon: 'settings_suggest',
          group: 'automate',
          title: 'Sistemas a la medida',
          description:
            '¿Tu proceso no encaja en ningún programa? Lo construimos a tu forma de trabajar.',
          idealFor: 'operaciones con necesidades únicas',
          href: whatsappUrl('Hola Astra Dev, quiero cotizar un sistema a la medida.'),
        },
      ],
    },
    sectors: {
      eyebrow: 'Para quién',
      title: '¿Tu negocio se parece a alguno de estos?',
      intro: 'Estos son algunos de los problemas que resolvemos todos los días.',
      cta: 'Ver cómo te ayudamos',
      message: 'Hola Astra Dev, vengo de la página. Mi negocio: {sector}. ¿Cómo me pueden ayudar?',
      items: [
        {
          icon: 'storefront',
          title: 'Tiendas y comercios',
          description: 'Caja, inventario y ventas en línea en un mismo lugar.',
        },
        {
          icon: 'restaurant',
          title: 'Restaurantes',
          description: 'Pedidos, domicilios y reservas que llegan por WhatsApp.',
        },
        {
          icon: 'medical_services',
          title: 'Clínicas y consultorios',
          description: 'Agenda de citas y recordatorios automáticos para tus pacientes.',
        },
        {
          icon: 'local_shipping',
          title: 'Distribuidoras',
          description: 'Pedidos, bodegas y cartera bajo control.',
        },
        {
          icon: 'work',
          title: 'Servicios profesionales',
          description: 'Clientes, cotizaciones y seguimiento comercial ordenados.',
        },
        {
          icon: 'rocket_launch',
          title: 'Emprendedores',
          description: 'Tu idea convertida en una app o plataforma lista para vender.',
        },
      ],
    },
    ia: {
      eyebrow: 'Inteligencia artificial',
      title: 'IA que trabaja por tu negocio, no solo un bot',
      intro:
        'Atiende clientes, valida pagos, genera facturas y ayuda en tu tienda. Conectamos la IA a tu operación real para que haga el trabajo repetitivo por ti.',
      discoveryBody:
        'Te armamos una demo con un caso real de tu negocio. Escríbenos por WhatsApp y lo vemos juntos.',
      discoveryCta: 'Pedir una demo',
      discoveryHref: whatsappUrl(
        'Hola Astra Dev, quiero una demo de inteligencia artificial para mi negocio.',
      ),
      items: [
        {
          icon: 'chat',
          title: 'Atención 24/7',
          description: 'Responde, agenda y vende por WhatsApp o en tu web a cualquier hora.',
        },
        {
          icon: 'price_check',
          title: 'Validación de pagos',
          description: 'Lee los comprobantes de transferencia y confirma que el pago llegó.',
        },
        {
          icon: 'receipt_long',
          title: 'Facturación automática',
          description: 'Genera y envía facturas a partir de cada venta o pedido.',
        },
        {
          icon: 'storefront',
          title: 'Asistentes para tiendas',
          description: 'Consulta inventario, recomienda productos y toma pedidos.',
        },
        {
          icon: 'event_available',
          title: 'Agenda y recordatorios',
          description: 'Reserva citas y avisa a tus clientes para que no falten.',
        },
        {
          icon: 'insights',
          title: 'Respuestas con tus datos',
          description: 'Pregúntale por tus ventas o productos y responde con tu información real.',
        },
      ],
      tryNow: 'Pruébalo ahora con Astra',
      demoBusiness: 'Tu negocio',
      demos: [
        {
          label: 'Pagos',
          icon: 'payments',
          messages: [
            { from: 'client', text: 'Ya hice la transferencia, te envío el comprobante 📎' },
            {
              from: 'business',
              text: 'Recibido. Validé el pago de $85.000 ✅ Tu pedido #1042 queda confirmado.',
            },
            { from: 'client', text: '¡Perfecto! ¿Cuándo llega?' },
            {
              from: 'business',
              text: 'Sale hoy y llega mañana antes del mediodía. Te aviso por aquí cuando esté en camino.',
            },
          ],
        },
        {
          label: 'Facturas',
          icon: 'receipt_long',
          messages: [
            { from: 'client', text: '¿Me puedes enviar la factura de mi compra?' },
            {
              from: 'business',
              text: '¡Claro! Ya generé tu factura electrónica #FE-2318 por $240.000.',
            },
            { from: 'client', text: '¿Sale a nombre de mi empresa?' },
            {
              from: 'business',
              text: 'Sí, a nombre de Ferretería El Tornillo con su NIT. Te la envío en PDF 📄',
            },
          ],
        },
        {
          label: 'Tienda',
          icon: 'storefront',
          messages: [
            { from: 'client', text: '¿Tienen el taladro inalámbrico disponible?' },
            { from: 'business', text: 'Sí, nos quedan 4 unidades. ¿Quieres que te aparte uno?' },
            { from: 'client', text: 'Sí, paso en la tarde.' },
            { from: 'business', text: 'Apartado a tu nombre hasta las 6:00 p. m. 🙌' },
          ],
        },
        {
          label: 'Restaurante',
          icon: 'restaurant',
          messages: [
            { from: 'client', text: '¡Hola! ¿Tienen domicilio a esta hora?' },
            {
              from: 'business',
              text: '¡Hola! Sí, entregamos hasta las 10:00 p. m. ¿Te envío el menú?',
            },
            { from: 'client', text: 'Sí, y quiero una hamburguesa doble.' },
            {
              from: 'business',
              text: '¡Listo! Hamburguesa doble anotada 🍔 ¿A qué dirección la enviamos?',
            },
          ],
        },
      ],
    },
    process: {
      eyebrow: 'Cómo trabajamos',
      title: 'De la idea a tu sistema funcionando, en 4 pasos',
      intro: 'Sin tecnicismos y sin sorpresas: siempre sabes en qué va tu proyecto.',
      cta: 'Empezar con el paso 1',
      steps: [
        {
          title: 'Hablamos',
          description:
            'Nos cuentas cómo funciona tu negocio y qué quieres resolver, por WhatsApp o en una llamada.',
        },
        {
          title: 'Te proponemos',
          description: 'Recibes una propuesta con alcance, etapas y precio antes de empezar.',
        },
        {
          title: 'Construimos por etapas',
          description:
            'Ves avances reales, das tu opinión y empiezas a usar partes del sistema desde temprano.',
        },
        {
          title: 'Lanzamos y acompañamos',
          description: 'Lo ponemos en marcha con tu equipo y seguimos mejorándolo contigo.',
        },
      ],
    },
    about: {
      eyebrow: 'Astra Dev',
      title: 'Convertimos ideas en resultados.',
      body: 'Tecnología para negocios reales. Acompañamos cada etapa del proyecto: desde la idea hasta un sistema que crece contigo y genera resultados medibles.',
      stack: 'Tecnologías que usamos',
      pillars: [
        {
          icon: 'verified',
          title: 'Tecnología confiable',
          description: 'Software estable, seguro y listo para operar el día a día de tu empresa.',
        },
        {
          icon: 'group',
          title: 'Acompañamiento en cada etapa',
          description: 'No entregamos y desaparecemos: te ayudamos a implementar, medir y mejorar.',
        },
        {
          icon: 'rocket_launch',
          title: 'Enfocados en resultados',
          description: 'Diseñado para crecer contigo: más ventas, mejor control y menos fricción.',
        },
      ],
    },
    projects: {
      eyebrow: 'Proyectos',
      title: 'Lo que hemos construido',
      note: 'Hecho para negocios reales',
      includes: 'Incluye',
      spec: 'Quiero algo así',
      live: 'Ver sitio en vivo',
      clientBadge: 'Cliente real',
      productBadge: 'Producto propio',
      offerBadge: 'Solución',
      items: [
        {
          kind: 'client',
          code: 'SALUD // 01',
          sector: 'Odontología · Armenia, Quindío',
          title: 'Sitio web del Dr. Cristian Valencia',
          description:
            'Sitio web para el consultorio odontológico del Dr. Cristian Valencia. Presenta sus especialidades, muestra lo que dicen sus pacientes y facilita pedir una cita por WhatsApp.',
          features: [
            'Una página por especialidad',
            'Testimonios de pacientes',
            'Citas por WhatsApp y redes',
            'SEO para aparecer en Google',
            'Español e inglés',
            'Diseño para celular',
          ],
          image: '/projects/dr-cristian-valencia-sitio.jpg',
          imageAlt: 'Sitio web del Dr. Cristian Valencia en un portátil y un celular',
          imageFit: 'contain',
          liveUrl: 'https://drcristianvalencia.com/',
          href: whatsappUrl(
            'Hola Astra Dev, vi el sitio del Dr. Cristian Valencia y quiero una página web para mi negocio.',
          ),
        },
        {
          kind: 'product',
          code: 'RESTAURANTES // 02',
          sector: 'Restaurantes · Producto SaaS',
          title: 'Table Assistant',
          description:
            'Nuestro asistente con IA para restaurantes. Desde la mesa, el cliente explora el menú, pide recomendaciones y hace su pedido sin esperar al mesero. Responde solo con el menú real del restaurante, sin inventar platos ni precios.',
          features: [
            'Mesero virtual con IA',
            'Responde solo con tu menú real',
            'Menú digital por categorías',
            'Pedidos desde la mesa',
            'Recomendaciones según los gustos',
            'Varios restaurantes y mesas',
          ],
          image: '/projects/table-assistant.jpg',
          imageAlt:
            'Table Assistant en un portátil y un celular mostrando el menú y el asistente de mesa',
          href: whatsappUrl('Hola Astra Dev, me interesa Table Assistant para mi restaurante.'),
        },
        {
          kind: 'offer',
          code: 'IA // 03',
          sector: 'Atención al cliente',
          title: 'Chatbot con IA para WhatsApp y tu web',
          description:
            'Un asistente que atiende a tus clientes a cualquier hora con la información real de tu negocio. Usa la misma tecnología de Table Assistant.',
          features: [
            'Responde preguntas frecuentes 24/7',
            'Usa solo la información de tu negocio',
            'Agenda citas y toma pedidos',
            'Funciona en WhatsApp o en tu web',
            'Pasa a una persona cuando hace falta',
            'Se conecta a tu inventario o agenda',
          ],
          image: '/projects/chatbot-whatsapp.jpg',
          imageAlt:
            'Celular con un chat de WhatsApp de Astra Dev respondiendo sobre un punto de venta',
          imageAnchor: 'center',
          href: whatsappUrl('Hola Astra Dev, quiero un chatbot con IA para mi negocio.'),
        },
        {
          kind: 'offer',
          code: 'COMERCIO // 04',
          sector: 'Ventas e inventario',
          title: 'Sistema POS con inventario',
          description:
            'Un sistema para vender en tienda, controlar tus productos y ver el día a día sin hojas de cálculo.',
          features: [
            'Caja y facturación',
            'Inventario en tiempo real',
            'Reportes del día',
            'Alertas de productos por agotarse',
            'Varios usuarios y cajas',
            'Funciona en computador y tablet',
          ],
          image: '/projects/sistema-pos.jpg',
          imageAlt:
            'Cajera usando el punto de venta de Astra Dev, con inventario, total y botón de cobro',
          imageAnchor: 'right',
          href: whatsappUrl('Hola Astra Dev, quiero cotizar un sistema POS con inventario.'),
        },
      ],
    },
    faq: {
      eyebrow: 'Preguntas frecuentes',
      title: 'Lo que nos preguntan antes de empezar',
      intro: '¿Tienes otra duda? Escríbenos y te respondemos.',
      cta: 'Preguntar por WhatsApp',
      href: whatsappUrl('Hola Astra Dev, tengo una pregunta.'),
      items: [
        {
          question: '¿Cuánto cuesta un sistema?',
          answer:
            'Depende de lo que necesites: una página web no cuesta lo mismo que un ERP. Después de hablar contigo te enviamos una propuesta con el precio y las etapas, antes de empezar cualquier trabajo.',
        },
        {
          question: '¿Cuánto tiempo tarda?',
          answer:
            'Depende del alcance. Una página web se entrega mucho más rápido que un sistema completo. En la propuesta te damos las fechas de cada etapa.',
        },
        {
          question: '¿Puedo empezar con algo pequeño?',
          answer:
            'Sí. Puedes empezar con lo que necesitas hoy, por ejemplo un POS o un bot, y ampliarlo cuando tu negocio lo pida.',
        },
        {
          question: '¿Se conecta con lo que ya uso?',
          answer:
            'En la mayoría de los casos, sí. Podemos conectar tu página, tu inventario, tu agenda o WhatsApp para que la información no quede regada.',
        },
        {
          question: '¿El bot de WhatsApp reemplaza a mi equipo?',
          answer:
            'No. Responde lo frecuente a cualquier hora y le pasa la conversación a una persona cuando hace falta.',
        },
        {
          question: '¿Qué pasa después de la entrega?',
          answer:
            'No entregamos y desaparecemos. Te acompañamos para resolver dudas, ajustar lo que haga falta y seguir mejorando.',
        },
      ],
      askAiTitle: '¿Prefieres preguntarle a nuestra IA?',
      askAiBody: 'Astra responde al instante, de día o de noche, con la información de Astra Dev.',
      askAiCta: 'Preguntarle a Astra',
    },
    finalCta: {
      title: '¿Listo para que tu negocio',
      highlight: 'trabaje por ti?',
      body: 'Cuéntanos tu idea hoy y recibe una propuesta con alcance, etapas y precio, sin compromiso.',
      secondary: 'Hablar con Astra (IA)',
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Cuéntanos qué necesitas.',
      body: 'Llena estos datos y se abre WhatsApp con tu mensaje listo para enviar. También puedes escribirnos directamente.',
      formTitle: 'Pide tu cotización',
      formIntro: 'Toma menos de un minuto.',
      name: 'Tu nombre',
      namePlaceholder: 'Ej: Laura Gómez',
      company: 'Empresa o negocio',
      companyPlaceholder: 'Ej: Ferretería El Tornillo',
      optional: 'opcional',
      solution: '¿Qué necesitas?',
      description: 'Cuéntanos un poco más',
      descriptionPlaceholder:
        'Ej: tengo una tienda y quiero controlar el inventario y vender por WhatsApp.',
      submit: 'Continuar en WhatsApp',
      reassurance: 'Sin compromiso · Te respondemos por WhatsApp',
      success: 'Abrimos WhatsApp con tu mensaje. Solo falta que lo envíes.',
      message: {
        greeting: 'Hola Astra Dev, soy {name}',
        company: ' de {company}',
        interest: 'Me interesa: {solution}.',
      },
      channels: [
        {
          icon: 'chat',
          label: 'WhatsApp',
          value: '314 872 1707',
          href: whatsappUrl('Hola Astra Dev, quiero cotizar un proyecto.'),
        },
        {
          icon: 'alternate_email',
          label: 'Correo',
          value: 'astra.dev.tech@gmail.com',
          href: 'mailto:astra.dev.tech@gmail.com',
        },
      ],
      solutions: [
        { value: 'pos', label: 'Sistema POS' },
        { value: 'erp', label: 'ERP' },
        { value: 'crm', label: 'CRM' },
        { value: 'bot', label: 'Bot de WhatsApp' },
        { value: 'ai', label: 'Integración de IA' },
        { value: 'saas', label: 'Plataforma SaaS' },
        { value: 'web', label: 'Página web o landing page' },
        { value: 'custom', label: 'Sistema a la medida' },
        { value: 'unsure', label: 'Aún no sé, quiero asesoría' },
      ],
    },
    announcement: {
      badge: 'Nuevo',
      text: 'IA que valida pagos y genera facturas automáticamente.',
      cta: 'Pide tu demo gratis',
      href: whatsappUrl(
        'Hola Astra Dev, vi el anuncio y quiero una demo de la IA que valida pagos y genera facturas.',
      ),
      close: 'Cerrar anuncio',
    },
    mobileBar: {
      quote: 'Cotiza gratis',
      ask: 'Pregúntale a Astra',
    },
    quiz: {
      eyebrow: 'Cotizador',
      title: 'Descubre qué necesita tu negocio en 30 segundos',
      intro: 'Responde 3 preguntas y te recomendamos por dónde empezar. Sin compromiso.',
      step: 'Paso {n} de {total}',
      back: 'Atrás',
      restart: 'Volver a empezar',
      questions: [
        {
          question: '¿Qué tipo de negocio tienes?',
          options: [
            {
              value: 'store',
              label: 'Tienda o comercio',
              icon: 'storefront',
            },
            {
              value: 'restaurant',
              label: 'Restaurante',
              icon: 'restaurant',
            },
            {
              value: 'health',
              label: 'Clínica o consultorio',
              icon: 'medical_services',
            },
            {
              value: 'distributor',
              label: 'Distribuidora',
              icon: 'local_shipping',
            },
            {
              value: 'services',
              label: 'Servicios profesionales',
              icon: 'work',
            },
            {
              value: 'startup',
              label: 'Emprendimiento o idea',
              icon: 'rocket_launch',
            },
          ],
        },
        {
          question: '¿Qué quieres resolver primero?',
          options: [
            {
              value: 'whatsapp',
              label: 'Atender mejor por WhatsApp',
              icon: 'chat',
            },
            {
              value: 'online',
              label: 'Vender por internet',
              icon: 'shopping_bag',
            },
            {
              value: 'control',
              label: 'Controlar caja e inventario',
              icon: 'inventory_2',
            },
            {
              value: 'automate',
              label: 'Automatizar pagos y facturas',
              icon: 'receipt_long',
            },
            {
              value: 'clients',
              label: 'Organizar clientes y ventas',
              icon: 'groups',
            },
            {
              value: 'product',
              label: 'Crear una app o plataforma',
              icon: 'cloud',
            },
          ],
        },
        {
          question: '¿Para cuándo lo necesitas?',
          options: [
            {
              value: 'now',
              label: 'Lo antes posible',
              icon: 'bolt',
            },
            {
              value: 'month',
              label: 'Este mes',
              icon: 'event',
            },
            {
              value: 'quarter',
              label: 'En 1 a 3 meses',
              icon: 'date_range',
            },
            {
              value: 'exploring',
              label: 'Solo estoy explorando',
              icon: 'explore',
            },
          ],
        },
      ],
      resultTitle: 'Te recomendamos empezar con',
      resultBody:
        'Según lo que nos contaste, este es el mejor punto de partida. Envíanos el resumen y te preparamos una propuesta gratis, con precio y etapas.',
      recommended: 'Recomendado',
      cta: 'Enviar mi resumen por WhatsApp',
      message:
        'Hola Astra Dev, hice el cotizador de la página.\nNegocio: {business}\nQuiero: {goal}\nPlazo: {timeline}\nMe recomendaron: {solutions}',
    },
    calculator: {
      eyebrow: 'Calculadora de ahorro',
      title: '¿Cuánto tiempo te puede ahorrar la IA?',
      intro:
        'Mueve los controles según tu día a día y mira cuántas horas podrías recuperar cada mes.',
      messages: 'Mensajes de clientes que respondes',
      receipts: 'Comprobantes de pago o facturas que revisas',
      perDay: 'al día',
      resultLabel: 'Podrías ahorrar cerca de',
      hoursUnit: 'horas al mes',
      days: '≈ {days} días completos de trabajo',
      note: 'Estimación aproximada: supone 3 minutos por mensaje (la IA atiende cerca del 70 %), 4 minutos por comprobante o factura y 26 días laborales al mes.',
      cta: 'Quiero recuperar ese tiempo',
      message:
        'Hola Astra Dev, usé la calculadora de ahorro: respondo unos {messages} mensajes y reviso {receipts} comprobantes o facturas al día. Quiero automatizarlo.',
    },
    servicePages: {
      details: 'Ver detalles',
      benefitsTitle: 'Qué incluye',
      idealTitle: 'Ideal para',
      projectTitle: 'Míralo en acción',
      faqTitle: 'Preguntas frecuentes',
      ask: 'Pregúntale a Astra',
      pages: {
        pos: {
          seoTitle: 'Sistema POS con inventario a la medida | Astra Dev',
          seoDescription:
            'Sistema POS para tiendas, restaurantes y ferreterías: cobra rápido, factura y controla caja e inventario en tiempo real. Cotiza gratis por WhatsApp.',
          eyebrow: 'Sistema POS',
          title: 'Cobra rápido y controla tu negocio',
          highlight: 'sin hojas de cálculo.',
          body: 'Un punto de venta hecho a la forma en que trabajas: caja, facturación, inventario en tiempo real y reportes del día, en computador o tablet.',
          benefits: [
            {
              icon: 'point_of_sale',
              title: 'Caja y facturación',
              description: 'Cobra en segundos y factura cada venta sin errores.',
            },
            {
              icon: 'inventory_2',
              title: 'Inventario en tiempo real',
              description: 'Cada venta descuenta el stock y te avisa lo que se está agotando.',
            },
            {
              icon: 'bar_chart',
              title: 'Reportes del día',
              description: 'Sabes cuánto vendiste, qué se vendió más y cómo va tu caja.',
            },
            {
              icon: 'group',
              title: 'Varios usuarios y cajas',
              description: 'Cada empleado con su usuario y permisos, en una o varias cajas.',
            },
            {
              icon: 'devices',
              title: 'Computador y tablet',
              description: 'Funciona en los equipos que ya tienes.',
            },
            {
              icon: 'link',
              title: 'Se conecta',
              description: 'Con tu página web, tu bot de WhatsApp o tu facturación.',
            },
          ],
          idealFor: ['Tiendas y comercios', 'Restaurantes', 'Ferreterías', 'Distribuidoras'],
          faq: [
            {
              question: '¿Puedo pasar mis productos actuales?',
              answer:
                'En la mayoría de los casos sí: podemos importar tus productos desde Excel o desde tu sistema actual.',
            },
            {
              question: '¿Puedo empezar con una sola caja?',
              answer:
                'Sí. Empiezas con lo que necesitas hoy y agregas cajas, usuarios o funciones cuando tu negocio crezca.',
            },
            {
              question: '¿Cuánto cuesta?',
              answer:
                'Depende de cuántas cajas, usuarios y funciones necesites. Te enviamos una propuesta con precio y etapas antes de empezar, sin compromiso.',
            },
          ],
          whatsappMessage:
            'Hola Astra Dev, vi la página del sistema POS y quiero cotizar uno para mi negocio.',
        },
        bot: {
          seoTitle: 'Bot de WhatsApp con IA para tu negocio | Astra Dev',
          seoDescription:
            'Bot de WhatsApp con inteligencia artificial que responde, agenda y vende 24/7 con la información real de tu negocio. Pide tu demo gratis.',
          eyebrow: 'Bot de WhatsApp con IA',
          title: 'Atiende y vende por WhatsApp',
          highlight: 'las 24 horas.',
          body: 'Un asistente con IA que responde preguntas, agenda citas y toma pedidos usando solo la información de tu negocio, y pasa la conversación a tu equipo cuando hace falta.',
          benefits: [
            {
              icon: 'chat',
              title: 'Responde al instante',
              description:
                'Precios, horarios, disponibilidad y preguntas frecuentes, a cualquier hora.',
            },
            {
              icon: 'event_available',
              title: 'Agenda citas',
              description:
                'Reserva, confirma y envía recordatorios para que tus clientes no falten.',
            },
            {
              icon: 'shopping_cart',
              title: 'Toma pedidos',
              description: 'Arma el pedido con el cliente y lo deja listo para despachar.',
            },
            {
              icon: 'verified',
              title: 'Solo tu información',
              description: 'Responde con los datos de tu negocio, sin inventar.',
            },
            {
              icon: 'support_agent',
              title: 'Pasa a una persona',
              description: 'Cuando el caso lo necesita, le entrega la conversación a tu equipo.',
            },
            {
              icon: 'link',
              title: 'Conectado a tu operación',
              description: 'Con tu inventario, tu agenda o tu página web.',
            },
          ],
          idealFor: [
            'Restaurantes',
            'Clínicas y consultorios',
            'Tiendas',
            'Servicios profesionales',
          ],
          faq: [
            {
              question: '¿Reemplaza a mi equipo?',
              answer:
                'No. Responde lo frecuente a cualquier hora y le pasa la conversación a una persona cuando hace falta.',
            },
            {
              question: '¿Funciona con mi número de WhatsApp?',
              answer:
                'Lo revisamos contigo según cómo uses WhatsApp hoy, y en la propuesta te explicamos la mejor opción.',
            },
            {
              question: '¿Puedo probarlo antes?',
              answer:
                'Sí. Te armamos una demo con preguntas reales de tu negocio para que veas cómo respondería.',
            },
          ],
          whatsappMessage:
            'Hola Astra Dev, vi la página del bot de WhatsApp y quiero una demo para mi negocio.',
        },
        ia: {
          seoTitle: 'Inteligencia artificial para negocios: pagos, facturas y más | Astra Dev',
          seoDescription:
            'IA que valida pagos, genera facturas, asiste en tu tienda y responde con los datos de tu negocio. No solo bots. Pide tu demo gratis.',
          eyebrow: 'Inteligencia artificial',
          title: 'IA que hace el trabajo repetitivo',
          highlight: 'por ti.',
          body: 'No solo bots: conectamos inteligencia artificial a tu operación para validar pagos, generar facturas, ayudar en tu tienda y responder con tu propia información.',
          benefits: [
            {
              icon: 'chat',
              title: 'Atención 24/7',
              description: 'Responde, agenda y vende por WhatsApp o en tu web a cualquier hora.',
            },
            {
              icon: 'price_check',
              title: 'Validación de pagos',
              description: 'Lee los comprobantes de transferencia y confirma que el pago llegó.',
            },
            {
              icon: 'receipt_long',
              title: 'Facturación automática',
              description: 'Genera y envía facturas a partir de cada venta o pedido.',
            },
            {
              icon: 'storefront',
              title: 'Asistentes para tiendas',
              description: 'Consulta inventario, recomienda productos y toma pedidos.',
            },
            {
              icon: 'event_available',
              title: 'Agenda y recordatorios',
              description: 'Reserva citas y avisa a tus clientes para que no falten.',
            },
            {
              icon: 'insights',
              title: 'Respuestas con tus datos',
              description:
                'Pregúntale por tus ventas o productos y responde con tu información real.',
            },
          ],
          idealFor: ['Tiendas', 'Distribuidoras', 'Restaurantes', 'Empresas de servicios'],
          faq: [
            {
              question: '¿Tengo que cambiar mis sistemas?',
              answer:
                'No necesariamente. En la mayoría de los casos conectamos la IA a lo que ya usas.',
            },
            {
              question: '¿La IA se puede equivocar?',
              answer:
                'La configuramos para trabajar solo con tu información y para pasar a una persona los casos que no puede resolver.',
            },
            {
              question: '¿Por dónde empiezo?',
              answer:
                'Por una tarea que hoy te quite mucho tiempo, como validar pagos o responder mensajes. Empezamos por ahí y crecemos por etapas.',
            },
          ],
          whatsappMessage:
            'Hola Astra Dev, vi la página de inteligencia artificial y quiero una demo para mi negocio.',
        },
      },
    },
    footer: {
      blurb:
        'Software a la medida e inteligencia artificial para negocios reales. Ideas que construyen futuro.',
      explore: 'Explorar',
      solutions: 'Soluciones',
      contact: 'Contacto',
      rights: 'Todos los derechos reservados.',
      proposal: 'Cotizar por WhatsApp',
    },
  },
  en: {
    title: 'AstraDev — Custom Software and Artificial Intelligence',
    nav: [
      { label: 'Work', fragment: 'proyectos' },
      { label: 'Solutions', fragment: 'servicios' },
      { label: 'AI', fragment: 'ia' },
      { label: 'Process', fragment: 'proceso' },
      { label: 'FAQ', fragment: 'preguntas' },
      { label: 'Contact', fragment: 'contacto' },
    ],
    header: {
      quote: 'Get a quote',
      openMenu: 'Open menu',
      language: 'Switch language',
      theme: 'Switch theme',
    },
    whatsapp: {
      href: whatsappUrl('Hi Astra Dev, I would like a quote for a project.'),
      phone: '314 872 1707',
    },
    floating: {
      label: 'Quote on WhatsApp',
      aria: 'Message Astra Dev on WhatsApp',
    },
    chat: {
      nudge: '👋 Can I help you pick the right solution for your business?',
      nudgeClose: 'Close message',
      open: 'Open the Astra Dev assistant',
      close: 'Close the assistant',
      title: 'Astra · Virtual assistant',
      status: 'Replies instantly',
      greeting:
        'Hi! 👋 I’m Astra, Astra Dev’s assistant. Tell me what kind of business you run or what you want to solve, and I’ll tell you how we can help.',
      suggestions: [
        'What can you do with AI?',
        'I want to validate payments automatically',
        'I run a store, what do you recommend?',
      ],
      placeholder: 'Type your question…',
      send: 'Send',
      handoff: 'Talk to a person on WhatsApp',
      handoffMessage:
        'Hi Astra Dev, I come from the website assistant and would like to talk to someone.',
      handoffWithQuery: 'Hi Astra Dev, I come from the website assistant. My question: {query}',
      error: 'I couldn’t answer right now. Try again or message us on WhatsApp.',
      rateLimited: 'I’m getting a lot of questions. Wait a moment or message us on WhatsApp.',
    },
    hero: {
      badge: 'Custom software + Artificial Intelligence',
      title: 'Your business selling and serving customers,',
      highlight: 'even while you sleep.',
      body: 'AI-powered WhatsApp bots, POS, ERP, and CRM systems, and websites that work for you: they answer your customers, track your inventory, and show you how much you sell, no spreadsheets needed.',
      ctaPrimary: 'Get a free quote on WhatsApp',
      ctaSecondary: 'See our work',
      trust: [
        'We explain everything in plain words',
        'Delivered in stages',
        'Support after launch',
      ],
      chat: {
        name: 'Your store assistant',
        status: 'online',
        messages: [
          { from: 'client', text: 'Hi, do you have the white sneakers in size 9?' },
          {
            from: 'business',
            text: 'Hi! Yes, we have 3 pairs left. They are $59. Want me to hold a pair?',
          },
          { from: 'client', text: 'Yes, please. I’ll stop by this afternoon.' },
          {
            from: 'business',
            text: 'Done, they’re on hold under your name until 7:00 p.m. See you!',
          },
        ],
        notificationTitle: 'Sale held in your POS',
        notificationBody: 'Inventory updated automatically.',
      },
    },
    services: {
      eyebrow: 'Solutions',
      title: 'All the software your business needs',
      intro: 'Pick where to start. Every solution adapts to your business and grows with it.',
      idealFor: 'Ideal for',
      cta: 'Get a quote',
      unsureTitle: 'Not sure which one you need?',
      unsureBody: 'Tell us what you want to solve and we’ll recommend the best option.',
      unsureCta: 'Ask for advice',
      unsureHref: whatsappUrl(
        'Hi Astra Dev, I want to improve my business with software but I am not sure where to start.',
      ),
      popular: 'Most requested',
      groups: {
        all: 'All',
        manage: 'Run your business',
        sell: 'Sell more',
        automate: 'Automate with AI',
      },
      items: [
        {
          icon: 'point_of_sale',
          group: 'manage',
          popular: true,
          page: 'pos',
          title: 'POS system',
          description:
            'Charge fast, issue invoices, and control the till. Know what sold every day without spreadsheets.',
          idealFor: 'stores, restaurants, and hardware shops',
          href: whatsappUrl('Hi Astra Dev, I would like a quote for a POS system.'),
        },
        {
          icon: 'inventory_2',
          group: 'manage',
          title: 'ERP',
          description:
            'Inventory, purchasing, sales, and reports connected in a single system for the whole company.',
          idealFor: 'distributors and growing companies',
          href: whatsappUrl('Hi Astra Dev, I would like a quote for an ERP.'),
        },
        {
          icon: 'groups',
          group: 'manage',
          title: 'CRM',
          description:
            'Organize customers and opportunities. Follow up on every deal so none slips away.',
          idealFor: 'sales teams and service companies',
          href: whatsappUrl('Hi Astra Dev, I would like a quote for a CRM.'),
        },
        {
          icon: 'chat',
          group: 'sell',
          popular: true,
          page: 'bot',
          title: 'WhatsApp bots',
          description:
            'An AI assistant that answers, books, and sells on WhatsApp at any hour of the day.',
          idealFor: 'businesses that get lots of messages',
          href: whatsappUrl('Hi Astra Dev, I would like a quote for a WhatsApp bot.'),
        },
        {
          icon: 'web',
          group: 'sell',
          title: 'Websites and landing pages',
          description:
            'Fast, clear sites that explain what you do and turn visitors into customers.',
          idealFor: 'businesses that want to sell online',
          href: whatsappUrl('Hi Astra Dev, I would like a quote for a website.'),
        },
        {
          icon: 'cloud',
          group: 'sell',
          title: 'SaaS platforms',
          description:
            'We turn your idea into a subscription web product, ready to onboard users and charge them.',
          idealFor: 'founders and startups',
          href: whatsappUrl('Hi Astra Dev, I would like a quote for a SaaS platform.'),
        },
        {
          icon: 'neurology',
          group: 'automate',
          page: 'ia',
          title: 'AI integrations',
          description:
            'We connect artificial intelligence to your systems to automate tasks and answer with your own data.',
          idealFor: 'companies that want to save time',
          href: whatsappUrl(
            'Hi Astra Dev, I would like to add artificial intelligence to my business.',
          ),
        },
        {
          icon: 'settings_suggest',
          group: 'automate',
          title: 'Custom systems',
          description:
            'Does your process not fit any off-the-shelf tool? We build it around the way you work.',
          idealFor: 'operations with unique needs',
          href: whatsappUrl('Hi Astra Dev, I would like a quote for a custom system.'),
        },
      ],
    },
    sectors: {
      eyebrow: 'Who it’s for',
      title: 'Does your business look like one of these?',
      intro: 'These are some of the problems we solve every day.',
      cta: 'See how we help',
      message:
        'Hi Astra Dev, I come from your website. My business: {sector}. How can you help me?',
      items: [
        {
          icon: 'storefront',
          title: 'Stores and retail',
          description: 'Till, inventory, and online sales in one place.',
        },
        {
          icon: 'restaurant',
          title: 'Restaurants',
          description: 'Orders, deliveries, and bookings that arrive on WhatsApp.',
        },
        {
          icon: 'medical_services',
          title: 'Clinics and practices',
          description: 'Appointment booking and automatic reminders for your patients.',
        },
        {
          icon: 'local_shipping',
          title: 'Distributors',
          description: 'Orders, warehouses, and receivables under control.',
        },
        {
          icon: 'work',
          title: 'Professional services',
          description: 'Clients, quotes, and sales follow-up kept in order.',
        },
        {
          icon: 'rocket_launch',
          title: 'Founders',
          description: 'Your idea turned into an app or platform ready to sell.',
        },
      ],
    },
    ia: {
      eyebrow: 'Artificial intelligence',
      title: 'AI that works for your business, not just a bot',
      intro:
        'It serves customers, validates payments, issues invoices, and helps run your store. We connect AI to your real operation so it handles the repetitive work for you.',
      discoveryBody:
        'We can build a demo with a real case from your business. Write us on WhatsApp and we’ll look at it together.',
      discoveryCta: 'Request a demo',
      discoveryHref: whatsappUrl(
        'Hi Astra Dev, I would like an artificial intelligence demo for my business.',
      ),
      items: [
        {
          icon: 'chat',
          title: '24/7 customer service',
          description: 'Answers, books, and sells on WhatsApp or your website at any hour.',
        },
        {
          icon: 'price_check',
          title: 'Payment validation',
          description: 'Reads transfer receipts and confirms the payment arrived.',
        },
        {
          icon: 'receipt_long',
          title: 'Automatic invoicing',
          description: 'Creates and sends invoices from every sale or order.',
        },
        {
          icon: 'storefront',
          title: 'Store assistants',
          description: 'Checks inventory, recommends products, and takes orders.',
        },
        {
          icon: 'event_available',
          title: 'Bookings and reminders',
          description: 'Books appointments and reminds customers so they show up.',
        },
        {
          icon: 'insights',
          title: 'Answers from your data',
          description:
            'Ask about your sales or products and get answers from your real information.',
        },
      ],
      tryNow: 'Try it now with Astra',
      demoBusiness: 'Your business',
      demos: [
        {
          label: 'Payments',
          icon: 'payments',
          messages: [
            { from: 'client', text: 'I just made the transfer, sending you the receipt 📎' },
            {
              from: 'business',
              text: 'Got it. I validated your $25 payment ✅ Order #1042 is confirmed.',
            },
            { from: 'client', text: 'Great! When will it arrive?' },
            {
              from: 'business',
              text: 'It ships today and arrives tomorrow before noon. I’ll message you here when it’s on its way.',
            },
          ],
        },
        {
          label: 'Invoices',
          icon: 'receipt_long',
          messages: [
            { from: 'client', text: 'Can you send me the invoice for my purchase?' },
            { from: 'business', text: 'Sure! I just issued your e-invoice #FE-2318 for $70.' },
            { from: 'client', text: 'Is it under my company’s name?' },
            {
              from: 'business',
              text: 'Yes, under Corner Hardware with its tax ID. Sending it as a PDF 📄',
            },
          ],
        },
        {
          label: 'Store',
          icon: 'storefront',
          messages: [
            { from: 'client', text: 'Do you have the cordless drill in stock?' },
            { from: 'business', text: 'Yes, we have 4 left. Want me to hold one for you?' },
            { from: 'client', text: 'Yes, I’ll stop by this afternoon.' },
            { from: 'business', text: 'Held under your name until 6:00 p.m. 🙌' },
          ],
        },
        {
          label: 'Restaurant',
          icon: 'restaurant',
          messages: [
            { from: 'client', text: 'Hi! Do you deliver at this hour?' },
            {
              from: 'business',
              text: 'Hi! Yes, we deliver until 10:00 p.m. Want me to send you the menu?',
            },
            { from: 'client', text: 'Yes, and I’d like a double burger.' },
            {
              from: 'business',
              text: 'Done! Double burger noted 🍔 What address should we send it to?',
            },
          ],
        },
      ],
    },
    process: {
      eyebrow: 'How we work',
      title: 'From idea to a working system, in 4 steps',
      intro: 'No jargon and no surprises: you always know where your project stands.',
      cta: 'Start with step 1',
      steps: [
        {
          title: 'We talk',
          description:
            'You tell us how your business works and what you want to solve, on WhatsApp or a call.',
        },
        {
          title: 'We propose',
          description: 'You get a proposal with scope, stages, and price before any work starts.',
        },
        {
          title: 'We build in stages',
          description:
            'You see real progress, give feedback, and start using parts of the system early.',
        },
        {
          title: 'We launch and support',
          description: 'We roll it out with your team and keep improving it with you.',
        },
      ],
    },
    about: {
      eyebrow: 'Astra Dev',
      title: 'We turn ideas into results.',
      body: 'Technology for real businesses. We walk with you from the idea to a system that grows with you and delivers measurable results.',
      stack: 'Technologies we use',
      pillars: [
        {
          icon: 'verified',
          title: 'Reliable technology',
          description: 'Stable, secure software ready for your company’s daily operation.',
        },
        {
          icon: 'group',
          title: 'Support at every stage',
          description:
            'We don’t hand it over and disappear: we help you implement, measure, and improve.',
        },
        {
          icon: 'rocket_launch',
          title: 'Results first',
          description: 'Built to grow with you: more sales, better control, less friction.',
        },
      ],
    },
    projects: {
      eyebrow: 'Work',
      title: 'What we have built',
      note: 'Made for real businesses',
      includes: 'Includes',
      spec: 'I want something like this',
      live: 'See the live site',
      clientBadge: 'Real client',
      productBadge: 'Our product',
      offerBadge: 'Solution',
      items: [
        {
          kind: 'client',
          code: 'HEALTH // 01',
          sector: 'Dentistry · Armenia, Colombia',
          title: 'Website for Dr. Cristian Valencia',
          description:
            'A website for Dr. Cristian Valencia’s dental practice. It presents his specialties, shows what his patients say, and makes it easy to book an appointment on WhatsApp.',
          features: [
            'A page for each specialty',
            'Patient testimonials',
            'Booking via WhatsApp and social media',
            'SEO to show up on Google',
            'Spanish and English',
            'Built for mobile',
          ],
          image: '/projects/dr-cristian-valencia-sitio.jpg',
          imageAlt: 'Dr. Cristian Valencia’s website on a laptop and a phone',
          imageFit: 'contain',
          liveUrl: 'https://drcristianvalencia.com/',
          href: whatsappUrl(
            'Hi Astra Dev, I saw Dr. Cristian Valencia’s website and I would like a website for my business.',
          ),
        },
        {
          kind: 'product',
          code: 'RESTAURANTS // 02',
          sector: 'Restaurants · SaaS product',
          title: 'Table Assistant',
          description:
            'Our AI assistant for restaurants. From the table, guests browse the menu, ask for recommendations, and place their order without waiting for a server. It answers only with the restaurant’s real menu, never inventing dishes or prices.',
          features: [
            'AI virtual waiter',
            'Answers only with your real menu',
            'Digital menu by category',
            'Orders from the table',
            'Recommendations based on taste',
            'Multiple restaurants and tables',
          ],
          image: '/projects/table-assistant.jpg',
          imageAlt:
            'Table Assistant on a laptop and a phone showing the menu and the table assistant',
          href: whatsappUrl('Hi Astra Dev, I am interested in Table Assistant for my restaurant.'),
        },
        {
          kind: 'offer',
          code: 'AI // 03',
          sector: 'Customer support',
          title: 'AI chatbot for WhatsApp and your website',
          description:
            'An assistant that serves your customers at any hour with your business’s real information. Built on the same technology as Table Assistant.',
          features: [
            'Answers frequent questions 24/7',
            'Uses only your business’s information',
            'Books appointments and takes orders',
            'Works on WhatsApp or your website',
            'Hands over to a person when needed',
            'Connects to your inventory or calendar',
          ],
          image: '/projects/chatbot-whatsapp.jpg',
          imageAlt: 'Phone showing an Astra Dev WhatsApp chat answering about a point of sale',
          imageAnchor: 'center',
          href: whatsappUrl('Hi Astra Dev, I would like an AI chatbot for my business.'),
        },
        {
          kind: 'offer',
          code: 'RETAIL // 04',
          sector: 'Sales and inventory',
          title: 'POS system with inventory',
          description:
            'A system to sell in-store, track your products, and see the day-to-day without spreadsheets.',
          features: [
            'Till and invoicing',
            'Real-time inventory',
            'Daily reports',
            'Low-stock alerts',
            'Multiple users and tills',
            'Works on desktop and tablet',
          ],
          image: '/projects/sistema-pos.jpg',
          imageAlt:
            'Cashier using the Astra Dev point of sale, with inventory, total, and checkout',
          imageAnchor: 'right',
          href: whatsappUrl('Hi Astra Dev, I would like a quote for a POS system with inventory.'),
        },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'What people ask us before starting',
      intro: 'Have another question? Write us and we’ll answer.',
      cta: 'Ask on WhatsApp',
      href: whatsappUrl('Hi Astra Dev, I have a question.'),
      items: [
        {
          question: 'How much does a system cost?',
          answer:
            'It depends on what you need: a website doesn’t cost the same as an ERP. After talking with you we send a proposal with the price and stages, before any work starts.',
        },
        {
          question: 'How long does it take?',
          answer:
            'It depends on the scope. A website ships much faster than a full system. The proposal includes dates for each stage.',
        },
        {
          question: 'Can I start small?',
          answer:
            'Yes. Start with what you need today, like a POS or a bot, and expand it when your business asks for more.',
        },
        {
          question: 'Does it connect with what I already use?',
          answer:
            'In most cases, yes. We can connect your website, inventory, calendar, or WhatsApp so your information isn’t scattered.',
        },
        {
          question: 'Does the WhatsApp bot replace my team?',
          answer:
            'No. It answers the frequent questions at any hour and hands the conversation to a person when needed.',
        },
        {
          question: 'What happens after delivery?',
          answer:
            'We don’t hand it over and disappear. We stay with you to answer questions, adjust what’s needed, and keep improving.',
        },
      ],
      askAiTitle: 'Rather ask our AI?',
      askAiBody: 'Astra answers instantly, day or night, with Astra Dev’s information.',
      askAiCta: 'Ask Astra',
    },
    finalCta: {
      title: 'Ready for your business to',
      highlight: 'work for you?',
      body: 'Tell us your idea today and get a proposal with scope, stages, and price, no commitment.',
      secondary: 'Talk to Astra (AI)',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Tell us what you need.',
      body: 'Fill in these details and WhatsApp opens with your message ready to send. You can also write to us directly.',
      formTitle: 'Request your quote',
      formIntro: 'It takes less than a minute.',
      name: 'Your name',
      namePlaceholder: 'E.g. Laura Gómez',
      company: 'Company or business',
      companyPlaceholder: 'E.g. Corner Hardware',
      optional: 'optional',
      solution: 'What do you need?',
      description: 'Tell us a bit more',
      descriptionPlaceholder:
        'E.g. I run a store and want to track inventory and sell on WhatsApp.',
      submit: 'Continue on WhatsApp',
      reassurance: 'No commitment · We reply on WhatsApp',
      success: 'We opened WhatsApp with your message. Just hit send.',
      message: {
        greeting: 'Hi Astra Dev, I’m {name}',
        company: ' from {company}',
        interest: 'I’m interested in: {solution}.',
      },
      channels: [
        {
          icon: 'chat',
          label: 'WhatsApp',
          value: '314 872 1707',
          href: whatsappUrl('Hi Astra Dev, I would like a quote for a project.'),
        },
        {
          icon: 'alternate_email',
          label: 'Email',
          value: 'astra.dev.tech@gmail.com',
          href: 'mailto:astra.dev.tech@gmail.com',
        },
      ],
      solutions: [
        { value: 'pos', label: 'POS system' },
        { value: 'erp', label: 'ERP' },
        { value: 'crm', label: 'CRM' },
        { value: 'bot', label: 'WhatsApp bot' },
        { value: 'ai', label: 'AI integration' },
        { value: 'saas', label: 'SaaS platform' },
        { value: 'web', label: 'Website or landing page' },
        { value: 'custom', label: 'Custom system' },
        { value: 'unsure', label: 'Not sure yet, I’d like advice' },
      ],
    },
    announcement: {
      badge: 'New',
      text: 'AI that validates payments and issues invoices automatically.',
      cta: 'Get your free demo',
      href: whatsappUrl(
        'Hi Astra Dev, I saw the announcement and would like a demo of the AI that validates payments and issues invoices.',
      ),
      close: 'Close announcement',
    },
    mobileBar: {
      quote: 'Free quote',
      ask: 'Ask Astra',
    },
    quiz: {
      eyebrow: 'Quote finder',
      title: 'Find out what your business needs in 30 seconds',
      intro: 'Answer 3 questions and we’ll recommend where to start. No commitment.',
      step: 'Step {n} of {total}',
      back: 'Back',
      restart: 'Start over',
      questions: [
        {
          question: 'What kind of business do you run?',
          options: [
            {
              value: 'store',
              label: 'Store or retail',
              icon: 'storefront',
            },
            {
              value: 'restaurant',
              label: 'Restaurant',
              icon: 'restaurant',
            },
            {
              value: 'health',
              label: 'Clinic or practice',
              icon: 'medical_services',
            },
            {
              value: 'distributor',
              label: 'Distributor',
              icon: 'local_shipping',
            },
            {
              value: 'services',
              label: 'Professional services',
              icon: 'work',
            },
            {
              value: 'startup',
              label: 'Startup or idea',
              icon: 'rocket_launch',
            },
          ],
        },
        {
          question: 'What do you want to solve first?',
          options: [
            {
              value: 'whatsapp',
              label: 'Better WhatsApp service',
              icon: 'chat',
            },
            {
              value: 'online',
              label: 'Sell online',
              icon: 'shopping_bag',
            },
            {
              value: 'control',
              label: 'Control cash and inventory',
              icon: 'inventory_2',
            },
            {
              value: 'automate',
              label: 'Automate payments and invoices',
              icon: 'receipt_long',
            },
            {
              value: 'clients',
              label: 'Organize customers and sales',
              icon: 'groups',
            },
            {
              value: 'product',
              label: 'Build an app or platform',
              icon: 'cloud',
            },
          ],
        },
        {
          question: 'When do you need it?',
          options: [
            {
              value: 'now',
              label: 'As soon as possible',
              icon: 'bolt',
            },
            {
              value: 'month',
              label: 'This month',
              icon: 'event',
            },
            {
              value: 'quarter',
              label: 'In 1 to 3 months',
              icon: 'date_range',
            },
            {
              value: 'exploring',
              label: 'Just exploring',
              icon: 'explore',
            },
          ],
        },
      ],
      resultTitle: 'We recommend starting with',
      resultBody:
        'Based on what you told us, this is the best starting point. Send us the summary and we’ll prepare a free proposal with price and stages.',
      recommended: 'Recommended',
      cta: 'Send my summary on WhatsApp',
      message:
        'Hi Astra Dev, I used the quote finder on your website.\nBusiness: {business}\nI want to: {goal}\nTimeline: {timeline}\nRecommended: {solutions}',
    },
    calculator: {
      eyebrow: 'Savings calculator',
      title: 'How much time can AI save you?',
      intro:
        'Move the sliders to match your day and see how many hours you could get back every month.',
      messages: 'Customer messages you answer',
      receipts: 'Payment receipts or invoices you check',
      perDay: 'per day',
      resultLabel: 'You could save about',
      hoursUnit: 'hours a month',
      days: '≈ {days} full workdays',
      note: 'Rough estimate: assumes 3 minutes per message (AI handles about 70%), 4 minutes per receipt or invoice, and 26 workdays a month.',
      cta: 'I want that time back',
      message:
        'Hi Astra Dev, I used the savings calculator: I answer about {messages} messages and check {receipts} receipts or invoices a day. I want to automate it.',
    },
    servicePages: {
      details: 'See details',
      benefitsTitle: 'What’s included',
      idealTitle: 'Ideal for',
      projectTitle: 'See it in action',
      faqTitle: 'FAQ',
      ask: 'Ask Astra',
      pages: {
        pos: {
          seoTitle: 'Custom POS system with inventory | Astra Dev',
          seoDescription:
            'POS system for stores, restaurants, and hardware shops: charge fast, invoice, and track cash and inventory in real time. Get a free quote on WhatsApp.',
          eyebrow: 'POS system',
          title: 'Charge fast and control your business',
          highlight: 'without spreadsheets.',
          body: 'A point of sale built around the way you work: till, invoicing, real-time inventory, and daily reports, on desktop or tablet.',
          benefits: [
            {
              icon: 'point_of_sale',
              title: 'Till and invoicing',
              description: 'Charge in seconds and invoice every sale without mistakes.',
            },
            {
              icon: 'inventory_2',
              title: 'Real-time inventory',
              description: 'Every sale updates stock and warns you about low items.',
            },
            {
              icon: 'bar_chart',
              title: 'Daily reports',
              description: 'Know how much you sold, what sold most, and how your till is doing.',
            },
            {
              icon: 'group',
              title: 'Multiple users and tills',
              description:
                'Each employee with their own user and permissions, on one or more tills.',
            },
            {
              icon: 'devices',
              title: 'Desktop and tablet',
              description: 'Works on the devices you already have.',
            },
            {
              icon: 'link',
              title: 'Connected',
              description: 'With your website, your WhatsApp bot, or your invoicing.',
            },
          ],
          idealFor: ['Stores and retail', 'Restaurants', 'Hardware shops', 'Distributors'],
          faq: [
            {
              question: 'Can I bring my current products?',
              answer:
                'In most cases, yes: we can import your products from Excel or your current system.',
            },
            {
              question: 'Can I start with a single till?',
              answer:
                'Yes. Start with what you need today and add tills, users, or features as your business grows.',
            },
            {
              question: 'How much does it cost?',
              answer:
                'It depends on how many tills, users, and features you need. We send a proposal with price and stages before starting, no commitment.',
            },
          ],
          whatsappMessage:
            'Hi Astra Dev, I saw the POS system page and would like a quote for my business.',
        },
        bot: {
          seoTitle: 'AI WhatsApp bot for your business | Astra Dev',
          seoDescription:
            'AI-powered WhatsApp bot that answers, books, and sells 24/7 with your business’s real information. Get your free demo.',
          eyebrow: 'AI WhatsApp bot',
          title: 'Serve and sell on WhatsApp',
          highlight: '24 hours a day.',
          body: 'An AI assistant that answers questions, books appointments, and takes orders using only your business’s information, and hands the conversation to your team when needed.',
          benefits: [
            {
              icon: 'chat',
              title: 'Replies instantly',
              description: 'Prices, hours, availability, and FAQs, at any hour.',
            },
            {
              icon: 'event_available',
              title: 'Books appointments',
              description: 'Books, confirms, and sends reminders so customers show up.',
            },
            {
              icon: 'shopping_cart',
              title: 'Takes orders',
              description: 'Builds the order with the customer and leaves it ready to ship.',
            },
            {
              icon: 'verified',
              title: 'Only your information',
              description: 'Answers with your business’s data, never making things up.',
            },
            {
              icon: 'support_agent',
              title: 'Hands over to a person',
              description: 'When a case needs it, it passes the conversation to your team.',
            },
            {
              icon: 'link',
              title: 'Connected to your operation',
              description: 'With your inventory, calendar, or website.',
            },
          ],
          idealFor: ['Restaurants', 'Clinics and practices', 'Stores', 'Professional services'],
          faq: [
            {
              question: 'Does it replace my team?',
              answer:
                'No. It answers the frequent questions at any hour and hands the conversation to a person when needed.',
            },
            {
              question: 'Does it work with my WhatsApp number?',
              answer:
                'We review it with you based on how you use WhatsApp today, and the proposal explains the best option.',
            },
            {
              question: 'Can I try it first?',
              answer:
                'Yes. We build a demo with real questions from your business so you can see how it would answer.',
            },
          ],
          whatsappMessage:
            'Hi Astra Dev, I saw the WhatsApp bot page and would like a demo for my business.',
        },
        ia: {
          seoTitle: 'AI for business: payments, invoices, and more | Astra Dev',
          seoDescription:
            'AI that validates payments, issues invoices, helps run your store, and answers with your business data. Not just bots. Get your free demo.',
          eyebrow: 'Artificial intelligence',
          title: 'AI that does the repetitive work',
          highlight: 'for you.',
          body: 'Not just bots: we connect AI to your operation to validate payments, issue invoices, help in your store, and answer with your own information.',
          benefits: [
            {
              icon: 'chat',
              title: '24/7 customer service',
              description: 'Answers, books, and sells on WhatsApp or your website at any hour.',
            },
            {
              icon: 'price_check',
              title: 'Payment validation',
              description: 'Reads transfer receipts and confirms the payment arrived.',
            },
            {
              icon: 'receipt_long',
              title: 'Automatic invoicing',
              description: 'Creates and sends invoices from every sale or order.',
            },
            {
              icon: 'storefront',
              title: 'Store assistants',
              description: 'Checks inventory, recommends products, and takes orders.',
            },
            {
              icon: 'event_available',
              title: 'Bookings and reminders',
              description: 'Books appointments and reminds customers so they show up.',
            },
            {
              icon: 'insights',
              title: 'Answers from your data',
              description:
                'Ask about your sales or products and get answers from your real information.',
            },
          ],
          idealFor: ['Stores', 'Distributors', 'Restaurants', 'Service companies'],
          faq: [
            {
              question: 'Do I have to change my systems?',
              answer: 'Not necessarily. In most cases we connect the AI to what you already use.',
            },
            {
              question: 'Can the AI make mistakes?',
              answer:
                'We set it up to work only with your information and to hand cases it can’t solve to a person.',
            },
            {
              question: 'Where do I start?',
              answer:
                'With a task that takes up a lot of your time today, like validating payments or answering messages. We start there and grow in stages.',
            },
          ],
          whatsappMessage:
            'Hi Astra Dev, I saw the artificial intelligence page and would like a demo for my business.',
        },
      },
    },
    footer: {
      blurb: 'Custom software and AI for real businesses. Ideas that build the future.',
      explore: 'Explore',
      solutions: 'Solutions',
      contact: 'Contact',
      rights: 'All rights reserved.',
      proposal: 'Get a quote on WhatsApp',
    },
  },
  pt: {
    title: 'AstraDev — Software sob medida e Inteligência Artificial',
    nav: [
      { label: 'Projetos', fragment: 'proyectos' },
      { label: 'Soluções', fragment: 'servicios' },
      { label: 'IA', fragment: 'ia' },
      { label: 'Processo', fragment: 'proceso' },
      { label: 'Perguntas', fragment: 'preguntas' },
      { label: 'Contato', fragment: 'contacto' },
    ],
    header: {
      quote: 'Orçamento',
      openMenu: 'Abrir menu',
      language: 'Mudar idioma',
      theme: 'Mudar tema',
    },
    whatsapp: {
      href: whatsappUrl('Olá Astra Dev, quero um orçamento para um projeto.'),
      phone: '314 872 1707',
    },
    floating: {
      label: 'Orçamento pelo WhatsApp',
      aria: 'Falar com a Astra Dev pelo WhatsApp',
    },
    chat: {
      nudge: '👋 Posso te ajudar a escolher a solução para o seu negócio?',
      nudgeClose: 'Fechar mensagem',
      open: 'Abrir o assistente da Astra Dev',
      close: 'Fechar o assistente',
      title: 'Astra · Assistente virtual',
      status: 'Responde na hora',
      greeting:
        'Olá! 👋 Sou a Astra, assistente da Astra Dev. Conte que tipo de negócio você tem ou o que quer resolver e eu digo como podemos ajudar.',
      suggestions: [
        'O que vocês fazem com IA?',
        'Quero validar pagamentos automaticamente',
        'Tenho uma loja, o que você recomenda?',
      ],
      placeholder: 'Digite sua pergunta…',
      send: 'Enviar',
      handoff: 'Falar com uma pessoa pelo WhatsApp',
      handoffMessage: 'Olá Astra Dev, vim do assistente do site e quero falar com alguém.',
      handoffWithQuery: 'Olá Astra Dev, vim do assistente do site. Minha dúvida: {query}',
      error: 'Não consegui responder agora. Tente de novo ou fale com a gente pelo WhatsApp.',
      rateLimited:
        'Estou recebendo muitas perguntas. Espere um pouco ou fale com a gente pelo WhatsApp.',
    },
    hero: {
      badge: 'Software sob medida + Inteligência Artificial',
      title: 'Seu negócio vendendo e atendendo clientes,',
      highlight: 'até enquanto você dorme.',
      body: 'Bots de WhatsApp com IA, sistemas PDV, ERP e CRM, e sites que trabalham por você: respondem seus clientes, controlam seu estoque e mostram quanto você vende, sem planilhas.',
      ctaPrimary: 'Orçamento grátis pelo WhatsApp',
      ctaSecondary: 'Ver projetos',
      trust: [
        'Explicamos tudo sem termos técnicos',
        'Entregas por etapas',
        'Acompanhamento depois do lançamento',
      ],
      chat: {
        name: 'Assistente da sua loja',
        status: 'online',
        messages: [
          { from: 'client', text: 'Oi, vocês têm o tênis branco no número 40?' },
          {
            from: 'business',
            text: 'Oi! Temos sim, restam 3 pares. Custa R$ 289,90. Quer que eu separe um?',
          },
          { from: 'client', text: 'Quero, por favor. Passo aí hoje à tarde.' },
          {
            from: 'business',
            text: 'Pronto, ficou reservado no seu nome até as 19h. Te esperamos!',
          },
        ],
        notificationTitle: 'Venda reservada no seu PDV',
        notificationBody: 'O estoque foi atualizado sozinho.',
      },
    },
    services: {
      eyebrow: 'Soluções',
      title: 'Todo o software que o seu negócio precisa',
      intro: 'Escolha por onde começar. Cada solução se adapta ao seu negócio e cresce com ele.',
      idealFor: 'Ideal para',
      cta: 'Pedir orçamento',
      unsureTitle: 'Não sabe qual você precisa?',
      unsureBody: 'Conte o que você quer resolver e recomendamos a melhor opção.',
      unsureCta: 'Pedir consultoria',
      unsureHref: whatsappUrl(
        'Olá Astra Dev, quero melhorar meu negócio com software, mas não sei por onde começar.',
      ),
      popular: 'Mais pedido',
      groups: {
        all: 'Todas',
        manage: 'Organize seu negócio',
        sell: 'Venda mais',
        automate: 'Automatize com IA',
      },
      items: [
        {
          icon: 'point_of_sale',
          group: 'manage',
          popular: true,
          page: 'pos',
          title: 'Sistema PDV',
          description:
            'Cobre rápido, emita notas e controle o caixa. Saiba o que foi vendido a cada dia sem planilhas.',
          idealFor: 'lojas, restaurantes e materiais de construção',
          href: whatsappUrl('Olá Astra Dev, quero um orçamento de sistema PDV.'),
        },
        {
          icon: 'inventory_2',
          group: 'manage',
          title: 'ERP',
          description:
            'Estoque, compras, vendas e relatórios conectados em um único sistema para toda a empresa.',
          idealFor: 'distribuidoras e empresas em crescimento',
          href: whatsappUrl('Olá Astra Dev, quero um orçamento de ERP.'),
        },
        {
          icon: 'groups',
          group: 'manage',
          title: 'CRM',
          description:
            'Organize clientes e oportunidades. Acompanhe cada venda para que nenhuma se perca.',
          idealFor: 'equipes comerciais e empresas de serviços',
          href: whatsappUrl('Olá Astra Dev, quero um orçamento de CRM.'),
        },
        {
          icon: 'chat',
          group: 'sell',
          popular: true,
          page: 'bot',
          title: 'Bots de WhatsApp',
          description:
            'Um assistente com IA que responde, agenda e vende pelo WhatsApp a qualquer hora do dia.',
          idealFor: 'negócios que recebem muitas mensagens',
          href: whatsappUrl('Olá Astra Dev, quero um orçamento de bot de WhatsApp.'),
        },
        {
          icon: 'web',
          group: 'sell',
          title: 'Sites e landing pages',
          description:
            'Sites rápidos e claros que explicam o que você faz e transformam visitas em clientes.',
          idealFor: 'negócios que querem vender on-line',
          href: whatsappUrl('Olá Astra Dev, quero um orçamento de site.'),
        },
        {
          icon: 'cloud',
          group: 'sell',
          title: 'Plataformas SaaS',
          description:
            'Transformamos sua ideia em um produto web por assinatura, pronto para receber usuários e cobrar.',
          idealFor: 'empreendedores e startups',
          href: whatsappUrl('Olá Astra Dev, quero um orçamento de plataforma SaaS.'),
        },
        {
          icon: 'neurology',
          group: 'automate',
          page: 'ia',
          title: 'Integrações de IA',
          description:
            'Conectamos inteligência artificial aos seus sistemas para automatizar tarefas e responder com as suas próprias informações.',
          idealFor: 'empresas que querem economizar tempo',
          href: whatsappUrl(
            'Olá Astra Dev, quero integrar inteligência artificial ao meu negócio.',
          ),
        },
        {
          icon: 'settings_suggest',
          group: 'automate',
          title: 'Sistemas sob medida',
          description:
            'Seu processo não se encaixa em nenhum programa? Construímos do jeito que você trabalha.',
          idealFor: 'operações com necessidades únicas',
          href: whatsappUrl('Olá Astra Dev, quero um orçamento de sistema sob medida.'),
        },
      ],
    },
    sectors: {
      eyebrow: 'Para quem',
      title: 'Seu negócio se parece com algum destes?',
      intro: 'Estes são alguns dos problemas que resolvemos todos os dias.',
      cta: 'Ver como ajudamos',
      message: 'Olá Astra Dev, vim do site. Meu negócio: {sector}. Como vocês podem me ajudar?',
      items: [
        {
          icon: 'storefront',
          title: 'Lojas e comércio',
          description: 'Caixa, estoque e vendas on-line em um só lugar.',
        },
        {
          icon: 'restaurant',
          title: 'Restaurantes',
          description: 'Pedidos, entregas e reservas que chegam pelo WhatsApp.',
        },
        {
          icon: 'medical_services',
          title: 'Clínicas e consultórios',
          description: 'Agenda de consultas e lembretes automáticos para seus pacientes.',
        },
        {
          icon: 'local_shipping',
          title: 'Distribuidoras',
          description: 'Pedidos, depósitos e contas a receber sob controle.',
        },
        {
          icon: 'work',
          title: 'Serviços profissionais',
          description: 'Clientes, orçamentos e acompanhamento comercial organizados.',
        },
        {
          icon: 'rocket_launch',
          title: 'Empreendedores',
          description: 'Sua ideia transformada em um app ou plataforma pronta para vender.',
        },
      ],
    },
    ia: {
      eyebrow: 'Inteligência artificial',
      title: 'IA que trabalha pelo seu negócio, não só um bot',
      intro:
        'Atende clientes, valida pagamentos, emite notas fiscais e ajuda na sua loja. Conectamos a IA à sua operação real para que ela faça o trabalho repetitivo por você.',
      discoveryBody:
        'Montamos uma demo com um caso real do seu negócio. Fale com a gente pelo WhatsApp e vemos juntos.',
      discoveryCta: 'Pedir uma demo',
      discoveryHref: whatsappUrl(
        'Olá Astra Dev, quero uma demo de inteligência artificial para o meu negócio.',
      ),
      items: [
        {
          icon: 'chat',
          title: 'Atendimento 24/7',
          description: 'Responde, agenda e vende pelo WhatsApp ou no seu site a qualquer hora.',
        },
        {
          icon: 'price_check',
          title: 'Validação de pagamentos',
          description: 'Lê os comprovantes de transferência e confirma que o pagamento caiu.',
        },
        {
          icon: 'receipt_long',
          title: 'Notas fiscais automáticas',
          description: 'Gera e envia notas a partir de cada venda ou pedido.',
        },
        {
          icon: 'storefront',
          title: 'Assistentes para lojas',
          description: 'Consulta o estoque, recomenda produtos e recebe pedidos.',
        },
        {
          icon: 'event_available',
          title: 'Agenda e lembretes',
          description: 'Marca horários e avisa seus clientes para que não faltem.',
        },
        {
          icon: 'insights',
          title: 'Respostas com seus dados',
          description:
            'Pergunte sobre suas vendas ou produtos e receba respostas com suas informações reais.',
        },
      ],
      tryNow: 'Teste agora com a Astra',
      demoBusiness: 'Seu negócio',
      demos: [
        {
          label: 'Pagamentos',
          icon: 'payments',
          messages: [
            { from: 'client', text: 'Já fiz o Pix, te mando o comprovante 📎' },
            {
              from: 'business',
              text: 'Recebido. Validei o pagamento de R$ 120,00 ✅ Seu pedido #1042 está confirmado.',
            },
            { from: 'client', text: 'Perfeito! Quando chega?' },
            {
              from: 'business',
              text: 'Sai hoje e chega amanhã antes do meio-dia. Te aviso por aqui quando sair para entrega.',
            },
          ],
        },
        {
          label: 'Notas fiscais',
          icon: 'receipt_long',
          messages: [
            { from: 'client', text: 'Pode me enviar a nota fiscal da minha compra?' },
            {
              from: 'business',
              text: 'Claro! Já emiti sua nota fiscal eletrônica nº 2318 de R$ 350,00.',
            },
            { from: 'client', text: 'Sai no nome da minha empresa?' },
            {
              from: 'business',
              text: 'Sim, no nome da Loja Bom Preço com o CNPJ. Te envio em PDF 📄',
            },
          ],
        },
        {
          label: 'Loja',
          icon: 'storefront',
          messages: [
            { from: 'client', text: 'Vocês têm a furadeira sem fio disponível?' },
            { from: 'business', text: 'Temos sim, restam 4 unidades. Quer que eu separe uma?' },
            { from: 'client', text: 'Quero, passo aí à tarde.' },
            { from: 'business', text: 'Separada no seu nome até as 18h 🙌' },
          ],
        },
        {
          label: 'Restaurante',
          icon: 'restaurant',
          messages: [
            { from: 'client', text: 'Oi! Vocês fazem entrega a essa hora?' },
            {
              from: 'business',
              text: 'Oi! Fazemos sim, até as 22h. Quer que eu envie o cardápio?',
            },
            { from: 'client', text: 'Quero, e um hambúrguer duplo.' },
            {
              from: 'business',
              text: 'Pronto! Hambúrguer duplo anotado 🍔 Para qual endereço enviamos?',
            },
          ],
        },
      ],
    },
    process: {
      eyebrow: 'Como trabalhamos',
      title: 'Da ideia ao seu sistema funcionando, em 4 passos',
      intro: 'Sem termos técnicos e sem surpresas: você sempre sabe em que pé está o seu projeto.',
      cta: 'Começar pelo passo 1',
      steps: [
        {
          title: 'Conversamos',
          description:
            'Você conta como seu negócio funciona e o que quer resolver, pelo WhatsApp ou em uma chamada.',
        },
        {
          title: 'Fazemos a proposta',
          description: 'Você recebe uma proposta com escopo, etapas e preço antes de começar.',
        },
        {
          title: 'Construímos por etapas',
          description:
            'Você vê avanços reais, dá sua opinião e começa a usar partes do sistema desde cedo.',
        },
        {
          title: 'Lançamos e acompanhamos',
          description: 'Colocamos em funcionamento com sua equipe e seguimos melhorando com você.',
        },
      ],
    },
    about: {
      eyebrow: 'Astra Dev',
      title: 'Transformamos ideias em resultados.',
      body: 'Tecnologia para negócios reais. Acompanhamos cada etapa do projeto: da ideia até um sistema que cresce com você e gera resultados mensuráveis.',
      stack: 'Tecnologias que usamos',
      pillars: [
        {
          icon: 'verified',
          title: 'Tecnologia confiável',
          description: 'Software estável, seguro e pronto para o dia a dia da sua empresa.',
        },
        {
          icon: 'group',
          title: 'Acompanhamento em cada etapa',
          description: 'Não entregamos e sumimos: ajudamos você a implementar, medir e melhorar.',
        },
        {
          icon: 'rocket_launch',
          title: 'Foco em resultados',
          description: 'Feito para crescer com você: mais vendas, mais controle e menos atrito.',
        },
      ],
    },
    projects: {
      eyebrow: 'Projetos',
      title: 'O que já construímos',
      note: 'Feito para negócios reais',
      includes: 'Inclui',
      spec: 'Quero algo assim',
      live: 'Ver site no ar',
      clientBadge: 'Cliente real',
      productBadge: 'Produto próprio',
      offerBadge: 'Solução',
      items: [
        {
          kind: 'client',
          code: 'SAÚDE // 01',
          sector: 'Odontologia · Armenia, Colômbia',
          title: 'Site do Dr. Cristian Valencia',
          description:
            'Site para o consultório odontológico do Dr. Cristian Valencia. Apresenta suas especialidades, mostra o que dizem seus pacientes e facilita marcar uma consulta pelo WhatsApp.',
          features: [
            'Uma página por especialidade',
            'Depoimentos de pacientes',
            'Consultas pelo WhatsApp e redes',
            'SEO para aparecer no Google',
            'Espanhol e inglês',
            'Pensado para celular',
          ],
          image: '/projects/dr-cristian-valencia-sitio.jpg',
          imageAlt: 'Site do Dr. Cristian Valencia em um notebook e um celular',
          imageFit: 'contain',
          liveUrl: 'https://drcristianvalencia.com/',
          href: whatsappUrl(
            'Olá Astra Dev, vi o site do Dr. Cristian Valencia e quero um site para o meu negócio.',
          ),
        },
        {
          kind: 'product',
          code: 'RESTAURANTES // 02',
          sector: 'Restaurantes · Produto SaaS',
          title: 'Table Assistant',
          description:
            'Nosso assistente com IA para restaurantes. Da mesa, o cliente explora o cardápio, pede recomendações e faz o pedido sem esperar o garçom. Responde só com o cardápio real do restaurante, sem inventar pratos nem preços.',
          features: [
            'Garçom virtual com IA',
            'Responde só com seu cardápio real',
            'Cardápio digital por categorias',
            'Pedidos direto da mesa',
            'Recomendações conforme o gosto',
            'Vários restaurantes e mesas',
          ],
          image: '/projects/table-assistant.jpg',
          imageAlt:
            'Table Assistant em um notebook e um celular mostrando o cardápio e o assistente de mesa',
          href: whatsappUrl(
            'Olá Astra Dev, tenho interesse no Table Assistant para o meu restaurante.',
          ),
        },
        {
          kind: 'offer',
          code: 'IA // 03',
          sector: 'Atendimento ao cliente',
          title: 'Chatbot com IA para WhatsApp e seu site',
          description:
            'Um assistente que atende seus clientes a qualquer hora com as informações reais do seu negócio. Usa a mesma tecnologia do Table Assistant.',
          features: [
            'Responde perguntas frequentes 24/7',
            'Usa só as informações do seu negócio',
            'Agenda horários e recebe pedidos',
            'Funciona no WhatsApp ou no seu site',
            'Passa para uma pessoa quando precisa',
            'Conecta ao seu estoque ou agenda',
          ],
          image: '/projects/chatbot-whatsapp.jpg',
          imageAlt:
            'Celular com um chat de WhatsApp da Astra Dev respondendo sobre um ponto de venda',
          imageAnchor: 'center',
          href: whatsappUrl('Olá Astra Dev, quero um chatbot com IA para o meu negócio.'),
        },
        {
          kind: 'offer',
          code: 'COMÉRCIO // 04',
          sector: 'Vendas e estoque',
          title: 'Sistema PDV com estoque',
          description:
            'Um sistema para vender na loja, controlar seus produtos e acompanhar o dia a dia sem planilhas.',
          features: [
            'Caixa e emissão de notas',
            'Estoque em tempo real',
            'Relatórios do dia',
            'Alertas de produtos acabando',
            'Vários usuários e caixas',
            'Funciona no computador e no tablet',
          ],
          image: '/projects/sistema-pos.jpg',
          imageAlt:
            'Operadora de caixa usando o ponto de venda da Astra Dev, com estoque, total e botão de cobrar',
          imageAnchor: 'right',
          href: whatsappUrl('Olá Astra Dev, quero um orçamento de sistema PDV com estoque.'),
        },
      ],
    },
    faq: {
      eyebrow: 'Perguntas frequentes',
      title: 'O que nos perguntam antes de começar',
      intro: 'Tem outra dúvida? Escreva para a gente e respondemos.',
      cta: 'Perguntar pelo WhatsApp',
      href: whatsappUrl('Olá Astra Dev, tenho uma pergunta.'),
      items: [
        {
          question: 'Quanto custa um sistema?',
          answer:
            'Depende do que você precisa: um site não custa o mesmo que um ERP. Depois de conversar com você, enviamos uma proposta com o preço e as etapas, antes de começar qualquer trabalho.',
        },
        {
          question: 'Quanto tempo demora?',
          answer:
            'Depende do escopo. Um site fica pronto bem mais rápido que um sistema completo. Na proposta informamos as datas de cada etapa.',
        },
        {
          question: 'Posso começar com algo pequeno?',
          answer:
            'Sim. Você pode começar com o que precisa hoje, por exemplo um PDV ou um bot, e ampliar quando o seu negócio pedir.',
        },
        {
          question: 'Conecta com o que eu já uso?',
          answer:
            'Na maioria dos casos, sim. Podemos conectar seu site, seu estoque, sua agenda ou o WhatsApp para que as informações não fiquem espalhadas.',
        },
        {
          question: 'O bot de WhatsApp substitui minha equipe?',
          answer:
            'Não. Ele responde o que é frequente a qualquer hora e passa a conversa para uma pessoa quando precisa.',
        },
        {
          question: 'O que acontece depois da entrega?',
          answer:
            'Não entregamos e sumimos. Acompanhamos você para tirar dúvidas, ajustar o que for preciso e seguir melhorando.',
        },
      ],
      askAiTitle: 'Prefere perguntar para a nossa IA?',
      askAiBody: 'A Astra responde na hora, de dia ou de noite, com as informações da Astra Dev.',
      askAiCta: 'Perguntar para a Astra',
    },
    finalCta: {
      title: 'Pronto para o seu negócio',
      highlight: 'trabalhar por você?',
      body: 'Conte sua ideia hoje e receba uma proposta com escopo, etapas e preço, sem compromisso.',
      secondary: 'Falar com a Astra (IA)',
    },
    contact: {
      eyebrow: 'Contato',
      title: 'Conte o que você precisa.',
      body: 'Preencha estes dados e o WhatsApp abre com a sua mensagem pronta para enviar. Você também pode falar direto com a gente.',
      formTitle: 'Peça seu orçamento',
      formIntro: 'Leva menos de um minuto.',
      name: 'Seu nome',
      namePlaceholder: 'Ex.: Ana Souza',
      company: 'Empresa ou negócio',
      companyPlaceholder: 'Ex.: Loja Bom Preço',
      optional: 'opcional',
      solution: 'O que você precisa?',
      description: 'Conte um pouco mais',
      descriptionPlaceholder:
        'Ex.: tenho uma loja e quero controlar o estoque e vender pelo WhatsApp.',
      submit: 'Continuar no WhatsApp',
      reassurance: 'Sem compromisso · Respondemos pelo WhatsApp',
      success: 'Abrimos o WhatsApp com a sua mensagem. Só falta enviar.',
      message: {
        greeting: 'Olá Astra Dev, sou {name}',
        company: ' da {company}',
        interest: 'Tenho interesse em: {solution}.',
      },
      channels: [
        {
          icon: 'chat',
          label: 'WhatsApp',
          value: '314 872 1707',
          href: whatsappUrl('Olá Astra Dev, quero um orçamento para um projeto.'),
        },
        {
          icon: 'alternate_email',
          label: 'E-mail',
          value: 'astra.dev.tech@gmail.com',
          href: 'mailto:astra.dev.tech@gmail.com',
        },
      ],
      solutions: [
        { value: 'pos', label: 'Sistema PDV' },
        { value: 'erp', label: 'ERP' },
        { value: 'crm', label: 'CRM' },
        { value: 'bot', label: 'Bot de WhatsApp' },
        { value: 'ai', label: 'Integração de IA' },
        { value: 'saas', label: 'Plataforma SaaS' },
        { value: 'web', label: 'Site ou landing page' },
        { value: 'custom', label: 'Sistema sob medida' },
        { value: 'unsure', label: 'Ainda não sei, quero consultoria' },
      ],
    },
    announcement: {
      badge: 'Novo',
      text: 'IA que valida pagamentos e emite notas fiscais automaticamente.',
      cta: 'Peça sua demo grátis',
      href: whatsappUrl(
        'Olá Astra Dev, vi o anúncio e quero uma demo da IA que valida pagamentos e emite notas fiscais.',
      ),
      close: 'Fechar anúncio',
    },
    mobileBar: {
      quote: 'Orçamento grátis',
      ask: 'Pergunte à Astra',
    },
    quiz: {
      eyebrow: 'Orçamento rápido',
      title: 'Descubra o que seu negócio precisa em 30 segundos',
      intro: 'Responda 3 perguntas e recomendamos por onde começar. Sem compromisso.',
      step: 'Passo {n} de {total}',
      back: 'Voltar',
      restart: 'Começar de novo',
      questions: [
        {
          question: 'Que tipo de negócio você tem?',
          options: [
            {
              value: 'store',
              label: 'Loja ou comércio',
              icon: 'storefront',
            },
            {
              value: 'restaurant',
              label: 'Restaurante',
              icon: 'restaurant',
            },
            {
              value: 'health',
              label: 'Clínica ou consultório',
              icon: 'medical_services',
            },
            {
              value: 'distributor',
              label: 'Distribuidora',
              icon: 'local_shipping',
            },
            {
              value: 'services',
              label: 'Serviços profissionais',
              icon: 'work',
            },
            {
              value: 'startup',
              label: 'Empreendimento ou ideia',
              icon: 'rocket_launch',
            },
          ],
        },
        {
          question: 'O que você quer resolver primeiro?',
          options: [
            {
              value: 'whatsapp',
              label: 'Atender melhor pelo WhatsApp',
              icon: 'chat',
            },
            {
              value: 'online',
              label: 'Vender pela internet',
              icon: 'shopping_bag',
            },
            {
              value: 'control',
              label: 'Controlar caixa e estoque',
              icon: 'inventory_2',
            },
            {
              value: 'automate',
              label: 'Automatizar pagamentos e notas',
              icon: 'receipt_long',
            },
            {
              value: 'clients',
              label: 'Organizar clientes e vendas',
              icon: 'groups',
            },
            {
              value: 'product',
              label: 'Criar um app ou plataforma',
              icon: 'cloud',
            },
          ],
        },
        {
          question: 'Para quando você precisa?',
          options: [
            {
              value: 'now',
              label: 'O quanto antes',
              icon: 'bolt',
            },
            {
              value: 'month',
              label: 'Este mês',
              icon: 'event',
            },
            {
              value: 'quarter',
              label: 'Em 1 a 3 meses',
              icon: 'date_range',
            },
            {
              value: 'exploring',
              label: 'Só estou pesquisando',
              icon: 'explore',
            },
          ],
        },
      ],
      resultTitle: 'Recomendamos começar com',
      resultBody:
        'Pelo que você contou, este é o melhor ponto de partida. Envie o resumo e preparamos uma proposta grátis, com preço e etapas.',
      recommended: 'Recomendado',
      cta: 'Enviar meu resumo pelo WhatsApp',
      message:
        'Olá Astra Dev, fiz o orçamento rápido do site.\nNegócio: {business}\nQuero: {goal}\nPrazo: {timeline}\nRecomendação: {solutions}',
    },
    calculator: {
      eyebrow: 'Calculadora de economia',
      title: 'Quanto tempo a IA pode economizar para você?',
      intro:
        'Ajuste os controles conforme o seu dia a dia e veja quantas horas você poderia recuperar por mês.',
      messages: 'Mensagens de clientes que você responde',
      receipts: 'Comprovantes ou notas que você confere',
      perDay: 'por dia',
      resultLabel: 'Você poderia economizar cerca de',
      hoursUnit: 'horas por mês',
      days: '≈ {days} dias inteiros de trabalho',
      note: 'Estimativa aproximada: considera 3 minutos por mensagem (a IA atende cerca de 70%), 4 minutos por comprovante ou nota e 26 dias úteis por mês.',
      cta: 'Quero recuperar esse tempo',
      message:
        'Olá Astra Dev, usei a calculadora de economia: respondo cerca de {messages} mensagens e confiro {receipts} comprovantes ou notas por dia. Quero automatizar isso.',
    },
    servicePages: {
      details: 'Ver detalhes',
      benefitsTitle: 'O que inclui',
      idealTitle: 'Ideal para',
      projectTitle: 'Veja funcionando',
      faqTitle: 'Perguntas frequentes',
      ask: 'Pergunte à Astra',
      pages: {
        pos: {
          seoTitle: 'Sistema PDV com estoque sob medida | Astra Dev',
          seoDescription:
            'Sistema PDV para lojas, restaurantes e materiais de construção: cobre rápido, emita notas e controle caixa e estoque em tempo real. Orçamento grátis pelo WhatsApp.',
          eyebrow: 'Sistema PDV',
          title: 'Cobre rápido e controle seu negócio',
          highlight: 'sem planilhas.',
          body: 'Um ponto de venda feito do jeito que você trabalha: caixa, notas, estoque em tempo real e relatórios do dia, no computador ou no tablet.',
          benefits: [
            {
              icon: 'point_of_sale',
              title: 'Caixa e notas',
              description: 'Cobre em segundos e emita a nota de cada venda sem erros.',
            },
            {
              icon: 'inventory_2',
              title: 'Estoque em tempo real',
              description: 'Cada venda atualiza o estoque e avisa o que está acabando.',
            },
            {
              icon: 'bar_chart',
              title: 'Relatórios do dia',
              description: 'Saiba quanto vendeu, o que mais saiu e como está o caixa.',
            },
            {
              icon: 'group',
              title: 'Vários usuários e caixas',
              description: 'Cada funcionário com seu usuário e permissões, em um ou vários caixas.',
            },
            {
              icon: 'devices',
              title: 'Computador e tablet',
              description: 'Funciona nos equipamentos que você já tem.',
            },
            {
              icon: 'link',
              title: 'Conectado',
              description: 'Com seu site, seu bot de WhatsApp ou sua emissão de notas.',
            },
          ],
          idealFor: [
            'Lojas e comércio',
            'Restaurantes',
            'Materiais de construção',
            'Distribuidoras',
          ],
          faq: [
            {
              question: 'Posso trazer meus produtos atuais?',
              answer:
                'Na maioria dos casos, sim: podemos importar seus produtos do Excel ou do seu sistema atual.',
            },
            {
              question: 'Posso começar com um só caixa?',
              answer:
                'Sim. Você começa com o que precisa hoje e adiciona caixas, usuários ou funções quando o negócio crescer.',
            },
            {
              question: 'Quanto custa?',
              answer:
                'Depende de quantos caixas, usuários e funções você precisa. Enviamos uma proposta com preço e etapas antes de começar, sem compromisso.',
            },
          ],
          whatsappMessage:
            'Olá Astra Dev, vi a página do sistema PDV e quero um orçamento para o meu negócio.',
        },
        bot: {
          seoTitle: 'Bot de WhatsApp com IA para o seu negócio | Astra Dev',
          seoDescription:
            'Bot de WhatsApp com inteligência artificial que responde, agenda e vende 24/7 com as informações reais do seu negócio. Peça sua demo grátis.',
          eyebrow: 'Bot de WhatsApp com IA',
          title: 'Atenda e venda pelo WhatsApp',
          highlight: '24 horas por dia.',
          body: 'Um assistente com IA que responde perguntas, agenda horários e recebe pedidos usando só as informações do seu negócio, e passa a conversa para sua equipe quando precisa.',
          benefits: [
            {
              icon: 'chat',
              title: 'Responde na hora',
              description:
                'Preços, horários, disponibilidade e perguntas frequentes, a qualquer hora.',
            },
            {
              icon: 'event_available',
              title: 'Agenda horários',
              description: 'Marca, confirma e envia lembretes para que seus clientes não faltem.',
            },
            {
              icon: 'shopping_cart',
              title: 'Recebe pedidos',
              description: 'Monta o pedido com o cliente e deixa pronto para enviar.',
            },
            {
              icon: 'verified',
              title: 'Só as suas informações',
              description: 'Responde com os dados do seu negócio, sem inventar.',
            },
            {
              icon: 'support_agent',
              title: 'Passa para uma pessoa',
              description: 'Quando o caso pede, entrega a conversa para sua equipe.',
            },
            {
              icon: 'link',
              title: 'Conectado à sua operação',
              description: 'Com seu estoque, sua agenda ou seu site.',
            },
          ],
          idealFor: ['Restaurantes', 'Clínicas e consultórios', 'Lojas', 'Serviços profissionais'],
          faq: [
            {
              question: 'Ele substitui minha equipe?',
              answer:
                'Não. Ele responde o que é frequente a qualquer hora e passa a conversa para uma pessoa quando precisa.',
            },
            {
              question: 'Funciona com meu número de WhatsApp?',
              answer:
                'Avaliamos com você conforme o uso que você faz do WhatsApp hoje, e na proposta explicamos a melhor opção.',
            },
            {
              question: 'Posso testar antes?',
              answer:
                'Sim. Montamos uma demo com perguntas reais do seu negócio para você ver como ele responderia.',
            },
          ],
          whatsappMessage:
            'Olá Astra Dev, vi a página do bot de WhatsApp e quero uma demo para o meu negócio.',
        },
        ia: {
          seoTitle: 'Inteligência artificial para negócios: pagamentos, notas e mais | Astra Dev',
          seoDescription:
            'IA que valida pagamentos, emite notas fiscais, ajuda na sua loja e responde com os dados do seu negócio. Não só bots. Peça sua demo grátis.',
          eyebrow: 'Inteligência artificial',
          title: 'IA que faz o trabalho repetitivo',
          highlight: 'por você.',
          body: 'Não só bots: conectamos inteligência artificial à sua operação para validar pagamentos, emitir notas, ajudar na sua loja e responder com as suas próprias informações.',
          benefits: [
            {
              icon: 'chat',
              title: 'Atendimento 24/7',
              description: 'Responde, agenda e vende pelo WhatsApp ou no seu site a qualquer hora.',
            },
            {
              icon: 'price_check',
              title: 'Validação de pagamentos',
              description: 'Lê os comprovantes de transferência e confirma que o pagamento caiu.',
            },
            {
              icon: 'receipt_long',
              title: 'Notas fiscais automáticas',
              description: 'Gera e envia notas a partir de cada venda ou pedido.',
            },
            {
              icon: 'storefront',
              title: 'Assistentes para lojas',
              description: 'Consulta o estoque, recomenda produtos e recebe pedidos.',
            },
            {
              icon: 'event_available',
              title: 'Agenda e lembretes',
              description: 'Marca horários e avisa seus clientes para que não faltem.',
            },
            {
              icon: 'insights',
              title: 'Respostas com seus dados',
              description:
                'Pergunte sobre suas vendas ou produtos e receba respostas com suas informações reais.',
            },
          ],
          idealFor: ['Lojas', 'Distribuidoras', 'Restaurantes', 'Empresas de serviços'],
          faq: [
            {
              question: 'Preciso trocar meus sistemas?',
              answer:
                'Não necessariamente. Na maioria dos casos conectamos a IA ao que você já usa.',
            },
            {
              question: 'A IA pode errar?',
              answer:
                'Configuramos para trabalhar só com as suas informações e passar para uma pessoa os casos que não consegue resolver.',
            },
            {
              question: 'Por onde começo?',
              answer:
                'Por uma tarefa que hoje toma muito do seu tempo, como validar pagamentos ou responder mensagens. Começamos por ela e crescemos por etapas.',
            },
          ],
          whatsappMessage:
            'Olá Astra Dev, vi a página de inteligência artificial e quero uma demo para o meu negócio.',
        },
      },
    },
    footer: {
      blurb:
        'Software sob medida e inteligência artificial para negócios reais. Ideias que constroem o futuro.',
      explore: 'Explorar',
      solutions: 'Soluções',
      contact: 'Contato',
      rights: 'Todos os direitos reservados.',
      proposal: 'Orçamento pelo WhatsApp',
    },
  },
};
