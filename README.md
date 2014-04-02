edits
=====

Edit distance and alignment in Node.js


Currently supports Levenshtein distance, with alignment:

```
var edits = require('edits');

var d = edits.distance('word1', 'word2');
var aligned = edits.distanceAligned('word1', 'word2').aligned;

```

