/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../firebase.js"
import { firestore as db } from "../firebase.js"
import { doc, getDoc, setDoc, collection, addDoc } from "firebase/firestore"
export const AuthContext = createContext()

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signUp = async (email, password) => {
        const userInfo = await createUserWithEmailAndPassword(auth, email, password)
            .then((firebaseUser) => {
                return firebaseUser
            })
        const docRef = await setDoc(doc(db, "usuarios", userInfo.user.uid), {
            email,
            password,
            rol: 'user'
        });
    }

    const signIn = (email, password) =>
        signInWithEmailAndPassword(auth, email, password)

    const logout = () => signOut(auth)

    const resetPassword = (email) => sendPasswordResetEmail(auth, email)

    const getRol = async (uid) => {
        const docuRef = doc(db, "usuarios", uid);
        const docSnap = await getDoc(docuRef);
        if (docSnap.exists()) {
            const rol = docSnap.data().rol
            return rol;
          } else {
            // docSnap.data() will be undefined in this case
            throw new Error('User not found');
          }
    }


    useEffect(() => {
        onAuthStateChanged(auth, (usuarioFirebase) => {
            if (usuarioFirebase) {
                getRol(usuarioFirebase.uid)
                    .then((rol) => {
                        const userData = {
                            uid: usuarioFirebase.uid,
                            email: usuarioFirebase.email,
                            rol: rol
                        }
                        setUser(userData)
                        window.sessionStorage.setItem("user", JSON.stringify(userData))
                    })
            } else {
                setUser(null)
                window.sessionStorage.setItem("user", JSON.stringify({}))
            }
        })
    }, [])

    return (
        <AuthContext.Provider value={{ signUp, signIn, user, logout, loading, resetPassword }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider