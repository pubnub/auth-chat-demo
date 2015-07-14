(function() {

  if (typeof(user) === 'undefined') {
    return;
  } 

  var output = PUBNUB.$('output'), 
      input = PUBNUB.$('input'), 
      avatar = PUBNUB.$('avatar'),
      presence = PUBNUB.$('presence'),
      action = PUBNUB.$('action'),
      send = PUBNUB.$('send');

  var channel = 'pam-chat-demo';
  
  var pubnub = PUBNUB.init({
      subscribe_key: 'sub-c-981faf3a-2421-11e5-8326-0619f8945a4f',
      publish_key: 'pub-c-351c975f-ab81-4294-b630-0aa7ec290c58',
      uuid: user.username,
      auth_key: user.accessToken,
      ssl: true
  });


  function displayOutput(m) {
    if(!m) return;
    if(typeof(m.text) === 'undefined') return;
    return '<p><img src="'+ m.avatar +'" class="avatar"><strong>' +  m.uuid + '</strong><br><span>' + m.text + '</span></p>'
  }

  function getHistory() {
    pubnub.history({
      channel  : channel,
      count    : 30,
      callback : function(messages) {
        messages[0].forEach(function(m){ 
          output.innerHTML = displayOutput(m) + output.innerHTML;
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
      output.innerHTML = displayOutput(m) + output.innerHTML;
    },
    presence: function(m){
      if(m.occupancy > 1) {
        presence.textContent = m.occupancy + ' people online';
      } else {
        presence.textContent = 'Nobody else is online';
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
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); 
    xhr.send('text='+input.value);
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