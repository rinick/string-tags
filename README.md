
### RegExp

```javascript
	const tags = require('../index.js');

	let reg1 = tags.regexp`\\\(${"*("}\\\gi`;
```

this is same as `reg1 = /\\\(\*\(\\/gi;`. use string-tags for regexp only embedded expressions is needed


### XML

```javascript
	const tags = require('../index.js');

	let xml1 = tags.xml`<a>${'&<>'}</a>`; // escape the xml string
	let dom = tags.dom_xml`<a>${'&<>'}</a>`; // output a document instead of string
```