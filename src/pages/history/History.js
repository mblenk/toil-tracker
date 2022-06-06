//styles
import './History.css'
//hooks
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
//components
import DailyRecords from './DailyRecords'
import DeleteModal from '../../components/DeleteModal'
//react
import { useState } from 'react'

export default function History() {
  const { user } = useAuthContext()
  const { documents } = useCollection('users', ["uid", "==", user.uid])
  //get today's date for filter options
  const today = new Date()
  const todaysDate = today.getFullYear()+'-'+String((today.getMonth()+1)).padStart(2,"0")+'-'+String(today.getDate()).padStart(2,"0")

  const [error, setError] = useState(null)
  const [startDate, setStartDate] = useState('2022-01-01')
  const [endDate, setEndDate] = useState(todaysDate)

  const [showModal, setShowModal] = useState(false)
  const [modalKey, setModalKey] = useState(null)
  const [modalUpdate, setModalUpdate] = useState(null)

  //set filter to default to show all documents on first render and then update when the date inputs are changed
  const filteredDocuments = documents ? documents[0].toilEntries.filter(doc => 
    doc.date >= startDate && doc.date <= endDate
  ) : null

  const handleClick = async (id) => {
    setError(null)
    const filteredEntries = documents[0].toilEntries.filter(entry => entry.id !== id)

    setShowModal(true)
    setModalKey('toilEntries')
    setModalUpdate(filteredEntries)
  }

  const resetFilters = () => {
    setStartDate('2022-01-01')
    setEndDate(todaysDate)
  }

  return (
    <div className="history">
      <h2>Your recorded TOIL entries</h2>
      <h4>Filter Entries by date:</h4>
      <label> 
          <span>Start Date:</span>
          <input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)}
          />
      </label>
      <label> 
          <span>End Date:</span>
          <input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)}
          />
      </label>
      <button className="btn" onClick={() => resetFilters()}>Reset</button>
      { documents && <div>
        <DailyRecords 
          filteredDocuments={filteredDocuments} 
          handleClick={handleClick}
          error={error}
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
