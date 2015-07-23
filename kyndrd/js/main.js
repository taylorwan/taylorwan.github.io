$(function() {

  // send message if you press enter
  $('#your-msg').keypress(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      msgUpdate();
    }
  });

  // Firefox
  $('#msg-history').bind('DOMMouseScroll', allowScroll);
  // IE, Opera, Safari
  $('#msg-history').bind('mousewheel', allowScroll);

  // send message if you click the send button
  $('#send-msg').click(msgUpdate);

});

function msgUpdate() {
  // grab and generate message
  var msg = $('#your-msg').val();
  var msgHTML = toHTML(msg, 'yours');

  // append message and clear input
  addMsg(msgHTML);
  clearBox();

  // for now, fake a response
  letsRespond(findResponse(msg));
}

function addMsg(msg) {
  $('#msg-history').append(msg);
  viewNewMsg();
}

function viewNewMsg() {
  $('#msg-history').css('bottom', 0);
}
function allowScroll() {
  console.log("scroll detected");
  $('#msg-history').css('bottom', 'auto');
}

function letsRespond(response) {
  var chance = parseInt(Math.random() * 4);
  responseHTML = toHTML(response, 'theirs');
  if (chance > 0) {
    setTimeout(function(){
      addMsg(responseHTML);
    }, chance * 300);
  }
}

function findResponse(msg) {
  msg = msg.toLowerCase();
  if ( msg.indexOf("hello") >= 0) {
    return "Hey!";
  } else if ( msg.indexOf("hey") >= 0) {
    return "Hi there!";
  } else if ( msg.indexOf("much") >= 0) {
    return "Cool.";
  } else if ( msg.indexOf("what's up") >= 0) {
    return "Not much. How about you?";
  } else if ( msg.indexOf("ugh") >= 0) {
    return "Sorry, have I annoyed you?";
  } else if ( msg.indexOf("bye") >= 0) {
    return "Ciao!";
  }
  var option = parseInt(Math.random() * 6);
  switch (option) {
    case 0:
      return "Tell me more about that.";
    case 1:
      return "Why is that?";
    case 2:
      return "So where do you work?";
    case 3:
      return "You know, product management is really cool.";
    case 4:
      return "So what do you think of the weather?";
    case 5:
      return "Hmm.";
  }
}

function toHTML(msg, v) {
  var html = '<div class="msg-bubble ' + v + '"><span class="name">';
  if (v === 'yours') {
    html += 'Me';
  } else {
    html += $('#msg-name').text().split(' ')[0];
  }
  html += '</span>';
  html += msg + '</div>';
  return html;
}

function clearBox() {
  $('#your-msg').val('');
}