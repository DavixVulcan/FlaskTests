const socket = new WebSocket('ws://' + location.host + '/echo');
socket.addEventListener('message', ev => {
    console.log("recieved:" + ev.data)
})

document.getElementById('chat-send').onclick = ev => {
    const textfield = document.getElementById("chat-input");
    const chat_context = document.getElementById('upper-chat-text');
    new_chat('me', chat_context, textfield);
}

document.getElementById("chat-input").addEventListener("keydown", (e)=>{
    if (e.code === "Enter"){
        const textfield = document.getElementById("chat-input");
        const chat_context = document.getElementById('upper-chat-text');
        new_chat('me', chat_context, textfield);
    }
})

function new_chat(sender, context, text_field, ) {
    
    message = text_field.value;
    message = message.trim();
    if (message.length !== 0){
        let new_message = document.createElement('div');

        let chatter_name = document.createElement('a');
        chatter_name.innerHTML = sender + ": ";

        let chatter_message = document.createElement('a');
        chatter_message.innerHTML = message;

        new_message.appendChild(chatter_name);
        new_message.appendChild(chatter_message);

        new_message.setAttribute("class", "chat-message");
        context.insertBefore(new_message, context.firstChild);
        text_field.value = '';
    }
}