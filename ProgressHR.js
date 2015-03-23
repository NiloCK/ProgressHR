/**
 * @constructor
 * @param {HTMLelement} hr - the HR to be converted
 * @param {Number} percent - the percentage to be represented
 */
function PHR(hr, percent) {

    this.hr = hr;
    this.percent = percent;

    this.progress = function (options) {
        this.options = {};

        for (var key in this.defaults) {
            if (this.defaults.hasOwnProperty(key)) {
                this.options[key] = options[key] || this.defaults[key];
            }
        }

        var outer = document.createElement('div');
        var inner = document.createElement('div');

        if (this.options.bgColor === null ||
            this.options.barColor === null) {
            //todo detect/set colors
        }
        else {
            outer.style.backgroundColor = this.options.bgColor;
            inner.style.backgroundColor = this.options.barColor;
        }
        
        outer.style.width = this.options.width + '%';
        outer.style.borderRadius = '5px';
        outer.style.padding = '2px';

        inner.style.width = '' + percent + '%';
        inner.style.height = this.options.innerHeight + 'px';
        inner.style.borderRadius = (this.options.innerHeight / 2) + 'px';
        

        outer.appendChild(inner);

        hr.parentNode.replaceChild(outer, hr);
    };
}

PHR.prototype.defaults = {
    width: 80,      // 80% width
    bgColor: null,  // null colors result in 'auto coloring'
    barColor: null,
    height: 5,
    innerHeight: 2
};

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