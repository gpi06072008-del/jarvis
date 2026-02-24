let token = "";

async function login() {
  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "test@test.com", password: "123456" })
  });

  const data = await res.json();
  token = data.token;
}

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

function startListening() {
  recognition.start();
}

recognition.onresult = async function(event) {
  const transcript = event.results[0][0].transcript;

  const response = await fetch("http://localhost:3000/ai/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({ message: transcript })
  });

  const data = await response.json();
  speechSynthesis.speak(new SpeechSynthesisUtterance(data.reply));
};
