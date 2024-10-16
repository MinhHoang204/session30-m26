import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAg3lpvpBmZqd2UY0lQdRJ02o5xuV3n7dA",
  authDomain: "m26-upload-file-2e480.firebaseapp.com",
  projectId: "m26-upload-file-2e480",
  storageBucket: "m26-upload-file-2e480.appspot.com",
  messagingSenderId: "999981261254",
  appId: "1:999981261254:web:dab09c2faa3a56e39412c7"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };