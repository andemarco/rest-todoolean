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
    var listItem = $('.insert').val();
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

  $('.add_item_button').click (function(){
    addItem ();
    var listItem = $('.insert').val('');
  })

  function deleteItem (id) {
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
  }


  $(document).on("click", ".delete", function() {
    var buttonDelete = $(this);
    var id = buttonDelete.parent().attr("data-list");
    deleteItem (id);
  });

  $(document).on("click", ".edit", function() {
    var buttonUp = $(this);
    buttonUp.siblings('.update').show();
  });

  // FUNZIONE PER MODIFICARE ITEM
  $(document).on("click", ".up_item_button", function() {
    var buttonUp = $(this);
    var id = buttonUp.parent().parent().attr("data-list");
    var listItemMod = buttonUp.siblings('.mod').val();
    $.ajax({
      url: "http://157.230.17.132:3013/todos/" + id,
      method: "PUT",
      data: {
        "text": listItemMod,
      },
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
