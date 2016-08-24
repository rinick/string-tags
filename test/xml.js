const assert = require('assert');

const tags = require('../index.js');

let xml1 = tags.xml`<a>${'&<>'}</a>`;
assert.equal(xml1, '<a>&amp;&lt;&gt;</a>', 'xml escape');

let dom = tags.dom_xml`<a>${'&<>'}</a>`;
assert.equal(dom.firstChild.nodeName, 'a', 'xml dom nodeName');
assert.equal(dom.firstChild.textContent, '&<>', 'xml dom textContent');