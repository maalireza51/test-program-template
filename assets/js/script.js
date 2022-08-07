
// ===================== codemirror configuration for textarea ====================== //
function codeground(id, text) {
    var editor = CodeMirror.fromTextArea(document.getElementById(id), {
        height: "350px",
        parserfile: "parsexml.js",
        stylesheet: "css/xmlcolors.css",
        path: "js/",
        continuousScanning: 500,
        lineNumbers: true,
        editable: false,
        readOnly: true
    });
    editor.getDoc().setValue(text);
    // var lines = editor.getValue().split('\n');
    // for (var i = 0; i < lines.length; i++) {
    //     if (0 < lines[i].indexOf("flag")) {
    //         editor.getDoc().markText({ line: i, ch: 0 }, { line: i, ch: lines[i].length }, { css: "background-color: yellow" });
    //     }
    // }
}


// ===================== if you want to disable a text area ===================//
//instruction ==> <textarea ... disabled></textare>
var textarea = document.querySelectorAll('textarea');
textarea.forEach(element => {
    if (element.hasAttribute('disabled')) {
        element.parentNode.querySelector('.disabled').classList.add('d-block');
    }
});

// ===================== on page load first diff setup ===================== //


var oldText = document.querySelector('.oldText').getAttribute('code');
var oldName = document.querySelector('.oldText').getAttribute('fileName');
var newText = document.querySelector('.newText').getAttribute('code');
var newName = document.querySelector('.newText').getAttribute('fileName');
var intro = document.querySelector('.intro').getAttribute('intro');

function defaultdiff(oldName, newName, oldText, newText, intro) {
    codeground("bottomRight", intro);
    var targetElement = document.getElementById('myDiffElementId');
    document.addEventListener('DOMContentLoaded', function () {

        var configuration = {
            drawFileList: false,
            fileListToggle: false,
            fileContentToggle: true,
            matching: 'lines'
        };

        var diff = Diff.createTwoFilesPatch(oldName, newName, oldText, newText);
        var diff2htmlUi = new Diff2HtmlUI(targetElement, diff, configuration);

        diff2htmlUi.draw();
        diff2htmlUi.highlightCode();
    });
    
}

defaultdiff(oldName, newName, oldText, newText, intro);

// ========================= when a button clicked ========================= //

function clickeddiff(oldName, newName, oldText, newText, intro) {
    var codemirrorArea = document.querySelector('.intro-area>.cm-s-default');
    document.querySelector('.intro-area').removeChild(codemirrorArea);
    codeground("bottomRight", intro);
    var targetElement = document.getElementById('myDiffElementId');
    targetElement.innerHTML = '';

    var configuration = {
        drawFileList: false,
        fileListToggle: false,
        fileContentToggle: true,
        matching: 'lines',
        renderNothingWhenEmpty: false
    };

    var diff = Diff.createTwoFilesPatch(oldName, newName, oldText, newText);
    var diff2htmlUi = new Diff2HtmlUI(targetElement, diff, configuration);

    diff2htmlUi.draw();
    diff2htmlUi.highlightCode();
}

var buttons = document.querySelectorAll('li');
buttons.forEach(element => {
    var oldText = element.querySelector('.oldText').getAttribute('code');
    var newText = element.querySelector('.newText').getAttribute('code');
    var oldName = element.querySelector('.oldText').getAttribute('fileName');
    var newName = element.querySelector('.newText').getAttribute('fileName');
    var intro = element.querySelector('.intro').getAttribute('intro');

    // -------------------- escape and killed color -------------------------- //
    // var btnMode = false;
    // var pill = element.querySelector('.pill');

    // const diff = Diff.diffLines(oldText, newText);
    // diff.some(function (el) {
    //     if(el.added != undefined || el.removed == true){
    //         pill.classList.add('pill-red');
    //         return true;
    //     }
    //     else{
    //         pill.classList.add('pill-green');
    //         btnMode = true;
    //     }
    //     return false
    // });
    // -------------------- escape and killed color -------------------------- //

    element.onclick = function () {
        buttons.forEach(btn => {
            btn.classList.remove('active');
        });
        element.classList.add('active')
        clickeddiff(oldName, newName, oldText, newText, intro);
    };
});