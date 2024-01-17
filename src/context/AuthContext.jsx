/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../firebase.js"
import { firestore } from "../firebase.js"
import { doc, getDoc, setDoc } from "firebase/firestore"
export const AuthContext = createContext()

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signUp = async (email, password) => {
        const userInfo = await createUserWithEmailAndPassword(auth, email, password)
            .then((firebaseUser) => {
                return firebaseUser
            })
        const docRef = doc(firestore, `usuarios/${userInfo.user.uid}`)
        setDoc(docRef, { email, password, rol: 'user' })
    }

    const signIn = (email, password) =>
        signInWithEmailAndPassword(auth, email, password)

    const logout = () => signOut(auth)

    const resetPassword = (email) => sendPasswordResetEmail(auth, email)

    const getRol = async (uid) => {
        const docuRef = doc(firestore, `usuarios/${uid}`)
        const encryptedDoc = await getDoc(docuRef);
        const finalInfo = encryptedDoc.data().rol
        return finalInfo;
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