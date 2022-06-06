//react
import { useState } from 'react'
import Select from 'react-select'
//hooks
import { useRecordToil } from '../../hooks/useRecordToil'
import { useFirestore } from '../../hooks/useFirestore'
//styles
import './RecordHours.css'

export default function RecordHours({ documents, user }) {
    //form options and error state
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [finishTime, setFinishTime] = useState('')
    const [lunchBreak, setLunchBreak] = useState('')
    const [customTimesheet, setCustomTimesheet] = useState('')
    const [error, setError] = useState('')
    //hooks
    const { calculateToilEarned } = useRecordToil()
    const { updateDocument, isPending } = useFirestore('users')
    //firestore data
    const { hoursPerWeek, daysPerWeek, toilEntries, timesheets } = documents[0]
    //select component options
    const timesheetSelect = timesheets.map((sheet) => {
        return { value: sheet, label: sheet.timesheetName}
    })
    
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        const id = Math.round(Math.random() * 100000)

        //catch incorrect form submission
        if(customTimesheet && (startTime || finishTime || lunchBreak)) {
            setError('If a Custom Timesheet is selected, the Start-time, Finish-time and Lunch-break fields must be left blank')
            throw new Error
        }
        //catch error if there is a previous entry for the selected date
        if(toilEntries) {
            toilEntries.forEach((entry) => {
                if(entry.date === date) {
                    setError('There is already an entry for this date. Please refer to the history tab')
                    throw new Error 
                }
            })
        }

        //calculate TOIL value
        const { toilEarned, hours, minutes } = calculateToilEarned(startTime, finishTime, lunchBreak, hoursPerWeek, daysPerWeek, customTimesheet.value)

        const dayEntry = {
            date,
            startTime,
            finishTime,
            hours,
            minutes,
            lunchBreak,
            toilEarned,
            customTimesheet,
            id
        }

        //update firestore with new record
        try {
            await updateDocument(user.uid, { toilEntries: [ ...toilEntries, dayEntry ] })

            let currentToilValue = 0

            if(toilEntries) {
                currentToilValue = toilEntries.reduce((prev, curr) => 
                    prev + curr.toilEarned, 0
                )
            }

            await updateDocument(user.uid, { accumulatedToil: currentToilValue + toilEarned })
        } 
        catch(err) {
            console.log(err.message)
            setError(err.message)
        }
        //reset state values
        setDate('')
        setStartTime('')
        setFinishTime('')
        setLunchBreak('')
        setCustomTimesheet('')
    }

  return (
        <form onSubmit={handleSubmit} className="add-hours">
            <h2>Record your hours</h2>
            <p>Please use the form below to record your hours for a given day. Remember you can use custom timesheets for different circumstances e.g. "Study day", "Bank Holiday". These will need to be created in the "Personalise" tab. If a custom timesheet is used, please leave the Start-time, Finish-time and Lunch-break fields blank.</p>
            <label> 
                <span>Date:</span>
                <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                    className="date"
                />
            </label>
            <label> 
                <span>Start-time:</span>
                <input 
                    type="time" 
                    value={startTime} 
                    onChange={(e) => setStartTime(e.target.value)}
                />
            </label>
            <label> 
                <span>Finish-time:</span>
                <input 
                    type="time" 
                    value={finishTime} 
                    onChange={(e) => setFinishTime(e.target.value)}
                />
            </label>
            <label> 
                <span>Lunch-break (minutes):</span>
                <input 
                    type="minutes" 
                    value={lunchBreak} 
                    onChange={(e) => setLunchBreak(e.target.value)}
                />
            </label>
            <label> 
                <span>Custom Timesheets</span>
                <Select 
                    options={timesheetSelect}
                    onChange={(option) => setCustomTimesheet(option)}
                    className="placeholder"
                    value={customTimesheet}
                />
            </label>
            {!isPending && <button className="btn">Enter</button>}
            {isPending && <button className="btn" disabled>Recording...</button>}
            {error && <p>{error}</p>}
        </form>
  )
}
