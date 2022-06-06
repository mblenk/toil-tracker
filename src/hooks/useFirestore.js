//firebase
import { projectFirestore } from "../firebase/config"
//react
import { useState, useEffect } from "react"



export const useFirestore = (collection) => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [isCancelled, setIsCancelled] = useState(false)
    const ref = projectFirestore.collection(collection)

    //update document
    const updateDocument = async (id, update) => {
        setError(null)
        setIsPending(true)

        try {
            const updatedDocument = await ref.doc(id).update(update)

            if(!updatedDocument){
                throw new Error('Could not update document')
            }

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

    return { updateDocument, error, isPending }
}