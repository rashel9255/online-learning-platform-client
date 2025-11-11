import React, { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import app from "../Firebase/firebase.config";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    };
    const logOutUser = () => {
        return signOut(auth);
    };

    const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    });

    const authData = {
        user,
        setUser,
        createUser,
        signInWithGoogle,
        logInUser,
        logOutUser,
        loading,
        setLoading,
        updateUser,
        resetPassword,
    };

    return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
