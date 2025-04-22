// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAaoH4unLDHNq8TlpZh7skZ3WdKa-gPzA",
    authDomain: "singlish-a97c0.firebaseapp.com",
    projectId: "singlish-a97c0",
    storageBucket: "singlish-a97c0.firebasestorage.app",
    messagingSenderId: "28888918608",
    appId: "1:28888918608:web:27785a06c684813b693f55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Set persistence to LOCAL
setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
        console.error('Error setting persistence:', error);
    });

// Configure Google provider
provider.setCustomParameters({
    prompt: 'select_account'
});

// Function to handle Google sign-in
export async function signInWithGoogle() {
    try {
        console.log('Attempting Google sign-in...');
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log('Successfully signed in:', user);
        return user;
    } catch (error) {
        console.error('Error signing in:', error);
        // Handle specific error cases
        if (error.code === 'auth/popup-blocked') {
            console.error('Popup was blocked by the browser. Please allow popups for this site.');
        } else if (error.code === 'auth/popup-closed-by-user') {
            console.error('Sign-in popup was closed before completing the sign-in process.');
        } else if (error.code === 'auth/unauthorized-domain') {
            console.error('This domain is not authorized for Firebase Authentication. Please add it to the authorized domains list in Firebase Console.');
        }
        throw error;
    }
}

// Function to handle sign out
export async function signOut() {
    try {
        console.log('Attempting sign out...');
        await auth.signOut();
        console.log('Successfully signed out');
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
}

// Function to check if user is signed in
export function isUserSignedIn() {
    const isSignedIn = auth.currentUser !== null;
    console.log('User signed in status:', isSignedIn);
    return isSignedIn;
}

// Function to get current user
export function getCurrentUser() {
    const user = auth.currentUser;
    console.log('Current user:', user);
    return user;
}

// Add auth state change listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is signed in:', user);
        // Update UI to show signed-in state
        const signInBtn = document.querySelector('.sign-in-btn');
        if (signInBtn) {
            signInBtn.textContent = 'Sign Out';
            signInBtn.classList.add('signed-in');
        }
    } else {
        console.log('User is signed out');
        // Update UI to show signed-out state
        const signInBtn = document.querySelector('.sign-in-btn');
        if (signInBtn) {
            signInBtn.textContent = 'Sign In';
            signInBtn.classList.remove('signed-in');
        }
    }
}); 