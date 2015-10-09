(function() {

  if (typeof(user) === 'undefined') {
    return;
  } 

  var output = document.getElementById('output'), 
      input = document.getElementById('input'), 
      avatar = document.getElementById('avatar'),
      presence = document.getElementById('presence'),
      action = document.getElementById('action'),
      send = document.getElementById('send');

  var channel = 'am-ecc-chat';

  var keysCache = {};
  
  var pubnub = PUBNUB.init({
      subscribe_key: 'sub-c-981faf3a-2421-11e5-8326-0619f8945a4f',
      publish_key: 'pub-c-351c975f-ab81-4294-b630-0aa7ec290c58',
      uuid: user.username,
      auth_key: user.accessToken,
      ssl: true
  });


  function displayOutput(message) {
    if(!message) return;
    if(typeof(message.text) === 'undefined') return;

    var html = '';

    if ('userid' in message && message.userid in keysCache) {

      var signature = message.signature;

      delete message.signature;

      var result = ecc.verify(keysCache[message.userid].publicKey, signature, JSON.stringify(message));

      if(result) {
        html = '<p><img src="'+ keysCache[message.userid].avatar +'" class="avatar"><strong>' +  keysCache[message.userid].username + '</strong><br><span>' + message.text + '</span></p>';
      } else {
        html = '<p><img src="images/troll.png" class="avatar"><strong></strong><br><em>A troll tried to spoof '+ keysCache[message.userid].username +' (but failed).</em></p>';
      } 

      output.innerHTML = html + output.innerHTML;

    } else {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/user/' + message.userid, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          var res = JSON.parse(xhr.responseText);

          keysCache[message.userid] = {
            'publicKey': res.publicKey,
            'username': res.username,
            'displayName': res.displayName,
            'avatar': res.avatar_url,
            'id': res.id
          }
          displayOutput(message);
        }
      };
      xhr.send(null); 
    }
  }

  function getHistory() {
    pubnub.history({
      channel: channel,
      count: 30,
      callback: function(messages) {
        messages[0].forEach(function(m){ 
          displayOutput(m);
        });
      }
    });
  }

  pubnub.subscribe({
    channel: channel,
    restore: true,
    connect: getHistory,
    disconnect: function(res){
      console.log('disconnect called');
    },
    reconnect: function(res){
      console.log('reconnecting to pubnub');
    },
    callback: function(m) {
      displayOutput(m);
    },
    presence: function(m){
      if(m.occupancy === 1) {
        presence.textContent = m.occupancy + ' person online';
      } else {
        presence.textContent = m.occupancy + ' people online';
      }
      if((m.action === 'join') || (m.action === 'timeout') || (m.action === 'leave')){
        var status = (m.action === 'join') ? 'joined' : 'left';
        action.textContent = m.uuid + ' ' + status +' room';
        action.classList.add(m.action);
        action.classList.add('poof');
        action.addEventListener('animationend', function(){action.className='';}, false);
      }
    }
  });

  function post() {
    var safeText = input.value.replace(/\&/g, '&amp;').replace( /</g,  '&lt;').replace(/>/g,  '&gt;');
    var message = { text: safeText, userid: user.id };

    var signature = ecc.sign(user.eccKey, JSON.stringify(message));
    message['signature'] = signature;

    pubnub.publish({
      channel: channel,
      message: message
    });
    
    input.value = '';
  }

  input.addEventListener('keyup', function(e) {
    if(input.value === '') return;
    (e.keyCode || e.charCode) === 13 && post();
  }, false);

  send.addEventListener('click', function(e) {
    if(input.value === '') return;
    post();
  }, false);


})();