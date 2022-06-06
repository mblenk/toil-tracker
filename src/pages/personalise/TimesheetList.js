//styles
import './TimesheetList.css'
//assets
import delete_icon from '../../assets/delete_icon.svg'


export default function TimesheetList({ documents, handleClick }) {
    const { timesheets } = documents[0]


  return (
    <div className="cards">
        <h3>Your custom timesheets:</h3>
        { timesheets.map((sheet) => (
            <div className="timesheet-card" key={sheet.id}>
                <h3>{sheet.timesheetName}</h3>
                <div className="time">
                    <div className="time-block">
                        <h4>Hours</h4>
                        <p>{sheet.hours}</p>
                    </div>
                    <div className="time-block">
                        <h4>Minutes</h4>
                        <p>{sheet.minutes}</p>
                    </div>
                </div>
                <img 
                    src={delete_icon} 
                    alt="Delete button" 
                    id="delete-timesheet"
                    onClick={() => handleClick(sheet.id)}
                />
            </div>
        ))}
    </div>
  )
}
