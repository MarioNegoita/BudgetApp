import {
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  auth,
  doc,
  setDoc,
  sendPasswordResetEmail,
} from "./firebase-key-config";

export const registration = async (name, email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), {
          name: name,
          email: email,
          password: password,
          id: user.uid,
        });
      }
    );
    return 200;
  } catch (_) {
    return 500;
  }
};

export const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    return 200;
  } catch (_) {
    return 500;
  }
};

export const forgotPass = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return 200;
  } catch (err) {
    return 500;
  }
};
