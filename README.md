# ProgressHR
A widget for embedding 'progess aware' &lt;hr> elements as text breaks in long documents, providing feedback which may be of use to the reader (for example, knowing whether an article is *really this long* or if the page is extended with comments at the bottom).

Usage
-----
1. Include `ProgressHR.js` in your page.
2. Decorate the html element containing the body of text to be 'annotated' with the class `ProgressHR`.
3. Place `<hr>` tags inside the text at appropriate break points.
4. Call `ProgressHR()` somewhere after the document has loaded.
