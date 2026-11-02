// Thin, SDK-agnostic tracking facade.
// Components call `track()` freely; events fired before the SDK finishes loading
// are queued (capped) and flushed once a client is registered. With no client
// (e.g. no API key) calls are silently dropped.

const MAX_QUEUE = 50;
let client = null;
const queue = [];

export function setAnalyticsClient(next) {
  client = next;
  while (queue.length) {
    const [event, props] = queue.shift();
    client.track(event, props);
  }
}

export function track(event, props = {}) {
  if (typeof window === 'undefined') return;
  if (client) {
    client.track(event, props);
  } else if (queue.length < MAX_QUEUE) {
    queue.push([event, props]);
  }
}

// Classifies outbound links so contact/CV clicks are tracked from one place.
export function classifyLink(href = '') {
  if (href === '/api/cv' || href.endsWith('.pdf')) return { event: 'CV Downloaded' };
  if (href.startsWith('mailto:')) return { event: 'Contact Clicked', channel: 'email' };
  if (href.startsWith('tel:')) return { event: 'Contact Clicked', channel: 'phone' };
  if (href.includes('t.me/')) return { event: 'Contact Clicked', channel: 'telegram' };
  if (href.includes('linkedin.com')) return { event: 'Contact Clicked', channel: 'linkedin' };
  if (href.includes('github.com')) return { event: 'Outbound Link Clicked', target: 'github' };
  return null;
}
