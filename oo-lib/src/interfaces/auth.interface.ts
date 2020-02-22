import { FirestoreDoc } from './utility.interface';

export interface Roles {
    admin?: boolean;
    [role: string]: boolean;
}

export interface User extends FirestoreDoc {
    name: string;
    email: string;
    roles: Roles;
    phoneNumber?: string;
    photoUrl?: string;
}
