import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
globalThis.window = dom.window as unknown as Window & typeof globalThis;;
globalThis.document = dom.window.document;

Object.defineProperty(globalThis, 'navigator', {
	value: dom.window.navigator,
	writable: true,
  });