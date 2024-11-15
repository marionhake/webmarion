import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC8eA_D3BcJpJU0QSEZdd_ql3KiJi9RFnk",
  authDomain: "marion-data.firebaseapp.com",
  projectId: "marion-data",
  storageBucket: "marion-data.firebasestorage.app",
  messagingSenderId: "521478249359",
  appId: "1:521478249359:web:51559fb0161f4f073409fa",
  measurementId: "G-S5BWCZYKPV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user && (window.location.pathname === "/login" || window.location.pathname === "/register")) {
    window.location.href = "/home";
  }
  if (!user && window.location.pathname === "/home") {
    window.location.href = "/login";
  }
});

const registerForm = document.getElementById('register-form');
const errorMessageDiv = document.getElementById('error-message');

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  if (!email || !password) {
    errorMessageDiv.innerText = "Please fill out both fields.";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Send email verification
    await sendEmailVerification(userCredential.user);
    alert('Registration successful! A verification email has been sent to your email address.');
    
    // Redirect to login after registration
    window.location.href = "/login";
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    errorMessageDiv.innerText = errorMessage;
  }
});

const loginForm = document.getElementById('login-form');
const loginErrorMessageDiv = document.getElementById('login-error-message');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (userCredential.user.emailVerified) {
      window.location.href = "/home"; // Proceed to home if email is verified
    } else {
      alert('Please verify your email before logging in.');
      signOut(auth); // Log out if email is not verified
    }
  } catch (error) {
    const errorMessage = error.code === 'auth/wrong-password' ? "Incorrect password" : error.code === 'auth/user-not-found' ? "User not found" : "Error logging in";
    loginErrorMessageDiv.innerText = errorMessage;
  }
});

const logoutButton = document.getElementById('logout-btn');
if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => window.location.href = "/login");
  });
}

function getErrorMessage(error) {
  let errorMessage = "An error occurred. Please try again.";
  switch (error.code) {
    case 'auth/email-already-in-use':
      errorMessage = "The email address is already in use by another account.";
      break;
    case 'auth/invalid-email':
      errorMessage = "The email address is not valid.";
      break;
    case 'auth/weak-password':
      errorMessage = "The password is too weak. It must be at least 6 characters.";
      break;
    default:
      errorMessage = "Something went wrong. Please try again later.";
      break;
  }
  return errorMessage;
}
