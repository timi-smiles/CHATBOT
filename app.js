const sendChatBtn = document.querySelector('.chat-input span');
const chatInput = document.querySelector('.chat-input textarea');
const chatbox = document.querySelector('.chatbox');


let userMessage;
const API_KEY = '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';

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement('li');
    chatLi.classList.add('chat', className);
    let chatContent = className === 'outgoing' ? `<p>${message}</p>` :  `<span class="material-symbols-outlined">smart_toy</span>
    <p>${message}</p>`
    chatLi.innerHTML = chatContent;
    return chatLi;
}


const generateResponse = (incomingChatLI) => {
    const API_URL = 'https://api.openai.com/v1/chat/completions';
    const messageElement = incomingChatLI.querySelector('p');
    
    const requestOptions ={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: userMessage
              }]
        })
    }

    //Send POST request to API, get response  
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        // console.log(data);
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) =>{
        // console.log(error);
        messageElement.textContent = 'Oops! Something went wrong. Please try again.';

    })
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    // console.log(userMessage);
    if (!userMessage) return;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, 'outgoing'));

    setTimeout(() =>{
        //Display Thinking... message while waiting for resposne
        const incomingChatLI = createChatLi('Thinking....', 'incoming')
        chatbox.appendChild(incomingChatLI);
        generateResponse(incomingChatLI);
    }, 600);
}

sendChatBtn.addEventListener('click', handleChat);