export default interface AuthenticationResult {
   error?: string;
   firebaseUser: firebase.auth.UserCredential | null;
}
