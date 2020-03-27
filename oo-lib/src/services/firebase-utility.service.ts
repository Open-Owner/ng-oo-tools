import { Injectable } from '@angular/core';
import { Action, DocumentChangeAction, DocumentSnapshot, QueryDocumentSnapshot } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

import { FirestoreDoc } from '../interfaces/utility.interface';

@Injectable({
    providedIn: 'root',
})
export class FirebaseUtilityService {
    /**
     * Pipe-able operator
     */
    public mapDoc<T>(timestampFields: string[] = []): OperatorFunction<Action<DocumentSnapshot<T>>, T> {
        return map(
            (change: Action<DocumentSnapshot<T>>): T => {
                return change ? this.build<T>(change.payload, timestampFields) : null;
            },
        );
    }

    /**
     * Pipe-able operator
     */
    public mapCollection<T>(timestampFields: string[] = []): OperatorFunction<DocumentChangeAction<T>[], T[]> {
        // @ts-ignore
        return map((changes: DocumentChangeAction<T>[]): T[] => {
            return changes
                ? changes.map((change: DocumentChangeAction<T>) =>
                      change && change.payload && change.payload.doc ? this.build<T>(change.payload.doc, timestampFields) : null,
                  )
                : null;
        });
    }

    /**
     * Adds the derived fields like id and ref to the object
     * Optionally pass an array of timestamp fields to convert them to dates
     */
    public build<T extends FirestoreDoc>(snapshot: DocumentSnapshot<T> | QueryDocumentSnapshot<T>, timestampFields: string[] = []): T {
        const data: T = snapshot.data();
        const convertedDateFields: any = {};

        timestampFields.forEach((field: string) => {
            if (!data[field]) {
                return;
            }

            convertedDateFields[field] = this.timestampToDate(data[field]);
        });

        return {
            // @ts-ignore
            ...snapshot.data(),
            id: snapshot.id,
            ref: snapshot.ref,
            ...convertedDateFields,
        };
    }

    /**
     * Removes the derived fields like id and ref
     */
    // noinspection JSMethodCanBeStatic
    public purge(doc: FirestoreDoc): any {
        // @ts-ignore
        const { id, ref, ...purgedDoc }: any = doc;

        return purgedDoc;
    }

    // noinspection JSMethodCanBeStatic
    public timestampToDate(field: unknown): Date | undefined {
        if (!field) {
            return field as undefined;
        }

        return (field as firebase.firestore.Timestamp).toDate();
    }

    public trackById(index: number, doc: FirestoreDoc): string {
        return doc.id;
    }
}
