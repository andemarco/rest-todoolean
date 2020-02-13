$(document).ready(function(){
  var source = document.getElementById("entry-template").innerHTML;
  var template = Handlebars.compile(source);
  $.ajax({
    url: "http://157.230.17.132:3034/todos",
    method: "GET",
    success: function (data, stato) {
      for (var i = 0; i < data.length; i++) {
        var element = data[i].text
        var context = {
          'element': element,
          };
        console.log(context);
        var html = template(context);
        $('.list').append(html)
      }
    },
    error: function (richiesta, stato, errori) {
    alert("E' avvenuto un errore. " + errore);
    }
  });
  $(document).on("click", ".delete", function() {
    alert ('cangelli')
  });
})
