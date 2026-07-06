// @ts-nocheck -- runs only against React 16/17 (npm run test:legacy); the
// legacy ReactDOM.render/test-utils APIs used here no longer exist in the
// React 19 types installed for the main suite.
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import EmailEditor from '../../src';

// Resolve the embed script immediately instead of hitting the network.
vi.mock('../../src/loadScript', () => ({
  loadScript: (callback: Function) => callback(),
}));

let mockEditor;
let container;

beforeEach(() => {
  mockEditor = {
    addEventListener: vi.fn(),
    destroy: vi.fn(),
  };
  globalThis.unlayer = {
    createEditor: vi.fn(() => mockEditor),
  };
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
});

it('mounts and creates the editor on legacy React', () => {
  act(() => {
    ReactDOM.render(<EmailEditor editorId="legacy-editor" />, container);
  });

  expect(document.querySelector('#legacy-editor')).toBeTruthy();
  expect(globalThis.unlayer.createEditor).toHaveBeenCalledTimes(1);
  expect(globalThis.unlayer.createEditor).toHaveBeenCalledWith(
    expect.objectContaining({ id: 'legacy-editor', displayMode: 'email' })
  );
});

it('exposes the editor through the ref and calls onLoad', () => {
  const ref = React.createRef();
  const onLoad = vi.fn();

  act(() => {
    ReactDOM.render(
      <EmailEditor ref={ref} editorId="legacy-editor" onLoad={onLoad} />,
      container
    );
  });

  expect(ref.current.editor).toBe(mockEditor);
  expect(onLoad).toHaveBeenCalledWith(mockEditor);
});

it('destroys the editor on unmount', () => {
  act(() => {
    ReactDOM.render(<EmailEditor editorId="legacy-editor" />, container);
  });
  expect(mockEditor.destroy).not.toHaveBeenCalled();

  act(() => {
    ReactDOM.unmountComponentAtNode(container);
  });
  expect(mockEditor.destroy).toHaveBeenCalledTimes(1);
});
