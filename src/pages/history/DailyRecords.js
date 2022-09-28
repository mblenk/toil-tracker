//assets
import expand_more from '../../assets/expand_more.svg'
import expand_less from '../../assets/expand_less.svg'
import delete_icon from '../../assets/delete_icon.svg'
//react
import { useState } from 'react'




export default function DailyRecords({ filteredDocuments, handleClick, error }) {
    const [showId, setShowId] = useState(null)

    const dateOrdered = filteredDocuments ? filteredDocuments.sort((a,b) => new Date(b.date) - new Date(a.date)) : null

  return (
    <div className="records">
        { error && <p>{error}</p>}
        { dateOrdered.map((sheet) => (
            sheet.customTimesheet ? (
                <div key={sheet.id} className="custom-block">
                    <div className='block-header'>
                        <h3>{sheet.date}</h3>
                        <h4>{`Toil Earned: ${sheet.toilEarned} hours` }</h4>
                        { showId !== sheet.id && <img 
                            src={expand_more} 
                            alt="Show more detail icon" 
                            onClick={() => setShowId(sheet.id)}
                            id="expand"
                        />}
                        { showId === sheet.id && <img 
                            src={expand_less} 
                            alt="Show less detail icon" 
                            onClick={() => setShowId(null)
                            }
                            id="expand"
                        />}
                        <img 
                            src={delete_icon} 
                            alt="Delete button" 
                            id="delete"
                            onClick={() => handleClick(sheet.id, sheet.toilEarned)}
                            fill="white"
                        />
                    </div>
                    <div className={showId === sheet.id ? "show" : "hide"}>
                        <h3>{`Custom Timesheet: ${sheet.customTimesheet.label}`}</h3>
                        <h4>{`Hours: ${sheet.customTimesheet.value.hours}`}</h4>
                        <h4>{`Minutes: ${sheet.customTimesheet.value.minutes}`}</h4>
                    </div>
                </div>

            ) : (

                <div key={sheet.id} className="custom-block">
                    <div className='block-header'>
                        <h3>{sheet.date}</h3>
                        <h4>{`Toil Earned: ${sheet.toilEarned} hours` }</h4>
                        { showId !== sheet.id && <img 
                            src={expand_more} 
                            alt="Show more detail icon" 
                            onClick={() => setShowId(sheet.id)}
                            id="expand"
                        />}
                        { showId === sheet.id && <img 
                            src={expand_less} 
                            alt="Show less detail icon" 
                            onClick={() => setShowId(null)
                            }
                            id="expand"
                        />}
                        <img 
                            src={delete_icon} 
                            alt="Delete button" 
                            id="delete"
                            onClick={() => handleClick(sheet.id, sheet.toilEarned)}
                        />
                    </div>
                    <div className={showId === sheet.id ? "show" : "hide"}>
                        <h4>{`Start-time: ${sheet.startTime}`}</h4>
                        <h4>{`Finish-time: ${sheet.finishTime}`}</h4>
                        <h4>{`Hours: ${sheet.hours}`}</h4>
                        <h4>{`Minutes: ${Math.floor(sheet.minutes * 60)}`}</h4>
                    </div>
                </div>
            )
        ))}     
    </div>
  )
}
