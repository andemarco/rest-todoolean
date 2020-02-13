$(document).ready(function(){
  function stampList () {
    var source = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);
    $.ajax({
      url: "http://157.230.17.132:3013/todos",
      method: "GET",
      success: function (data, stato) {
        for (var i = 0; i < data.length; i++) {
          var element = data[i].text;
          var id = data[i].id;
          var context = {
            'element': element,
            'id': id
            };
          var html = template(context);
          $('.list').append(html)
        }
      },
      error: function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. " + errore);
      }
    });
  }

  stampList();

  function addItem () {
    var source = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);
    var listItem = $('input').val();
    $.ajax({
      url: "http://157.230.17.132:3013/todos",
      method: "POST",
      data: {
      "text": listItem,
      },
      success: function (data, stato) {
        var context = {
          'element': data.text,
          'id': data.id,
          };
        var html = template(context);
        $('.list').append(html);
      },
      error: function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. " + errore);
      }
    });
  }

  $('button').click (function(){
    addItem ();
  })

  $(document).on("click", ".delete", function() {
    var buttonDelete = $(this);
    var id = buttonDelete.parent().attr("data-list")
    $.ajax({
      url: "http://157.230.17.132:3013/todos/" + id,
      method: "DELETE",
      success: function (data, stato) {
        $('.list li').remove();
        stampList();
      },
      error: function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. " + errore);
      }
    });
  });
})
