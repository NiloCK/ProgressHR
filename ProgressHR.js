
function ProgressHR() {
    var progressItems = document.getElementsByClassName("ProgressHR");
    console.log("There are " + progressItems.length + " ProgressItem(s)");
    var hrs = document.getElementsByTagName('hr');
    console.log("There are " + hrs.length + " HR tags.");

    for (var i = 0; i < progressItems.length; i++) {
        // todo: factor this out to a fcn ProgHRArticle(article){}
        var article = progressItems[i];
        
        var blackSpaceLength = article.textContent.replace(/\s/g, '').length;
        console.log("Blackspace Length: " + blackSpaceLength);

        // better to encapsulate an HR class?
        var itemHrs = [];
        var cumulativeLengths = []; // not needed?
        var percentages = [];
        var cumulativeLength = 0;

        // bad perf here in a 'big' page.
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

        // a (bad) example of 'the idea'
        for (var j = 0; j < itemHrs.length; j++) {
            itemHrs[j].style.width = "" + Math.floor(100*percentages[j]) + "%";
        }
    }
};