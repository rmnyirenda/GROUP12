import { collection, getFirestore, Timestamp, addDoc } from "firebase/firestore";
import { TextInput } from 'react-native-gesture-handler';
import Firebase_app from "../../firebaseConfig";

interface userItem{
    todo:string;
    ownerId:string;
    isCompleted: boolean;
  }

  const db = getFirestore(Firebase_app)
  const userCollection = collection(db,"users");
  
  export async function createUser(data:userItem) {
    const dbData = {
      createdAt: Timestamp.now(),
      completedAt: '',
      ...data
    
    }
    return await addDoc(userCollection,dbData)
  }