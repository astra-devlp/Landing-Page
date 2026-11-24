import { describe, expect, it } from 'vitest';
import { TRANSLATIONS } from '../../../src/app/core/i18n/translations';
import { CLIENTS } from '../../../src/app/shared/data/clients';
import { systemPrompt, WHATSAPP_URL } from './knowledge.mts';

const es = TRANSLATIONS.es;
const prompt = systemPrompt('es');

describe('systemPrompt', () => {
  it('offers every solution and AI capability shown on the landing', () => {
    for (const service of es.services.items) expect(prompt).toContain(service.title);
    for (const item of es.ia.items) expect(prompt).toContain(item.title);
  });

  it('knows why a business should trust the company', () => {
    expect(prompt).toContain(es.about.title);
    for (const pillar of es.about.pillars) expect(prompt).toContain(pillar.title);
  });

  it('knows what the client receives at each step of the process', () => {
    for (const step of es.process.steps) {
      expect(prompt).toContain(step.title);
      expect(prompt).toContain(step.deliverable);
    }
  });

  it('knows the real clients and the features announced on the page', () => {
    for (const client of CLIENTS) expect(prompt).toContain(client.href);
    for (const feature of es.marquee.features) expect(prompt).toContain(feature);
  });

  it('names the projects it may cite as proof, and only those', () => {
    for (const project of Object.values(es.projects.items)) expect(prompt).toContain(project.title);
  });

  it('closes towards WhatsApp and tells the model the page language', () => {
    expect(prompt).toContain(WHATSAPP_URL);
    expect(systemPrompt('en')).toContain('inglés');
    expect(systemPrompt('pt')).toContain('portugués');
    expect(systemPrompt('xx')).toContain('español');
  });

  it('keeps the rules in step with the page instead of a hand-written list', () => {
    // A solution added to the page must reach the rules without editing this file.
    const rules = prompt.split('CATALOGO_JSON:')[0];
    for (const service of es.services.items) expect(rules).toContain(service.title);
    for (const project of Object.values(es.projects.items)) expect(rules).toContain(project.title);
  });

  it('stays small enough for the free models it runs on', () => {
    // ~4 characters per token; the smallest model degrades past ~4k prompt tokens.
    expect(prompt.length).toBeLessThan(16_000);
  });
});
