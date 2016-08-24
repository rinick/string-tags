
### RegExp

```javascript
const tags = require('../index.js');

let input = "*)";
let reg1 = tags.regexp`\\\(${input}\gi`;

// this is same as 
reg1 = /\\\(\*\)/gi;
or
reg1 = new RegExp("\\\\\\(\\*\\)", "gi");
// use string-tags for regexp only when embedded expressions is needed

```


### XML

```javascript
const tags = require('../index.js');

let input = "&<>";
let xml1 = tags.xml`<a>${input}</a>`; // escape the xml string
let dom = tags.dom_xml`<a>${input}</a>`; // output a document instead of string
```