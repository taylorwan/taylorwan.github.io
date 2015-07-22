$(function() {

  // send message if you press enter
  $('.your-msg').keypress(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      msgUpdate();
    }
  });

  // send message if you click the send button
  $('.send-msg').click(msgUpdate);

});

function msgUpdate() {
  var msg = $('.your-msg').val();
  var msgHTML = toHTML(msg, 'yours');

  $('.msg-history').append(msgHTML);
  clearBox();
}

function toHTML(msg, v) {
  return '<div class="msg-bubble ' + v + '">' + msg + '</div>';
}

function clearBox() {
  $('.your-msg').val('');
}