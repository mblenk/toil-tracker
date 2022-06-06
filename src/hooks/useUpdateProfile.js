//react
import { useState, useEffect } from "react"
//hooks
import { useFirestore } from './useFirestore'


export const useUpdateProfile = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [isCancelled, setIsCancelled] = useState(false)
    const { updateDocument } = useFirestore('users')



    //update email address
    const updateEmailAddress = async (user, email) => {
        setError(null)
        setIsPending(true)

        try {
            await user.updateEmail(email)

            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }
        }
        catch(err) {
            if(!isCancelled) {
                setError(err.message)
                setIsPending(false)
                console.log(err.message)
            }
        }
    }

    //update password
    const updateUserPassword = async (user, password, passwordCheck) => {
        setError(null)
        setIsPending(true)

        if(password !== passwordCheck){
            setError('Passwords do not match, please try again')
            setIsPending(false)
            throw new Error
        }

        try {
            await user.updatePassword(password)

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

    //update displayName
    const updateDisplayName = async (user, displayName) => {
        setError(null)
        setIsPending(true)

        try {
            await user.updateProfile({
                displayName
            })

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

    //update weekly hours
    const updateWeeklyHours = async (user, newWeeklyHours) => {
        try {
            await updateDocument(user.uid, { hoursPerWeek: newWeeklyHours })

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


    //update days per week
    const updateDaysPerWeek = async (user, newDaysValue) => {
        try {
            await updateDocument(user.uid, { daysPerWeek: newDaysValue })

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

    return { updateEmailAddress, updateUserPassword, updateDisplayName, updateWeeklyHours, updateDaysPerWeek, error, isPending }
}