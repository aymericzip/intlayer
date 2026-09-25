import { describe, expect, it } from 'vitest';
import { normalizeTechLogos } from './TechLink';

describe('TechLink helpers', () => {
  it('normalizes single tech logo names', () => {
    expect(normalizeTechLogos('nextjs')).toEqual(['nextjs']);
    expect(normalizeTechLogos('Next.js')).toEqual(['nextjs']);
    expect(normalizeTechLogos('next-js')).toEqual(['nextjs']);
    expect(normalizeTechLogos('react')).toEqual(['react']);
    expect(normalizeTechLogos('astro')).toEqual(['astro']);
    expect(normalizeTechLogos('tanstack')).toEqual(['tanstack']);
    expect(normalizeTechLogos('express')).toEqual(['express']);
    expect(normalizeTechLogos('nestjs')).toEqual(['nestjs']);
    expect(normalizeTechLogos('nest')).toEqual(['nestjs']);
    expect(normalizeTechLogos('fastify')).toEqual(['fastify']);
    expect(normalizeTechLogos('hono')).toEqual(['hono']);
    expect(normalizeTechLogos('adonis')).toEqual(['adonis']);
    expect(normalizeTechLogos('elysia')).toEqual(['elysia']);
    expect(normalizeTechLogos('htmx')).toEqual(['htmx']);
    expect(normalizeTechLogos('lit')).toEqual(['lit']);
    expect(normalizeTechLogos('vanilla')).toEqual(['vanilla']);
    expect(normalizeTechLogos('transloco')).toEqual(['angular']);
    expect(normalizeTechLogos('vue-i18n')).toEqual(['vue']);
    expect(normalizeTechLogos('svelte-i18n')).toEqual(['svelte']);
    expect(normalizeTechLogos('react-i18next')).toEqual(['react']);
    expect(normalizeTechLogos('next-intl')).toEqual(['nextjs']);
    expect(normalizeTechLogos('i18next')).toEqual(['vanilla']);
  });

  it('normalizes compound tech logo strings', () => {
    expect(normalizeTechLogos('astro + react')).toEqual(['astro', 'react']);
    expect(normalizeTechLogos('vite, vue')).toEqual(['vite', 'vue']);
    expect(normalizeTechLogos(['solid', 'tanstack'])).toEqual([
      'solid',
      'tanstack',
    ]);
  });

  it('deduplicates logos', () => {
    expect(normalizeTechLogos(['react', 'react', 'vite'])).toEqual([
      'react',
      'vite',
    ]);
  });

  it('handles unknown or empty inputs gracefully', () => {
    expect(normalizeTechLogos('')).toEqual([]);
    expect(normalizeTechLogos(undefined)).toEqual([]);
    expect(normalizeTechLogos('something-unknown')).toEqual([]);
  });
});
