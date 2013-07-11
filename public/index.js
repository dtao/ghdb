function dataToQueryStr(data) {
  var query = [];
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      query.push(encodeURIComponent(key + '=' + data[key]));
    }
  }
  return '?' + query.join('&');
}

window.addEventListener('load', function() {
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/javascript");

  var saveButton = document.getElementById('save');
  saveButton.addEventListener('click', function() {
    var message = prompt('Enter a commit message.');
    if (!message) {
      return;
    }

    var request = new XMLHttpRequest();

    request.open('POST', '/');
    request.addEventListener('progress', function() {
      if (request.readyState === 4) {
        alert(request.responseText);
      }
    });

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(dataToQueryStr({
      message: message,
      content: editor.getValue()
    }));
  });

  var newButton = document.getElementById('new');
  newButton.addEventListener('click', function() {
    editor.setValue('');
  });
});
