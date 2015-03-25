function ProgressHR(options) {
    
    // default implementation defines how the HRs will be styled in
    // absense of any user input.
    var defaults = {
        width: 80,      // 80% width
        bgColor: null,  // null colors result in 'auto coloring'
        barColor: null,
        height: 5,
        innerHeight: 2,
        fcn: function (hr, percent) {
            var outer = document.createElement('div');
            var inner = document.createElement('div');

            if (this.bgColor === null ||
                this.barColor === null) {
                //todo detect/set colors
            }
            else {
                outer.style.backgroundColor = this.bgColor;
                inner.style.backgroundColor = this.barColor;
            }

            outer.style.width = this.width + '%';
            outer.style.borderRadius = '5px';
            outer.style.padding = '2px';

            inner.style.width = '' + percent + '%';
            inner.style.height = this.innerHeight + 'px';
            inner.style.borderRadius = (this.innerHeight / 2) + 'px';

            outer.appendChild(inner);
            hr.parentNode.replaceChild(outer, hr);
        }
    };

    // apply those options supplied by the user to the 'default' object
    // so that they will be used.
    for (var key in options) {
        if (options.hasOwnProperty(key) && defaults.hasOwnProperty(key)) {
            defaults[key] = options[key];
        }
    }

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
            //new PHR(itemHrs[j], percentages[j]).progress(options || false);
            //phr(itemHrs[j], percentages[j]);
            defaults.fcn(itemHrs[j], percentages[j]);
        }
    }        
};

