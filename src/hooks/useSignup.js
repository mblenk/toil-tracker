//react
import { useState, useEffect } from "react"
//firebase
import { projectAuth, projectFirestore } from '../firebase/config'
//hooks
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [isCancelled, setIsCancelled] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, passwordCheck, displayName, hoursPerWeek, daysPerWeek) => {
        setError(null)
        setIsPending(true)

        const id = Math.round(Math.random() * 100000)
        const expectedTimePerDay = hoursPerWeek / daysPerWeek
        const expectedHours = Math.floor(expectedTimePerDay)
        const expectedMinutes = Math.round((expectedTimePerDay - expectedHours) * 60)

        if(password !== passwordCheck) {
            setError('Passwords do not match. Please check and try again')
            setIsPending(false)
            throw new Error
        }

        try {
            //sign up new user
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)

            if(!res) {
                throw new Error('Could not complete Signup')
            }

            //add user display name
            await res.user.updateProfile({ displayName })

            //create user document
            await projectFirestore.collection('users').doc(res.user.uid).set({
                hoursPerWeek,
                daysPerWeek,
                uid: res.user.uid,
                toilEntries: [],
                timesheets: [{ timesheetName: "Standard Working Day", hours: expectedHours, minutes: expectedMinutes, id }],
                accumulatedToil: 0
            })

            //dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user})

            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }
            
        }
        catch(err) {
            if(!isCancelled) {
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { error, isPending, signup }
}