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

document.getElementById("message-input").addEventListener("keydown", (e)=>{
    if (e.code === "Enter"){
        const textfield = document.getElementById("message-input");
        // socket.send(textfield.value);
        new_chat("me", textfield.value);
        textfield.value = '';
    }
})


function new_chat(sender, message) {
    
    const chatelement = document.getElementById('init-chat');
    chatelement.innerHTML += 
    `<div>
    <label class="chatter-name">${sender}: </label>
    <a class="chatter-message">${message}</a>
</div>`
    chatelement.lastChild.setAttribute("style", `animation-name: chatintro;
    animation-duration:  .5s;`);
    
}