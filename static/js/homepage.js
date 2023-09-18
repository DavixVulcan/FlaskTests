const socket = new WebSocket('ws://' + location.host + '/echo');
socket.addEventListener('message', ev => {
    console.log("recieved:" + ev.data)
})

document.getElementById('chat-send').onclick = ev => {
    const textfield = document.getElementById("chat-input");
    const chat_context = document.getElementById('upper-chat-text');
    new_chat('me', chat_context, textfield, "chat-message", ":");
}

document.getElementById("chat-input").addEventListener("keydown", (e)=>{
    if (e.code === "Enter"){
        const textfield = document.getElementById("chat-input");
        const chat_context = document.getElementById('upper-chat-text');
        new_chat('me', chat_context, textfield, "chat-message", ":");
    }
})

document.getElementById('console-send').onclick = ev => {
    const textfield = document.getElementById("console-input");
    const chat_context = document.getElementById('upper-console-text');
    new_chat('Console', chat_context, textfield, "console-message", ":>");
}

document.getElementById("console-input").addEventListener("keydown", (e)=>{
    if (e.code === "Enter"){
        const textfield = document.getElementById("console-input");
        const chat_context = document.getElementById('upper-console-text');
        new_chat('Console', chat_context, textfield, "console-message", ":>");
    }
})

function new_chat(sender, context, text_field, anim_class, delimiter) {
    
    message = text_field.value;
    message = message.trim();
    if (message.length !== 0){
        let new_message = document.createElement('div');

        let chatter_name = document.createElement('a');
        chatter_name.innerHTML = sender + delimiter + " ";

        let chatter_message = document.createElement('a');
        chatter_message.innerHTML = message;

        new_message.appendChild(chatter_name);
        new_message.appendChild(chatter_message);

        new_message.setAttribute("class", anim_class);
        context.insertBefore(new_message, context.firstChild);
        text_field.value = '';
        socket.send(sender + ": " + message);
    }
}

function open_message(contact_name) {
    
    console.log("opening messages for: " + contact_name);

    const tabslistedasactive = document.getElementsByClassName("active-contact");
    for (var i = 0; i < tabslistedasactive.length; i++){
        tabslistedasactive[i].setAttribute("class", "contact");
    }

    const alltabs = document.getElementById("contacts").children;
    for (var i = 0; i < alltabs.length; i++){
        if (alltabs[i].innerHTML === contact_name) {
            alltabs[i].setAttribute("class", "active-contact");
        }
    }

    // var selected_message_box = document.getElementById(contact_name+"-mess");
    // var selected_live_box = document.getElementById(contact_name+"-live");

    // selected_message_box.style.display = 'block';
    // selected_live_box.style.display = 'none';
}

function create_contact() {
}