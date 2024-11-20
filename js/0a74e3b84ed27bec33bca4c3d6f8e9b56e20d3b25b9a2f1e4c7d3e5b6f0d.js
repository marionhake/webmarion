import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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

const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const homeDiv = document.getElementById('home');
const errorMessageDiv = document.getElementById('error-message');
const logoutBtn = document.getElementById('logout-btn');

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('register-email').value;
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;

  if (!email || !username || !password) {
    errorMessageDiv.innerText = "Please fill out all fields.";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "Users", user.uid), {
      username: username,
      email: email,
      roles: "member"
    });

    window.location.href = "/home";
  } catch (error) {
    errorMessageDiv.innerText = error.message;
  }
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const identifier = document.getElementById('login-identifier').value;
  const password = document.getElementById('login-password').value;

  if (!identifier || !password) {
    errorMessageDiv.innerText = "Please fill out both fields.";
    return;
  }

  try {
    let userCredential;
    if (identifier.includes('@')) {
      userCredential = await signInWithEmailAndPassword(auth, identifier, password);
    } else {
      const usersRef = await getDocs(collection(db, "Users"));
      let userFound = false;
      usersRef.forEach(doc => {
        if (doc.data().username === identifier) {
          userCredential = signInWithEmailAndPassword(auth, doc.data().email, password);
          userFound = true;
        }
      });
      if (!userFound) {
        errorMessageDiv.innerText = "No user found with that username.";
        return;
      }
    }
    window.location.href = "/home";
  } catch (error) {
    errorMessageDiv.innerText = error.message;
  }
});

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "/login";
  } else {
    const uid = user.uid;
    const docRef = doc(db, "Users", uid);
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        homeDiv.innerHTML = `
          <h2>Welcome ${userData.username}</h2>
          <p>Email: ${userData.email}</p>
          <p>Role: ${userData.roles}</p>
        `;
      } else {
        errorMessageDiv.innerText = "Cannot load Marion server.";
      }
    }).catch(() => {
      errorMessageDiv.innerText = "Cannot load Marion server.";
    });
  }
});

// Logout User
logoutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location.href = "/login";
  });
});
