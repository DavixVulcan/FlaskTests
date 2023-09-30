const socket = new WebSocket('ws://' + location.host + '/echo');
socket.addEventListener('message', ev => {
    console.log("recieved:" + ev.data)
})

document.getElementById('whisper-send').onclick = ev => {
    const textfield = document.getElementById("whisper-input");
    add_whisper_message(get_current_contact(), textfield.value, true);
    textfield.value = "";
}

document.getElementById("whisper-input").addEventListener("keydown", (e)=>{
    if (e.code === "Enter"){
        const textfield = document.getElementById("whisper-input");
        add_whisper_message(get_current_contact(), textfield.value, true);
        textfield.value = "";
    }
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
        socket.send(sender + delimiter + message);
    }
}

function open_message(contact_name) {

    var live_tab = get_live_chat_tab();
    live_tab.setAttribute("onclick", "open_live('" + contact_name + "')");
    var mess_tab = get_whispers_tab();
    mess_tab.setAttribute("onclick", "open_message('" + contact_name + "')");

    console.log("opening messages for: " + contact_name);

    const tabslistedasactive = document.getElementsByClassName("active-contact");
    for (var i = 0; i < tabslistedasactive.length; i++){
        tabslistedasactive[i].setAttribute("class", "contact");
    }

    const alltabs = get_contacts_elements();
    for (var i = 0; i < alltabs.length; i++){
        if (alltabs[i].innerHTML === contact_name) {
            alltabs[i].setAttribute("class", "active-contact");
        }
    }

    const toptabslistedasactive = document.getElementsByClassName("active-message-tab");
    for (var i = 0; i < toptabslistedasactive.length; i++){
        toptabslistedasactive[i].setAttribute("class", "message-tab");
    }

    const topalltabs = document.getElementsByClassName("message-tab");
    for (var i = 0; i < topalltabs.length; i++){
        if (topalltabs[i].innerHTML === "Whispers") {
            topalltabs[i].setAttribute("class", "active-message-tab");
        }
    }

    const mess = document.getElementsByClassName("message-area-messages");
    for (var i = 0; i < mess.length; i++){
        mess[i].style.display = 'none';
    }

    const live = document.getElementsByClassName("message-area-lives");
    for (var i = 0; i < live.length; i++){
        live[i].style.display = 'none';
    }

    var selected_message_box = document.getElementById(contact_name+"-mess");
    var selected_live_box = document.getElementById(contact_name+"-live");

    selected_message_box.style.display = 'flex';
    selected_live_box.style.display = 'none';

    document.getElementById("whisper-form").style.display = 'flex'
    document.getElementById('message-current-contact').innerHTML = contact_name;
}

function open_live(contact_name) {
    
    var live_tab = get_live_chat_tab();
    live_tab.setAttribute("onclick", "open_live('" + contact_name + "')");
    var mess_tab = get_whispers_tab();
    mess_tab.setAttribute("onclick", "open_message('" + contact_name + "')");

    console.log("opening lives for: " + contact_name);

    const tabslistedasactive = document.getElementsByClassName("active-contact");
    for (var i = 0; i < tabslistedasactive.length; i++){
        tabslistedasactive[i].setAttribute("class", "contact");
    }

    const alltabs = get_contacts_elements();
    for (var i = 0; i < alltabs.length; i++){
        if (alltabs[i].innerHTML === contact_name){
            alltabs[i].setAttribute("class", "active-contact");
        }
    }

    const toptabslistedasactive = document.getElementsByClassName("active-message-tab");
    for (var i = 0; i < toptabslistedasactive.length; i++){
        toptabslistedasactive[i].setAttribute("class", "message-tab");
    }

    const topalltabs = document.getElementsByClassName("message-tab");
    for (var i = 0; i < topalltabs.length; i++){
        if (topalltabs[i].innerHTML === "Live Chat"){
            topalltabs[i].setAttribute("class", "active-message-tab");
        }
    }

    const mess = document.getElementsByClassName("message-area-messages");
    for (var i = 0; i < mess.length; i++){
        mess[i].style.display = 'none';
    }

    const live = document.getElementsByClassName("message-area-lives");
    for (var i = 0; i < live.length; i++){
        live[i].style.display = 'none';
    }

    var selected_message_box = document.getElementById(contact_name+"-mess");
    var selected_live_box = document.getElementById(contact_name+"-live");

    selected_message_box.style.display = 'none';
    selected_live_box.style.display = 'flex';

    document.getElementById("whisper-form").style.display = 'none'
    document.getElementById('message-current-contact').innerHTML = contact_name;
}

