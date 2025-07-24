import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import axios from "axios";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD9OmCBqHQx4vwd09AgdKIFxtuSkKoUBqY",
  authDomain: "bookify-e3881.firebaseapp.com",
  projectId: "bookify-e3881",
  storageBucket: "bookify-e3881.appspot.com",
  messagingSenderId: "607411840327",
  appId: "1:607411840327:web:8c5932d0c5013d3e479862",
};

// ✅ Firebase Setup
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const googleProvider = new GoogleAuthProvider();

// ✅ Context Creation
const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

// ✅ Cloudinary Upload Helper
const uploadImageToCloudinary = async (imageFile) => {
  const data = new FormData();
  data.append("file", imageFile);
  data.append("upload_preset", "bookify_preset");
  data.append("cloud_name", "duy2bzqkc");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/duy2bzqkc/image/upload",
      data
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error);
    alert("Image upload failed. Please try again.");
    return null;
  }
};

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  // ✅ Track logged in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Auth Functions
  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const singinUserWithEmailAndPass = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const signinWithGoogle = () =>
    signInWithPopup(firebaseAuth, googleProvider);

  // ✅ Upload book with image
  const handleCreateNewListing = async (name, isbn, price, cover) => {
    const imageURL = await uploadImageToCloudinary(cover);
    if (!imageURL) return;

    return await addDoc(collection(firestore, "books"), {
      name,
      isbn,
      price,
      imageURL,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  // ✅ Get all books
  const listAllBooks = () => getDocs(collection(firestore, "books"));

  // ✅ Get book by ID
  const getBookById = async (id) => {
    const docRef = doc(firestore, "books", id);
    return await getDoc(docRef);
  };

  // ✅ Place an order for a book
  const placeOrder = async (bookId, qty) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    return await addDoc(collectionRef, {
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      qty: Number(qty),
    });
  };

  // ✅ Get books listed by the current user
  const fetchMyBooks = async (userId) => {
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where("userID", "==", userId));
    return await getDocs(q);
  };

  // ✅ Get orders for a specific book
  const getOrders = async (bookId) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    return await getDocs(collectionRef);
  };

  const isLoggedIn = !!user;

  return (
    <FirebaseContext.Provider
      value={{
        signinWithGoogle,
        signupUserWithEmailAndPassword,
        singinUserWithEmailAndPass,
        handleCreateNewListing,
        listAllBooks,
        getBookById,
        placeOrder,
        fetchMyBooks,
        getOrders,
        isLoggedIn,
        user,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
