const LASTFM_API_KEY = 'YOUR_LASTFM_API_KEY';
const GEMINI_API_KEY = '';

const chatBox = document.getElementById('chat-box');
const input = document.getElementById('user-input');

function appendMessage(text, sender) {
  const msg = document.createElement('div');
  msg.className = `message ${sender}`;
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function handleSend() {
  const userInput = input.value.trim();
  if (!userInput) return;

  appendMessage(userInput, 'user');
  input.value = '';

  
  let mood = userInput;
  if (GEMINI_API_KEY) {
    try {
      const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Detect the mood from this input: "${userInput}". Just respond with one or two keywords.` }] }]
        })
      });

      const geminiData = await geminiResponse.json();
      const reply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) mood = reply.toLowerCase().split(' ')[0]; // pick first keyword
    } catch (err) {
      console.error("Gemini API error:", err);
    }
  }

  appendMessage("Looking for songs based on mood: " + mood, 'bot');

  try {
    const res = await fetch(`https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${encodeURIComponent(mood)}&api_key=${LASTFM_API_KEY}&format=json`);
    const data = await res.json();

    const tracks = data.tracks?.track?.slice(0, 5);
    if (!tracks || tracks.length === 0) {
      appendMessage("Sorry, I couldn't find any songs for that mood 😕", 'bot');
      return;
    }

    let reply = "🎶 Top songs for your mood:\n";
    tracks.forEach((track, index) => {
      reply += `${index + 1}. ${track.name} by ${track.artist.name}\n`;
    });
    appendMessage(reply, 'bot');
  } catch (error) {
    console.error(error);
    appendMessage("Oops! Something went wrong while fetching songs.", 'bot');
  }
}
