window.addEventListener('load', function() {
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/javascript");

  var saveButton = document.getElementById('save');
  saveButton.addEventListener('click', function() {
    var message = prompt('Enter a commit message.');

    var request = new XMLHttpRequest();
    request.open('POST', '/');
    request.onprogress = function() {
      if (request.readyState === 4) {
        alert(request.responseText);
      }
    };

    request.send({
      message: message,
      content: editor.getValue()
    });
  });

  var newButton = document.getElementById('new');
  newButton.addEventListener('click', function() {
    editor.setValue('');
  });
});
