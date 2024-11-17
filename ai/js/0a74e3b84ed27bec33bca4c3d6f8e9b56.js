import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD6b325OWWeXmDWi3qFGXHa1AmS-uDE3Zw",
  authDomain: "marion-server.firebaseapp.com",
  projectId: "marion-server",
  storageBucket: "marion-server.firebasestorage.app",
  messagingSenderId: "968743643450",
  appId: "1:968743643450:web:eb5591fb3bcaf7f1e2c803",
  measurementId: "G-L8YDT39S51"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function showChat() {
  document.getElementById('auth-container').style.display = 'none';
  document.getElementById('chat-container').style.display = 'block';
}

function showLogin() {
  document.getElementById('auth-container').style.display = 'block';
  document.getElementById('chat-container').style.display = 'none';
}

function login() {
  const email = document.getElementById('auth-email').value;
  const password = document.getElementById('auth-password').value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      showChat();
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
}

function signup() {
  const email = document.getElementById('auth-email').value;
  const password = document.getElementById('auth-password').value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Signup successful! Please log in.");
    })
    .catch((error) => {
      alert("Signup failed: " + error.message);
    });
}

function logout() {
  auth.signOut().then(() => {
    showLogin();
  });
}

auth.onAuthStateChanged((user) => {
  if (user) {
    showChat();
  } else {
    showLogin();
  }
});

function sendMessage() {
  const userInput = document.getElementById('user-input').value;
  if (!userInput.trim()) return;
  appendMessage('You: ' + userInput, 'user');
  const aiResponse = getAIResponse(userInput);
  setTimeout(() => appendMessage('Talk Bot: ' + aiResponse, 'ai'), 1000);
  document.getElementById('user-input').value = '';
}

function appendMessage(message, sender) {
  const chatBox = document.getElementById('chat-box');
  const messageElement = document.createElement('div');
  messageElement.classList.add(sender);
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function checkEnter(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

function getAIResponse(input) {
  const userMessage = input.trim();
  const isGreek = isGreekText(userMessage);
  if (isGreek) {
    return getGreekResponse(userMessage);
  } else {
    return getEnglishResponse(userMessage);
  }
}

function isGreekText(text) {
  const greekRegex = /[\u0370-\u03FF\u1F00-\u1FFF]/;
  return greekRegex.test(text);
}

function getEnglishResponse(input) {
  if (input.toLowerCase().includes('hello') || input.toLowerCase().includes('hi')) {
    return 'Hello! How can I help you today?';
  } else if (input.toLowerCase().includes('make me 1 image')) {
    createImageFromMessage(input);
    return 'I am generating an image based on your request. Please wait!';
  } else if (input.toLowerCase().includes('give me an icon')) {
    provideIcon();
    return 'I am generating an icon for you. Please wait!';
  } else if (input.toLowerCase().includes('roblox leaderstats code') || input.toLowerCase().includes('give me an roblox leaderstats code') || input.toLowerCase().includes('help me add leaderstats in my roblox game')) {
    return getLeaderstatsCode();
  } else if (input.toLowerCase().includes('how are you')) {
    return 'I\'m doing great, thank you for asking!';
  } else if (input.toLowerCase().includes('your name')) {
    return 'I\'m Talk Bot, your friendly AI assistant!';
  } else if (input.toLowerCase().includes('how is marionhake?')) {
    return 'marionhake is my owner!';
  } else if (input.toLowerCase().includes('bye')) {
    return 'Goodbye! Have a great day!';
  } else {
    return 'I\'m not sure how to respond to that. Can you ask something else?';
  }
}

function getGreekResponse(input) {
  if (input.toLowerCase().includes('γειά') || input.toLowerCase().includes('χαίρετε')) {
    return 'Γειά σας! Πώς μπορώ να σας βοηθήσω σήμερα;';
  } else if (input.toLowerCase().includes('κάνε μου 1 εικόνα')) {
    createImageFromMessage(input);
    return 'Δημιουργώ μια εικόνα με βάση το αίτημά σας. Παρακαλώ περιμένετε!';
  } else if (input.toLowerCase().includes('δώσε μου ένα εικονίδιο')) {
    provideIcon();
    return 'Δημιουργώ ένα εικονίδιο για εσάς. Παρακαλώ περιμένετε!';
  } else if (input.toLowerCase().includes('πώς είσαι')) {
    return 'Είμαι πολύ καλά, ευχαριστώ που ρωτήσατε!';
  } else if (input.toLowerCase().includes('το όνομά σου')) {
    return 'Είμαι ο Talk Bot, ο φιλικός σας βοηθός AI!';
  } else if (input.toLowerCase().includes('αντίο')) {
    return 'Αντίο! Να έχετε μια υπέροχη μέρα!';
  } else {
    return 'Δεν ξέρω πώς να απαντήσω σε αυτό. Μπορείτε να ρωτήσετε κάτι άλλο;';
  }
}

function createImageFromMessage(message) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 300;
  canvas.height = 100;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000';
  ctx.font = '20px Arial';
  ctx.fillText(message, 10, 50);
  const link = document.createElement('a');
  link.download = 'generated_image.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function provideIcon() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 64;
  canvas.height = 64;
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000';
  ctx.font = '20px Arial';
  ctx.fillText('AI', 10, 35);
  const link = document.createElement('a');
  link.download = 'icon.ico';
  link.href = canvas.toDataURL('image/x-icon');
  link.click();
}

function getLeaderstatsCode() {
  return `Here's a sample code for leaderstats with DataStore:

  -- datastore
  local DataStoreService = game:GetService("DataStoreService")
  local playerStats = DataStoreService:GetDataStore("PlayerData")

  game.Players.PlayerAdded:Connect(function(player)
      local leaderstats = Instance.new("Folder") --add leaderboards
      leaderstats.Name = "leaderstats" --the folder name
      leaderstats.Parent = player --add in player

      local points = Instance.new("IntValue") --add intvalue
      points.Name = "Points" --the name shows in leaderboards
      points.Value = playerStats:GetAsync(player.UserId) or 0 --the main value is 0 or player data you can change the 0 to start value!
      points.Parent = leaderstats --add intvalue in leaderstats folder

      points.Changed:Connect(function(newValue) --making player data
          playerStats:SetAsync(player.UserId, newValue)
      end)
  end)`;
}
