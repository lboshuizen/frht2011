import { initializeApp } from "firebase/app";
import { getStorage,ref, FirebaseStorage, StorageReference, uploadString, getDownloadURL, UploadResult, listAll, ListResult } from "firebase/storage";
import { Rule } from "../domain/rule";

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

export function listRules() : Promise<ListResult> {
    const folder = rules();
    return listAll(folder)
}

export async function loadRuleFromRef(ref: StorageReference) : Promise<Rule> {
    const url = await getDownloadURL(ref);
    var content = await window.fetch(url,{mode: "cors"});
    return content.json();
}

export async function loadRule(id: string) : Promise<Rule> {
    const folder = rules();
    const fileRef = ref( folder, id);
    return loadRuleFromRef(fileRef);
}

export function storeRule(id: string, json: string) : Promise<UploadResult> {
    const folder = rules();
    const fileRef = ref( folder, id);
    return uploadString(fileRef, json, "raw");
}