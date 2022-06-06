//hooks
import { useFirestore } from '../../hooks/useFirestore'
//react
import { useState } from 'react'

export default function CreateTimesheet({ user, documents }) {
  const { updateDocument, isPending } = useFirestore('users')

  const [timesheetName, setTimesheetName] = useState('')
  const [timesheetHours, setTimesheetHours] = useState('')
  const [error, setError] = useState('')

  const { hoursPerWeek, daysPerWeek, timesheets } = documents[0]

  const expectedTimePerDay = hoursPerWeek / daysPerWeek
  const expectedHours = Math.floor(expectedTimePerDay)
  const expectedMinutes = Math.round((expectedTimePerDay - expectedHours) * 60)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    const day = timesheetHours.split(':')
    const hours = parseInt(day[0])
    const minutes = parseInt(day[1])
    const id = Math.round(Math.random() * 100000)

    const timesheet = {
        timesheetName,
        hours,
        minutes,
        id
    }

    try {
        await updateDocument(user.uid, { timesheets: [ ...timesheets, timesheet ] })
    }
    catch(err) {
        console.log(err.message)
        setError(err.message)
    }
    setTimesheetHours('')
    setTimesheetName('')
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <h3>Your expected daily hours: {expectedHours} hrs {expectedMinutes} mins</h3>
            <label>
                < span>Timesheet name:</span>
                <input 
                    type="text" 
                    onChange={(e) => setTimesheetName(e.target.value)}
                    value={timesheetName}
                    required
                />
            </label>
            <label>
                <span>Timesheet hours</span>
                <input 
                    type="time" 
                    onChange={(e) => setTimesheetHours(e.target.value)}
                    value={timesheetHours}
                    required
                />
            </label>
            {!isPending && <button className="btn">Create</button>}
            {isPending && <button className="btn" disabled>Creating...</button>}
            { error && <p>{error}</p>}
        </form>
    </div>
  )
}
