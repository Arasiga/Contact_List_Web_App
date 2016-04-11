
var create_contact_function = function(event){
  event.preventDefault();

  contactName = $('#contact_name').val();
  contactEmail = $('#contact_email').val();
  contactPhone = $('#contact_phone').val();
  contactMessage = $('#contact_message').val();

  $.ajax({
    type: "POST",
    url: "/index/new_contact",
    data: {
      'name': contactName,
      'email': contactEmail,
      'phone': contactPhone,
      'message': contactMessage
    }
  }).done(function(data){

    if (JSON.parse(data)["success"] === true){
      var id = JSON.parse(data)["data"][0]["id"];
      var html = "";
      html += "<tr id='contact_" + id + "'>";
      html += "<td>" + JSON.parse(data)["data"][0]["name"] + "</td>";
      html += "<td>" + JSON.parse(data)["data"][0]["email"] + "</td>";
      html += "<td>" + JSON.parse(data)["data"][0]["phone"] + "</td>";
      html += "<td>" + JSON.parse(data)["data"][0]["message"] + "</td>";
      html += "<td><a class='edit' data-id='" + id + "' style='color:white;' href=''> EDIT/</a><a data-id='" + id + "' class='delete' style='color:white;' href=''> DELETE </a></td>";
      html += "</tr>";
      $('#new_contact').append(html);
    } else if (JSON.parse(data)["success"] === false){
      alert("There was an error while trying to create your contact, please try again (Contacts cannot have the same email!)");
    }

  });
}

var delete_contact_function = function(event){
  event.preventDefault();

  var contact_id = $(this).data().id;
  var response = confirm('Are you sure?');

  if (response ===true) {
    $.ajax({
      type: "DELETE",
      url: "/index/delete_contact",
      data: {'contactId': contact_id}
    }).done(function(data){
      $('tr#contact_' + data).remove();
    });

  } 
}

var edit_contact_function = function(event){
  event.preventDefault();
  var response = confirm('Edit contact?');

  if (response === true){

   var contact_id = $(this).data().id;
   var length = $('#contact_' + contact_id).children().length - 1;
   var row = $('#contact_' + contact_id);
   var namePlaceholder = row.find("td").eq(0).html();
   var emailPlaceholder = row.find("td").eq(1).html();
   var phonePlaceholder = row.find("td").eq(2).html();
   var messagePlaceholder = row.find("td").eq(3).html();

   row.find("td").hide();
   var html = "";
  
   html += "<td><input class='input_box' type='text' value='" + namePlaceholder +"' id='updated_contact_name' required></td>";
   html += "<td><input class='input_box' type='email' value='" + emailPlaceholder +"' id='updated_contact_email' required></td>";
   html += "<td><input class='input_box' type='number' value='" + phonePlaceholder +"' id='updated_contact_phone' required></td>";
   html += "<td><input class='input_box' type='text' value='" + messagePlaceholder +"' id='updated_contact_message' required></td>";
   html += "<td><input class='submit_button' type='submit' placeholder='" + namePlaceholder +"' value='Update contact!'></td>";

   row.append(html);


   $(row).on('click', '.submit_button', function(event){
      event.preventDefault();

      var newName = $('#updated_contact_name').val();
      var newEmail = $('#updated_contact_email').val();
      var newPhone = $('#updated_contact_phone').val();
      var newMessage = $('#updated_contact_message').val();

      var row = $(this).parent().parent();
      var length = 6;

      for (var i=0; i<length; i++){
        if (i < 5){
          row.find("td").eq(i).show();
        } else {
          row.find("td").eq(9).remove();
          row.find("td").eq(8).remove();
          row.find("td").eq(7).remove();
          row.find("td").eq(6).remove();
          row.find("td").eq(5).remove();
        }
      }

    $.ajax({
      type: "PATCH",
      url: "/index/edit_contact",
      data: {
        'contactId': contact_id,
        'updated_name': newName,
        'updated_email': newEmail,
        'updated_phone': newPhone,
        'updated_message': newMessage
      }
    }).done(function(data){

      var newInfo = JSON.parse(data)["data"][0];

      var name = newInfo.name;
      var email = newInfo.email;
      var phone = newInfo.phone;
      var message = newInfo.message;
      var id = newInfo.id;

      var row = $('#contact_' + id);

      row.find("td").eq(0).text(name);
      row.find("td").eq(1).text(email);
      row.find("td").eq(2).text(phone);
      row.find("td").eq(3).text(message);

    });

   });

  } 
}


$(document).ready(function(){

  var contactName = "";
  var contactEmail = "";
  var contactPhone = "";
  var contactMessage = "" ;

  $('#contact_create').on('submit', create_contact_function);
  $('#new_contact').on('click', '.delete', delete_contact_function);
  $('#new_contact').on('click', '.edit', edit_contact_function);


});


 







