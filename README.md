edits
=====

Simple edit distance and alignment in Node.js

Currently supports Levenshtein distance, with alignment.

```js
var edits = require('edits');

var d = edits.distance('word1', 'word2');
var aligned = edits.distanceAligned('word1', 'word2').aligned;

```

Build using Grunt:
```
$ npm install
$ grunt

```

