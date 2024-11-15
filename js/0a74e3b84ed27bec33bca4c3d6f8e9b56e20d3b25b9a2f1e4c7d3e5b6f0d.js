import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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
const db = getFirestore(app);

let verificationCode;

const registerForm = document.getElementById('register-form');
const verificationSection = document.getElementById('verification-section');
const verifyBtn = document.getElementById('verify-btn');
const verificationCodeInput = document.getElementById('verification-code');
const errorMessageDiv = document.getElementById('error-message');
const verificationErrorMessageDiv = document.getElementById('verification-error-message');

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
    const user = userCredential.user;
    await sendEmailVerification(user);

    verificationCode = generateVerificationCode();
    const expirationTime = new Date().getTime() + 5 * 60 * 1000;

    await setDoc(doc(db, "verificationCodes", user.uid), {
      code: verificationCode,
      expirationTime: expirationTime
    });

    sendCodeEmail(email, verificationCode);
    verificationSection.style.display = 'block';
    registerForm.style.display = 'none';
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    errorMessageDiv.innerText = errorMessage;
  }
});

verifyBtn.addEventListener('click', async () => {
  const enteredCode = verificationCodeInput.value;

  if (!enteredCode) {
    verificationErrorMessageDiv.innerText = "Please enter the verification code.";
    return;
  }

  const user = auth.currentUser;

  if (!user) {
    verificationErrorMessageDiv.innerText = "No user is currently logged in.";
    return;
  }

  const docRef = doc(db, "verificationCodes", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const verificationData = docSnap.data();
    const currentTime = new Date().getTime();

    if (currentTime > verificationData.expirationTime) {
      verificationErrorMessageDiv.innerText = "The verification code has expired.";
      return;
    }

    if (enteredCode === verificationData.code) {
      verificationErrorMessageDiv.innerText = "Email verified successfully!";
      window.location.href = "/home";
    } else {
      verificationErrorMessageDiv.innerText = "Incorrect verification code.";
    }
  } else {
    verificationErrorMessageDiv.innerText = "Verification code not found.";
  }
});

function generateVerificationCode() {
  const code = Math.floor(100000 + Math.random() * 900000);
  return code;
}

function sendCodeEmail(email, code) {
  const emailBody = `
    <h3>Your verification code</h3>
    <p>Please enter the following code to verify your email address:</p>
    <h2>${code}</h2>
    <p>The code will expire in 5 minutes.</p>
  `;

  const emailSubject = "Email Verification Code";

  fetch('/send-email', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      subject: emailSubject,
      body: emailBody,
    })
  });
}

function getErrorMessage(error) {
  let errorMessage = "An error occurred. Please try again.";
  switch (error.code) {
    case 'auth/email-already-in-use':
      errorMessage = "The email address is already in use.";
      break;
    case 'auth/invalid-email':
      errorMessage = "The email address is not valid.";
      break;
    case 'auth/weak-password':
      errorMessage = "Password must be at least 6 characters.";
      break;
  }
  return errorMessage;
}
