
function ProgressHR() {
    var progressItems = document.getElementsByClassName("ProgressHR");
    console.log("There are " + progressItems.length + " ProgressItem(s)");
    var hrs = document.getElementsByTagName('hr');
    console.log("There are " + hrs.length + " HR tags.");
    Debug.write("this is being debugged");

    for (var i = 0; i < progressItems.length; i++) {
        var article = progressItems[i];
        
        var totalLength = article.innerHTML.length;
        var contentLength = article.textContent.length;
        var blackSpaceLength = article.textContent.replace(/\s/g, '').length;
        console.log("Total length: " + totalLength);
        console.log("textContent Length: " + contentLength);
        console.log("Blackspace Length: " + blackSpaceLength);

        var itemHrs = [];
        var cumulativeLengths = [];
        var percentages = [];
        var cumulativeLength = 0;

        // bad perf here in a 'big' page
        for (var j = 0; j < hrs.length; j++) {
            if (hrs[j].parentNode === article) {
                console.log("child HR");
                itemHrs.push(hrs[j]);
            } else {
                console.log("not a child HR");
            }
        }
        console.log("There are " + itemHrs.length + " sections.");

        
        var hrIndex = 0;
        for (var j = 0; j < article.childNodes.length; j++) {
            if (article.childNodes[j] === itemHrs[hrIndex]) {
                cumulativeLengths.push(cumulativeLength);
                percentages.push(cumulativeLength / blackSpaceLength);
                console.log("Section " + hrIndex + " has length: " + cumulativeLength +
                    ", " + (100 * percentages[hrIndex]) + "%.");
                hrIndex++;
            }
            else {
                cumulativeLength += article.childNodes[j].textContent.replace(/\s/g,'').length;
            }
        }

        console.log("There are " + itemHrs.length + " HRs in this item.");
    }
};