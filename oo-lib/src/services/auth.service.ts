import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import * as firebase from 'firebase/app';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { User } from '../interfaces/auth.interface';
import { Settings } from '../interfaces/settings.interface';
import { FirebaseUtilityService } from './firebase-utility.service';
import QuerySnapshot = firebase.firestore.QuerySnapshot;

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public isAdmin = false;
    public userLoaded$: Subject<User> = new Subject<User>();
    public user$: Observable<User>;
    public user: User;

    constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private fbUtil: FirebaseUtilityService) {
        this.user$ = this.getUser();
    }

    public getUser(): Observable<User> {
        return this.afAuth.authState.pipe(
            switchMap((user: firebase.User) => {
                if (user) {
                    return this.db
                        .collection('users')
                        .doc<User>(user.uid)
                        .snapshotChanges();
                }

                return of(null);
            }),
            this.fbUtil.mapDoc<User>(),
            tap((user: User) => {
                if (!user) {
                    return;
                }

                const isNew: boolean = !this.user;

                this.user = user;
                this.isAdmin = this.hasRole(user, 'admin');

                if (isNew) {
                    this.userLoaded$.next(user);
                }
            }),
        );
    }

    public signOut(): Promise<void> {
        return this.afAuth.auth.signOut();
    }

    public hasRole(user: User, role: string | string[]): boolean {
        if (!user || !user.roles) {
            return false;
        }

        const allowedRoles: string[] = Array.isArray(role) ? role : [role];

        return !!allowedRoles.find((allowedRole: string) => !!user.roles[allowedRole]);
    }

    public createUser(user: firebase.User | null): Promise<void> {
        const data: User = {
            email: user.email,
            phoneNumber: user.phoneNumber,
            photoUrl: user.photoURL,
            name: user.displayName,
            roles: {},
        };

        return this.db
            .collection('users')
            .doc(user.uid)
            .set(data, { merge: true });
    }

    public addSettings(user: firebase.User | null): void {
        const data: Settings = {
            userId: user.uid,
            createDate: firestore.Timestamp.fromDate(new Date()),
        };
        firebase
            .firestore()
            .collection('settings')
            .where('userId', '==', user.uid)
            .limit(1)
            .get()
            .then((settings: QuerySnapshot) => {
                if (settings.empty) {
                    this.db
                        .collection('settings')
                        .add(data)
                        .catch(() => alert('There was a problem adding the settings'));
                }
            });
    }
}
