import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, list } from "firebase/storage";
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
  where,
} from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

import moment from "moment";

const { REACT_APP_FIREBASE_DB, REACT_APP_FIREBASE_SMS_URL } =
  Constants.expoConfig;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

//export const auth = getAuth(); //singleton, authentication memory base
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const fecthStorage = async (ids) => {
  let imageObj = {};

  // Use Promise.all to wait for all promises to resolve
  await Promise.all(
    ids.map(async (professional_id) => {
      imageObj[professional_id] = [];
      let path = `profile_images/${professional_id}/`;
      const imagesRef = ref(storage, `${path}/`);

      try {
        const imagesList = await list(imagesRef);

        await Promise.all(
          imagesList.items.map(async (imageRef) => {
            try {
              const url = await getDownloadURL(imageRef);

              imageObj[professional_id].push(url);
            } catch (error) {
              console.log("Error getting image URL:", error);
            }
          })
        );
      } catch (error) {
        console.log("Error listing images:", error);
      }
    })
  );

  return imageObj;
};

export const fetchDocObject = async (
  collectionName,
  documentName,
  documentKey
) => {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const items = querySnapshot.docs
    .filter((docSnapshot) => {
      return documentName ? docSnapshot.id === documentName : docSnapshot;
    })
    .map((docSnapshot) => {
      const { items } = docSnapshot.data();

      return {
        id: docSnapshot.id,
        data: items[documentKey],
      };
    });
  return items;
};

export const fetchCollection = async (collectionName, documentName) => {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef);

  //for testing error
  //await Promise.reject(new Error('whoop we received an error));
  const querySnapshot = await getDocs(q);
  const items = querySnapshot.docs
    .filter((docSnapshot) => {
      return documentName ? docSnapshot.id === documentName : docSnapshot;
    })
    .map((docSnapshot) => {
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
    console.error("Error updating document:", error);
  }
};

export const updateProfessionalDocument = async (
  collectionName,
  documentId,
  dataToAdd
) => {
  try {
    const documentRef = doc(db, collectionName, documentId);
    await setDoc(documentRef, dataToAdd, { merge: true });
  } catch (error) {
    console.error("Error updating document:", error);
  }
};

export const updateAppointmentDocument = async (
  collectionName,
  documentId,
  docFields
) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const { barberId, appointmentDate, newStatus, startTime } = docFields;

      // Check if the barberId exists
      if (
        data.items &&
        data.items[barberId] &&
        data.items[barberId][appointmentDate]
      ) {
        // Update the status field for the specified appointment date

        data.items[barberId][appointmentDate].map((appointment) => {
          if (appointment.startTime == startTime) {
            appointment.status = newStatus;
          }
        });

        await setDoc(docRef, data);
      } else {
        console.log(
          "Barber or appointment date not found in the appointments collection."
        );
      }
    } else {
      console.log(
        "Appointments document not found in the barbershop collection."
      );
    }
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

export const filterAppointmentDocument = async (
  collectionName,
  documentId,
  docFields
) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const { barberId, appointmentDate, startTime } = docFields;

      // Check if the barberId exists
      if (
        data.items &&
        data.items[barberId] &&
        data.items[barberId][appointmentDate]
      ) {
        // Update the status field for the specified appointment date

        data.items[barberId][appointmentDate] = data.items[barberId][
          appointmentDate
        ].filter((appointment) => appointment.startTime !== startTime);

        await setDoc(docRef, data);
      } else {
        console.log("");
      }
    } else {
      console.log("");
    }
  } catch (error) {
    console.error("Error updating status:", error);
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
    return fetch(REACT_APP_FIREBASE_SMS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: professionalPhoneNumber,
        body: `You have an appt with ${clientName} - ${date} from ${startTime}-${endTime}. ${service}. Client Phone Number - ${clientPhoneNumber}`,
      }),
    })
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
