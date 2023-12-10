import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";

import {
  collection,
  query,
  getDocs,
  updateDoc,
  deleteDoc,
  arrayUnion,
  setDoc,
  doc,
  getDoc,
  writeBatch,
} from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

//export const auth = getAuth(); //singleton, authentication memory base
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const fetchDocument = async (documentName) => {
  const collectionRef = collection(db, "barber_shop");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const items = querySnapshot.docs
    .filter((docSnapshot) => {
      return docSnapshot.id === "appointments";
    })
    .map((docSnapshot) => {
      return {
        id: docSnapshot.id,
        data: docSnapshot.data(),
      };
    });
  return items;
};

export const fetchCollection = async (collectionName) => {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef);

  //for testing error
  //await Promise.reject(new Error('whoop we received an error));
  const querySnapshot = await getDocs(q);
  const items = querySnapshot.docs.map((docSnapshot) => {
    return {
      id: docSnapshot.id,
      data: docSnapshot.data(),
    };
  });
  return items;
};

export const addDocument = async (collectionKey, jsonObjectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  jsonObjectsToAdd.forEach((jsonObject) => {
    const docRef = doc(collectionRef, jsonObject.title.toLowerCase());
    batch.set(docRef, jsonObject);
  });

  await batch.commit();
};

export const updateDocument = async (collectionName, documentId, dataToAdd) => {
  try {
    const documentRef = doc(db, collectionName, documentId);
    await updateDoc(documentRef, dataToAdd);
  } catch (error) {
    console.error("Error creating document:", error);
  }
};

export const appointmentObjectToAdd = (
  barberId,
  appointmentDate,
  appointmentInfo
) => {
  const aptDate = moment(appointmentDate).format("YYYY_MM_DD");

  const objectUpdate = {};

  objectUpdate[`items.${barberId}.${aptDate}`] = arrayUnion(appointmentInfo);

  return objectUpdate;
};

export const deleteDocument = async (collectionName, id) => {
  try {
    const _document = doc(db, collectionName, id);
    await deleteDoc(_document);
  } catch (error) {
    console.error("Error creating document:", error);
  }
};

export const sendSMS = async ({
  clientName,
  professionalPhoneNumber,
  date,
  startTime,
  endTime,
  service,
  clientPhoneNumber,
}) => {
  try {
    return fetch(
      "https://us-central1-crwn-clothing-db-b150d.cloudfunctions.net/sendSMS",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: professionalPhoneNumber,
          body: `You have an appt with ${clientName} - ${date} from ${startTime}-${endTime}. ${service}. Client Phone Number - ${clientPhoneNumber}`,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.error(error));
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

//get data from authentication service and store data
export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;

  //does user document reference exist
  const userDocRef = doc(db, "barbershop_users", userAuth.uid);
  let userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
      });

      userSnapshot = await getDoc(userDocRef);
    } catch (error) {
      console.log("error creating the user", error);
    }
  }

  //return userDocRef;
  return userSnapshot;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
