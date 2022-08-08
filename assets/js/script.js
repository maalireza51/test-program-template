
// ===================== codemirror configuration for textarea ====================== //
function codegroundphp(id) {
    var editor = CodeMirror.fromTextArea(document.getElementById(id), {
        lineNumbers: true,
        matchBrackets: true,
        mode: "application/x-httpd-php",
        indentUnit: 8,
        indentWithTabs: true,
        enterMode: "keep",
        tabMode: "shift",
        readOnly:true,
      });
}
function codegroundjs(id) {
    var editor = CodeMirror.fromTextArea(document.getElementById(id), {
        lineNumbers: true,
        matchBrackets: true,
        mode: "text/javascript",
        indentUnit: 8,
        indentWithTabs: true,
        enterMode: "keep",
        tabMode: "shift",
        readOnly:true,
      });
}
function codegroundxml(id) {
    var editor = CodeMirror.fromTextArea(document.getElementById(id), {
        lineNumbers: true,
        matchBrackets: true,
        mode: "application/xml",
        indentUnit: 8,
        indentWithTabs: true,
        enterMode: "keep",
        tabMode: "shift",
        readOnly:true,
      });
}


// textareas
codegroundphp("topLeft")
codegroundjs("topMiddle");
codegroundxml("topRight");


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

function defaultdiff(oldName, newName, oldText, newText) {
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

defaultdiff(oldName, newName, oldText, newText);

// ========================= when a button clicked ========================= //

function clickeddiff(oldName, newName, oldText, newText) {
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
        clickeddiff(oldName, newName, oldText, newText);
    };
});