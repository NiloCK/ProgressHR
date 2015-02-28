
function ProgressHR() {
    var doc = document;
    var progressItems = document.getElementsByClassName("ProgressHR");
    console.log("There are " + progressItems.length + " ProgressItem(s)");

    for (var i = 0; i < progressItems.length; i++) {

        var sections = progressItems[i].innerHTML.split("<hr>"); // this is extremely bad
        for (var j = 0; j < sections.length; j++) {
            console.log(sections[j]);
        }
    }
};