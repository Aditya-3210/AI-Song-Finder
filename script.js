const GEMINI_API_KEY = 'AIzaSyBgbMg_8BfiHXwNAZ7ZuJCyS_veZJz7F4w';

const chatArea = document.getElementById('chat-area');
const input = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const clearBtn = document.getElementById('clear-chat');

function appendMessage(text, sender) {
  const msg = document.createElement('div');
  msg.className = `message ${sender}`;

  const content = document.createElement('div');
  content.className = 'message-content';
  content.innerText = text;

  msg.appendChild(content);
  chatArea.appendChild(msg);
  chatArea.scrollTop = chatArea.scrollHeight;
}

async function handleSend() {
  const userInput = input.value.trim();
  if (!userInput) return;

  appendMessage(userInput, 'user');
  input.value = '';
  appendMessage("Finding songs for your mood...", 'bot');

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You're an AI music expert. A user is feeling a certain way. Based on their mood, recommend 5–6 songs (both English and Punjabi, latest preferred). Mention the song name followed by the artist. Format it as a numbered list. User's input: "${userInput}"`
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, couldn't fetch songs 😕";
    appendMessage(reply, 'bot');
  } catch (error) {
    console.error("Gemini API Error:", error);
    appendMessage("Oops! Gemini is not responding. Please try again later.", 'bot');
  }
}

// Button event listeners
sendBtn.addEventListener('click', handleSend);
clearBtn.addEventListener('click', () => {
  chatArea.innerHTML = '';
  input.value = '';
});
