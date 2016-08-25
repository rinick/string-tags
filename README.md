
### RegExp

```javascript
const tags = require('../index.js');

let input = "*)";
let reg1 = tags.regexp`\\\(${input}\g`;

// the above line is same as
let inputEscaped = input.replace(/\*\)/g, "\\$&");
reg1 = new RegExp("\\\\\\(" + inputEscaped, "g);

// string-tags make regexp much cleaner when you have to use expression in regexp

// don't use string-tags for regexp when there is no expression, use native js syntax instead:
reg1 = /\\\(\*\)/g;


```


### XML

```javascript
const tags = require('../index.js');

let input = "&<>";
let xml1 = tags.xml`<a>${input}</a>`; // escape the xml string
let dom = tags.dom_xml`<a>${input}</a>`; // output a document instead of string
```