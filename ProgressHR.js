/**
 * @constructor
 * @param {HTMLelement} hr - the HR to be converted
 * @param {Number} percent - the percentage to be represented
 */
function PHR(hr, percent) {

    this.hr = hr;
    this.percent = percent;

    this.progress = function (options) {
        // todo: determin BG color of the area itself
        this.options = options || { bg: 'black', bar: 'orange' };

        var div = document.createElement('div');
        div.style.backgroundColor = this.options.bg;
        div.style.borderRadius = '5px';
        div.style.padding = '2px';

        var inner = document.createElement('div');

        inner.style.width = '' + percent + '%';
        inner.style.height = '2px';
        inner.style.borderRadius = '2px';
        inner.style.backgroundColor = this.options.bar;

        div.appendChild(inner);

        hr.parentNode.replaceChild(div, hr);
        //this.hr = null;
        //this.percent = null;
    };
}

function ProgressHR(options) {

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
        var percentages = [];
        var cumulativeLength = 0;

        // bad perf here in a 'big' page. (eg, a page with many HRs)
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
                percentages.push(100 * cumulativeLength / blackSpaceLength);
                console.log("Section " + hrIndex + " has length: " + cumulativeLength +
                    ", " + (percentages[hrIndex]) + "%.");
                hrIndex++;
            }
            else {
                cumulativeLength += article.childNodes[j].textContent.replace(/\s/g,'').length;
            }
        }

        // a (bad) example of 'the idea'
        for (var j = 0; j < itemHrs.length; j++) {
            //itemHrs[j].style.width = "" + Math.floor(percentages[j]) + "%";
            new PHR(itemHrs[j], percentages[j]).progress(options || false);
        }
    }
};