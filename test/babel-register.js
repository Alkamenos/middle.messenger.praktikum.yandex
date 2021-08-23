const { JSDOM } = require('jsdom');

const register = require('@babel/register').default;

register({ extensions: ['.ts', '.js'] });

const dom = new JSDOM('<div id="root"><div>', { url: 'http://localhost' });
global.window = dom.window;
global.document = dom.window.document;