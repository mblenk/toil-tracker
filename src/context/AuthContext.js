//react
import { createContext, useReducer, useEffect } from 'react'
//firebase
import { projectAuth } from '../firebase/config'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null}
        case 'USER_HOURS':
            return { ...state, hoursPerWeek: action.payload}
        case 'AUTH_IS_READY':
            return { ...state, user: action.payload, authIsReady: true}
        default:
            return state
    } 
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false,
    })

    useEffect(() => {
        const unsub = projectAuth.onAuthStateChanged((user) => {
            dispatch({ type: 'AUTH_IS_READY', payload: user})
            unsub()
        })
    }, [])


    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}

