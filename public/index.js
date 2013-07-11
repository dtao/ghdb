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

    var form = document.querySelector('form');
    form.querySelector("input[name='message']").value = message;
    form.querySelector("textarea[name='content']").value = editor.getValue();
    form.submit();
  });

  var newButton = document.getElementById('new');
  newButton.addEventListener('click', function() {
    window.location = '/';
  });
});