function create_contact(contact_name) {
    var current_contacts = get_contacts();
    if (!current_contacts.includes(contact_name)){
        var message_area = document.getElementById("message-area");
        var contacts = document.getElementById("contacts");

        var new_live = document.createElement("div");
        new_live.setAttribute("class", "message-area-lives");
        new_live.setAttribute("id", contact_name + "-live");
        new_live.style.display = "none";

        var new_mess = document.createElement("div");
        new_mess.setAttribute("class", "message-area-messages");
        new_mess.setAttribute("id", contact_name + "-mess");
        new_mess.style.display = "none";

        message_area.appendChild(new_mess);
        message_area.appendChild(new_live);

        var new_contact = document.createElement("button");
        new_contact.setAttribute("class", "spawn-contact");
        new_contact.setAttribute("onclick", "open_message('" + contact_name + "')");
        new_contact.innerHTML = contact_name;
        contacts.appendChild(new_contact);
    } else {
        console.log(contact_name + " already exists as a contact");
    }
}

function delete_contact(contact_name) {
    var current_contacts = get_contacts();
    if (current_contacts.includes(contact_name)){
        var message_tab = document.getElementById("message-current-contact");
        var live_tab = get_live_chat_tab();
        var mess_tab = get_whispers_tab();
        if (message_tab.innerHTML === contact_name){
            message_tab.innerHTML = "";
            live_tab.onclick = null;
            mess_tab.onclick = null;
        }

        var contacts = document.getElementById("contacts");

        var old_live = document.getElementById(contact_name + "-live");
        old_live.remove();

        var old_mess = document.getElementById(contact_name + "-mess");
        old_mess.remove();

        var contacts =  get_contacts_elements();
        for (var i = 0; i < contacts.length; i++){
            if (contacts[i].innerHTML === contact_name){
                contacts[i].remove();
            }
        }
    } else {
        console.log(contact_name + " does not exist as a contact");
    }

}

function add_whisper_message(contact_name, message, self = false) {
    message = message.trim();
    console.log(message);
    if (message.length !== 0){
        var messaging_area = document.getElementById(contact_name+"-mess");
        var message_sent = document.createElement("div");
        message_sent.innerHTML = message;
        if (self){
            message_sent.setAttribute("class", "whisper-chat self-chat");
        } else {
            message_sent.setAttribute("class", "whisper-chat external-chat");
        }

        try {
            messaging_area.insertBefore(message_sent, messaging_area.firstChild);
        } catch (e) {
            if (e instanceof TypeError){
                console.log(contact_name + " does not exist as a contact");
            } else {
                console.log(e);
            }
        }
    }
    
}

function add_live_message(contact_name, message) {
    message = message.trim();
    if (message.length !== 0){
        var live_area = document.getElementById(contact_name+"-live");
        var message_sent = document.createElement("div");
        message_sent.innerHTML = message;
        message_sent.setAttribute("class", "live-message-chat");

        try {
            live_area.insertBefore(message_sent, live_area.firstChild);
        } catch (e) {
            if (e instanceof TypeError){
                console.log(contact_name + " does not exist as a contact");
            } else {
                console.log(e);
            }
        }
    }

}

function get_current_contact(){
    var curr = document.getElementById("message-current-contact");
    return curr.innerHTML;
}

function get_contacts() {
    var contactlist = document.getElementById("contacts").children;
    var contacts = [];

    for (var i = 0; i < contactlist.length; i++){
        contacts.push(contactlist[i].innerHTML);
    }

    return contacts;
}

function get_contacts_elements() {
    return document.getElementById("contacts").children;
}

function get_live_chat_tab() {
    var message_tabs = document.getElementById("message-tabs").children;
    for (var i = 0; i < message_tabs.length; i++){
        if (message_tabs[i].innerHTML === "Live Chat"){
            return message_tabs[i];
        }
    }
}

function get_whispers_tab() {
    var message_tabs = document.getElementById("message-tabs").children;
    for (var i = 0; i < message_tabs.length; i++){
        if (message_tabs[i].innerHTML === "Whispers"){
            return message_tabs[i];
        }
    }
}

// function get_topnav_tab(name) {
//     var topnav_els = document.getElementById("right-menu").children;
//     for (var i = 0; i < topnav_els.length; i++){
//         if (topnav_els[i].innerHTML === name){
//             return topnav_els[i];
//         }
//     }

//     console.log(name + " does not exist in the topnav");
// }

function open_page(name) {
    var page = document.getElementById(name);
    var pages = document.getElementById("right-menu").children;
    for (var i = 0; i < pages.length; i++){
        var innerpage = document.getElementById(pages[i].innerHTML);
        innerpage.style.display = "none";
    }
    page.style.display = "grid";
}