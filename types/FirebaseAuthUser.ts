export default interface FirebaseAuthUser {
   uid: string;
   email: string | null;
   displayName: string | null;
   emailVerified: boolean;
   photoURL: string | null;
   isAnonymous: boolean;
   providerData: any;
}
