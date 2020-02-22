import { firestore } from 'firebase';
import { FirestoreDoc } from './utility.interface';

export interface Settings extends FirestoreDoc {
    userId: string;
    createDate: firestore.Timestamp;
    [key: string]: any;
}
