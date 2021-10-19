import React, { createContext, useEffect, useState } from 'react'
import { auth, firebase } from '../services/firebase'

const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
function AuthContextProvider({ children }) {
  const [user, setUser] = useState()

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          throw new Error('Missing informations from Google Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()

    const result = await auth.signInWithPopup(provider)

    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing informations from Google Account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
