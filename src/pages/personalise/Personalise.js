//styles
import './Personalise.css'
//react
import { useState } from 'react'
//hooks
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
//components
import CreateTimesheet from './CreateTimesheet'
import TimesheetList from './TimesheetList'
import DeleteModal from '../../components/DeleteModal'

export default function Personalise() {
  const { user } = useAuthContext()
  const { documents } = useCollection('users', ["uid", "==", user.uid])

  const [showModal, setShowModal] = useState(false)
  const [modalKey, setModalKey] = useState(null)
  const [modalUpdate, setModalUpdate] = useState(null)

  const handleClick = async (id) => {
    const filteredEntries = documents[0].timesheets.filter(entry => entry.id !== id)
    
    setShowModal(true)
    setModalKey('timesheets')
    setModalUpdate(filteredEntries)
   
  }

  return (
    <div className="personalise">
      { documents && <div>
        <h2>Create a custom timesheet</h2>
        <p>Use the fields below to create custom timesheets e.g. a study day. You will see that as an example your standard working day has been added already.</p>
        <CreateTimesheet user={user} documents={documents} />
        <TimesheetList 
          documents={documents} 
          handleClick={handleClick}
        />
      </div>}
      { showModal && <DeleteModal 
          user={user}
          modalKey={modalKey}
          modalUpdate={modalUpdate}
          setModalKey={setModalKey}
          setShowModal={setShowModal}
          setModalUpdate={setModalUpdate}
      />}   
    </div>
  )
}
