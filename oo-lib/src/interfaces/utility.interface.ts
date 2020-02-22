import { DocumentReference } from '@angular/fire/firestore';

export interface IObjectKeyValueStrings {
    [key: string]: string;
}

export interface IObjectKeyValueStringArray {
    [key: string]: string[];
}

export interface IObjectKeyValueBooleans {
    [key: string]: boolean;
}

export interface FirestoreDoc {
    id?: string;
    ref?: DocumentReference;
}
