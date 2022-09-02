import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { NEXT_URL } from '@/config/index'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)



    // Register user
    const register = async (user) => {
        console.log(user)
    }

    // Login user
    const login = async ({ email: identifier, password }) => {
        console.log('Login hit')
        const res = await fetch(`${NEXT_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier,
                password
            })
        })

        const data = await res.json()
        console.log('data - ', data)

        if (res.ok) {
            setUser(data.user)
        }
        else {
            setError(data.message)
            // console.log('error is - ', error)
            // setError(null)
        }
    }

    // Logout user
    const logout = async () => {
        console.log('Logout')
    }

    // Check if user is logged in
    const checkUserLoggedIn = async (user) => {
        console.log('Check login')
    }

    return (
        <AuthContext.Provider value={{ user, error, setError, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext