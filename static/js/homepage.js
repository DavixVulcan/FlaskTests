const socket = new WebSocket('ws://' + location.host + '/echo');
socket.addEventListener('message', ev => {
    console.log("recieved:" + ev.data)
})

document.getElementById('chat-send').onclick = ev => {
    
    const textfield = document.getElementById("message-input");
    // socket.send(textfield.value);
    new_chat("me", textfield.value);
    textfield.value = '';
}



function new_chat(sender, message) {
    const chatelement = document.getElementById('init-chat')
    var chatbox = document.getElementById('upper-chat-text');
    chatbox.appendChild(chatelement.cloneNode(true));
    console.log(chatbox.lastChild);
}