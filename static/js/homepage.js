const socket = new WebSocket('ws://' + location.host + '/echo');
socket.addEventListener('message', ev => {
    console.log("recieved:" + ev.data)
})

document.getElementById('chat-send').onclick = ev => {
    
    const textfield = document.getElementById("message-input");
    // socket.send(textfield.value);
    if (textfield.value.length != 0) {
        new_chat("me", textfield.value);
        textfield.value = '';
    }
}

document.getElementById("message-input").addEventListener("keydown", (e)=>{
    if (e.code === "Enter"){
        const textfield = document.getElementById("message-input");
        // socket.send(textfield.value);
        if (textfield.value.length != 0) {
            new_chat("me", textfield.value);
            textfield.value = '';
        }
    }
})

var anchory = document.getElementById('init-chat');

function new_chat(sender, message) {
    
    var chatelement = document.getElementById('upper-chat-text');
    

    let new_message = document.createElement('div');
    new_message.innerHTML += `<div>
    <a class="chatter-name">${sender}: </a>
    <a class="chatter-message">${message}</a>
</div>`
    new_message.setAttribute("style", `animation-name: chatintro;
    animation-duration:  .25s;`);
    chatelement.insertBefore(new_message, anchory);
    anchory = new_message;
}