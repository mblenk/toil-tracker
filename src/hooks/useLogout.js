//react
import { useState, useEffect } from "react"
//firebase
import { projectAuth } from '../firebase/config'
//hooks
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [isCancelled, setIsCancelled] = useState(false)
    const { dispatch } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        //sign out user
        try {
            await projectAuth.signOut()
            //dispatch logout action
            dispatch({ type: 'LOGOUT' })

            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }
        } 
        catch(err){
            if(!isCancelled) {
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { logout, error, isPending }
}