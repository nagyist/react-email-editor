import { loadScript } from '../src/loadScript';

// Note: loadScript keeps module-level state (callback queue, loaded flag),
// so these tests build on each other in order.

const embedScripts = () =>
  document.querySelectorAll<HTMLScriptElement>(
    'script[src*="editor.unlayer.com"]'
  );

it('injects the embed script once and queues callbacks until it loads', () => {
  const first = vi.fn();
  const second = vi.fn();

  loadScript(first);
  loadScript(second);

  expect(embedScripts().length).toBe(1);
  expect(first).not.toHaveBeenCalled();
  expect(second).not.toHaveBeenCalled();

  embedScripts()[0].onload!(new Event('load'));

  expect(first).toHaveBeenCalledTimes(1);
  expect(second).toHaveBeenCalledTimes(1);
});

it('runs the callback immediately once the script is already loaded', () => {
  const callback = vi.fn();

  loadScript(callback);

  expect(embedScripts().length).toBe(1);
  expect(callback).toHaveBeenCalledTimes(1);
});

it('injects a separate script tag for a custom scriptUrl', () => {
  loadScript(vi.fn(), 'https://example.com/custom-embed.js');

  expect(
    document.querySelectorAll('script[src*="example.com/custom-embed"]').length
  ).toBe(1);
});
