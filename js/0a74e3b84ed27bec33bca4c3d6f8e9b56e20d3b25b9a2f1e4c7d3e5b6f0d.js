import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateEmail, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC8eA_D3BcJpJU0QSEZdd_ql3KiJi9RFnk",
  authDomain: "marion-data.firebaseapp.com",
  projectId: "marion-data",
  storageBucket: "marion-data.firebaseapp.com",
  messagingSenderId: "521478249359",
  appId: "1:521478249359:web:51559fb0161f4f073409fa",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  const path = window.location.pathname;
  if (user) {
    if (path === "/login.html" || path === "/register.html") window.location.href = "/home.html";
  } else {
    if (path !== "/login.html" && path !== "/register.html") window.location.href = "/login.html";
  }
});

document.getElementById('register-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  if (!email || !username || !password) return displayError("Please fill out all fields.");
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateEmail(auth.currentUser, username);
    window.location.href = "/home.html";
  } catch (error) {
    displayError(error.message);
  }
});

document.getElementById('login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const identifier = document.getElementById('login-identifier').value;
  const password = document.getElementById('login-password').value;

  if (!identifier || !password) return displayError("Please fill out both fields.");
  try {
    await signInWithEmailAndPassword(auth, identifier, password);
    window.location.href = "/home.html";
  } catch (error) {
    displayError(error.message);
  }
});

document.getElementById('logout-btn')?.addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = "/login.html";
});

document.getElementById('settings-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newPhone = document.getElementById('new-phone').value;
  const newEmail = document.getElementById('new-email').value;

  try {
    if (newEmail) await updateEmail(auth.currentUser, newEmail);
    displayError("Settings updated successfully.");
  } catch (error) {
    displayError(error.message);
  }
});

function displayError(message) {
  document.getElementById('error-message').innerText = message;
}
