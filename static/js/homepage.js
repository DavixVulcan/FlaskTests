const socket = new WebSocket('ws://' + location.host + '/echo');
socket.addEventListener('message', ev => {
    console.log("recieved:" + ev.data)
})

document.getElementById('chat-send').onclick = ev => {
    const textfield = document.getElementById("message-input");
    const chat_context = document.getElementById('upper-chat-text');
    new_chat('me', chat_context, textfield);
}

document.getElementById("message-input").addEventListener("keydown", (e)=>{
    if (e.code === "Enter"){
        const textfield = document.getElementById("message-input");
        const chat_context = document.getElementById('upper-chat-text');
        new_chat('me', chat_context, textfield);
    }
})

function new_chat(sender, context, text_field) {
    
    message = text_field.value;
    if (message.length != 0){
        let new_message = document.createElement('div');
        new_message.innerHTML += `<div>
        <a class="chatter-name">${sender}: </a>
        <a class="chatter-message">${message}</a>
        </div>`
        new_message.setAttribute("style", `animation-name: chatintro;
        animation-duration:  .25s;`);
        context.insertBefore(new_message, context.firstChild);
        text_field.value = '';
    }
}