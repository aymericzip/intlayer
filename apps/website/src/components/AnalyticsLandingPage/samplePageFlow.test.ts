import { PAGE_FLOW_ENTRANCE } from '@intlayer/backend-contract/analytics';
import { describe, expect, it } from 'vitest';
import { getSamplePageFlow, samplePageOptions } from './samplePageFlow';

describe('sample navigation reports', () => {
  it('supports every selectable page and session entrance', () => {
    for (const startUrl of [PAGE_FLOW_ENTRANCE, ...samplePageOptions]) {
      const report = getSamplePageFlow(startUrl);
      expect(report.steps[0]).toHaveLength(1);
      expect(report.steps[0][0].url).toBe(startUrl);
      expect(report.steps[0][0].value).toBeGreaterThan(0);
      for (const [step, nodes] of report.steps.entries()) {
        for (const node of nodes) {
          if (step > 0) {
            const incoming = report.links.filter(
              (link) => link.fromStep === step - 1 && link.toUrl === node.url
            );
            expect(
              incoming.reduce((total, link) => total + link.value, 0)
            ).toBe(node.value);
          }
          if (step < report.steps.length - 1) {
            const outgoing = report.links.filter(
              (link) => link.fromStep === step && link.fromUrl === node.url
            );
            expect(
              outgoing.reduce((total, link) => total + link.value, 0) +
                (node.exits ?? 0)
            ).toBe(node.value);
          }
        }
      }
    }
  });

  it('shows branching, merging and five navigation steps', () => {
    const report = getSamplePageFlow('/');
    expect(report.steps).toHaveLength(5);
    expect(report.steps[1].length).toBeGreaterThan(3);
    expect(
      report.links.filter(
        (link) => link.fromStep === 1 && link.toUrl === '/doc'
      ).length
    ).toBeGreaterThan(2);
  });

  it('retains terminal pages and handles unknown starting pages', () => {
    const report = getSamplePageFlow('/dashboard');
    expect(report.steps).toHaveLength(1);
    expect(report.steps[0][0].exits).toBe(report.steps[0][0].value);
    expect(getSamplePageFlow('/unknown').steps).toEqual([]);
  });
});
