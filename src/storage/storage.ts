import { initializeApp, FirebaseApp } from "firebase/app";
import { getStorage,ref, FirebaseStorage, StorageReference, uploadString, Strin'gFormat } from "firebase/storage";

var firebaseConfig = {
    //apiKey: "API_KEY",
    //authDomain: "PROJECT_ID.firebaseapp.com",
    //databaseURL: "https://PROJECT_ID.firebaseio.com",
    projectId: "frissht2021",
    storageBucket: "frissht2021.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "1:242851739458:web:7c0f46c44fbaf323a0fadb",
    //measurementId: "G-MEASUREMENT_ID",
  };

const app = initializeApp(firebaseConfig);

export function get_Storage() : FirebaseStorage {
    return getStorage(app);
}

export function claims() : any {
    return ref(get_Storage(), "claims");
}

export function rules() : StorageReference {
    return ref(get_Storage(), "rules");
}

export function storeRule(id: string, json: string){
    const rf = rules();
    const fn = ref( rf, id);
    uploadString(fn, json, "raw").then( (sn : any) => {
        console.log("stored  to ", sn.metadata.fullPath);
    })
    .catch((e: Error) => console.error(e))
}