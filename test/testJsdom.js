const { JSDOM } = require("jsdom");

console.log(
  new JSDOM(
    '<p>You can use <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice" rel="noreferrer">slice()</a> to make a copy then <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse" rel="noreferrer">reverse()</a> it</p>\n\n<pre><code>var newarray = array.slice().reverse();\n</code></pre>\n\n<p><div class="snippet" data-babel="false" data-console="true" data-hide="true" data-lang="js">\n<div class="snippet-code snippet-currently-hidden">\n<pre class="snippet-code-js lang-js prettyprint-override"><code>var array = [\'a\', \'b\', \'c\', \'d\', \'e\'];\r\nvar newarray = array.slice().reverse();\r\n\r\nconsole.log(\'a\', array);\r\nconsole.log(\'na\', newarray);</code></pre>\n</div>\n</div>\n</p>\n'
  ).window.document.children[0].textContent
);
