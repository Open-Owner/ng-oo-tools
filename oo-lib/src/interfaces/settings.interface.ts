import * as firebase from 'firebase/app';
import { FirestoreDoc } from './utility.interface';

export interface Settings extends FirestoreDoc {
    userId: string;
    createDate: firebase.firestore.Timestamp;
    [key: string]: any;
}
