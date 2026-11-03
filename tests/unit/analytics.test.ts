import { describe, expect, it, vi } from 'vitest';
import { classifyLink } from '../../src/lib/analytics';

describe('classifyLink', () => {
  it.each([
    ['/api/cv', { event: 'CV Downloaded' }],
    ['/dias_yermek_cv.pdf', { event: 'CV Downloaded' }],
    ['mailto:someone@example.com', { event: 'Contact Clicked', channel: 'email' }],
    ['tel:+77000000000', { event: 'Contact Clicked', channel: 'phone' }],
    ['https://t.me/daelijek_og', { event: 'Contact Clicked', channel: 'telegram' }],
    ['https://www.linkedin.com/in/dias-yermek/', { event: 'Contact Clicked', channel: 'linkedin' }],
    ['https://github.com/Daelijek', { event: 'Outbound Link Clicked', target: 'github' }],
  ])('%s', (href, expected) => {
    expect(classifyLink(href)).toEqual(expected);
  });

  it('ignores internal navigation', () => {
    expect(classifyLink('/projects/rolesieve')).toBeNull();
    expect(classifyLink()).toBeNull();
  });
});

describe('track queue', () => {
  it('queues events until a client is registered, then flushes them in order', async () => {
    vi.resetModules();
    vi.stubGlobal('window', {});
    const { track, setAnalyticsClient } = await import('../../src/lib/analytics');
    track('A', { n: 1 });
    track('B');
    const client = { track: vi.fn() };
    setAnalyticsClient(client);
    track('C');
    expect(client.track.mock.calls).toEqual([
      ['A', { n: 1 }],
      ['B', {}],
      ['C', {}],
    ]);
    vi.unstubAllGlobals();
  });
});
