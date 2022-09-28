//hooks
import { useFirestore } from '../hooks/useFirestore'
//react
import { useState } from 'react'
//styles
import './DeleteModal.css'


export default function DeleteModal({ user, modalKey, modalUpdate, setModalKey, setModalUpdate, setShowModal, toilValue, setToilValue }) {
  const { updateDocument } = useFirestore('users')
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)


  const handleDelete = async () => {
    setError(null)
    setIsPending(true)

    switch(modalKey) {
        case 'timesheets':
            try {
                await updateDocument(user.uid, { timesheets: [ ...modalUpdate ] })
                setModalKey(null)
                setModalUpdate(null)
                setShowModal(false)
                setIsPending(false)
            }
            catch(err) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
            break
        case 'toilEntries':
            try {
                await updateDocument(user.uid, { toilEntries: [ ...modalUpdate ], accumulatedToil: toilValue })
                setModalKey(null)
                setModalUpdate(null)
                setToilValue(null)
                setShowModal(false)
                setIsPending(false)
            }
            catch(err) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
            break
    } 
  }

  const handleCancel = () => {
        setError(null)
        setModalKey(null)
        setModalUpdate(null)
        setShowModal(false)
    }

  return (
    <div className="modal">
        <div className="modal-box">
            <h3>Are you sure you want to delete this item?</h3>
            <div className="buttons">
                { !isPending && <button 
                    className="btn"
                    onClick={() => handleDelete()}
                >Yes</button> }
                { isPending && <button 
                    className="btn"
                >Deleting...</button> }
                <button 
                    className="btn"
                    onClick={() => handleCancel()}
                >No</button>
            </div>
            {error && <p>{error}</p>}
        </div>
    </div>
  )
}
