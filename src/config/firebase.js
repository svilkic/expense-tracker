// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { calculateAmount, getDateFromExpense } from "util/helpers";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID || "",
  appId: process.env.REACT_APP_FIREBASE_API_ID || "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
const transactions_collection = "transakcije";

export async function getDataByDate(month, year) {
  const docID = `${month}.${year}`;
  const response = await getDoc(doc(db, transactions_collection, docID));
  const { expenseList } = response.data();
  const newAmount = calculateAmount(expenseList);
  return { expenseList: expenseList, amount: newAmount };
}

export async function addExpense(expense) {
  const { month, year } = getDateFromExpense(expense);
  const docID = `${month}.${year}`;
  const docRef = doc(db, transactions_collection, docID);

  const response = await getDoc(docRef);

  let expenseList = [];

  if (response.exists()) {
    const data = response.data();
    expenseList = data.expenseList;
  }
  expenseList.push(expense);
  const newAmount = calculateAmount(expenseList);
  await setDoc(docRef, { expenseList: expenseList });
  return { expenseList, amount: newAmount };
}

export async function removeExpense(expense) {
  const { month, year } = getDateFromExpense(expense);
  const expenseID = expense.id;
  const docID = `${month}.${year}`;
  const docRef = doc(db, transactions_collection, docID);

  const response = await getDoc(docRef);
  const { expenseList } = response.data();

  let index = expenseList.findIndex((expense) => expense.id === expenseID);
  expenseList.splice(index, 1);

  const newAmount = calculateAmount(expenseList);
  await setDoc(docRef, { expenseList: expenseList }, { merge: true });

  return { expenseList, amount: newAmount };
}
