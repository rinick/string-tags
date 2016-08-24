const assert = require('assert');

const tags = require('../index.js');

let reg1 = tags.regexp`\\\(${"*("}\\\gi`;
let reg2 = /\\\(\*\(\\/gi;

assert.equal(reg1.source, reg2.source, 'regexp source');
assert.equal(reg1.flags, reg2.flags, 'regexp flags');


reg1 = tags.regexp`\\\(${"*("}\\`;
reg2 = /\\\(\*\(\\/;

assert.equal(reg1.source, reg2.source, 'regexp source no flag');
assert.equal(reg1.flags, reg2.flags, 'regexp flags  no flag');