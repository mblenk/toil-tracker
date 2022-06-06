//hooks
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useUpdateProfile } from '../../hooks/useUpdateProfile'
//styles
import './Profile.css'
//icon
import edit_icon from '../../assets/edit_icon.svg'
import cancel_icon from '../../assets/cancel_icon.svg'
//react
import { useState } from "react"


export default function Profile() {
  const { user } = useAuthContext()
  const { documents } = useCollection('users', ["uid", "==", user.uid])
  const { updateEmailAddress, updateUserPassword, updateDisplayName, updateWeeklyHours, updateDaysPerWeek, error, isPending } = useUpdateProfile()

  const [editEmail, setEditEmail] = useState(false)
  const [editDisplayName, setEditDisplayName] = useState(false)
  const [editWeeklyHours, setEditWeeklyHours] = useState(false)
  const [editPassword, setEditPassword] = useState(false)
  const [editDaysPerWeek, setEditDaysPerWeek] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [hoursPerWeek, setHoursPerWeek] = useState('')
  const [daysPerWeek, setDaysPerWeek] = useState('')


  const handleDisplayName = async (user, displayName) => {
    await updateDisplayName(user, displayName)
    setEditDisplayName(false)
    setDisplayName('')
  }

  const handleWeeklyHours = async (user, hoursPerWeek) => {
    await updateWeeklyHours(user, hoursPerWeek)
    setEditWeeklyHours(false)
    setHoursPerWeek('')
  }

  const handleDaysPerWeek = async (user, daysPerWeek) => {
    await updateDaysPerWeek(user, daysPerWeek)
    setEditDaysPerWeek(false)
    setDaysPerWeek('')
  }

  const handleEmail = async (user, email) => {
    await updateEmailAddress(user, email)
    setEditEmail(false)
    setEmail('')
  }

  const handlePassword = async (user, password, passwordCheck) => {
    await updateUserPassword(user, password, passwordCheck)
    setEditPassword(false)
    setPassword('')
  }


  return (
    <div className="user-details">
      {user && documents && 
        <>
          <h2>Your details:</h2>
          {error && <p>{error}</p>}
          { !editEmail && <div className="profile-item">
              <h3>Email Address: {user.email}</h3>
              <img 
                src={edit_icon} 
                alt="Edit button" 
                onClick={(() => setEditEmail(true))}
              />
          </div> }

          { editEmail && <div className="change-item">
              <h3>New Email Address:</h3>
              <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              { !isPending && <button 
                className="btn"
                onClick={() => handleEmail(user, email)}
              >Submit</button> }
              { isPending && <button className="btn" disabled>Loading...</button>}
              <img 
                src={cancel_icon} 
                alt="Cancel button" 
                onClick={(() => setEditEmail(false))}
              />
            </div> }

          { !editDisplayName && <div className="profile-item">
              <h3>Display Name: {user.displayName}</h3>
              <img 
                src={edit_icon} 
                alt="Edit button" 
                onClick={(() => setEditDisplayName(true))}
              />
          </div> }

          { editDisplayName && <div className="change-item">
              <h3>New Display Name:</h3>
              <input 
                type="text" 
                onChange={(e) => setDisplayName(e.target.value)}
                value={displayName}
              />
              { !isPending && <button 
                className="btn"
                onClick={() => handleDisplayName(user, displayName)}
              >Submit</button> }
              { isPending && <button className="btn" disabled>Loading...</button>}
              <img 
                src={cancel_icon} 
                alt="Cancel button" 
                onClick={(() => setEditDisplayName(false))}
              />
            </div> }

          { !editWeeklyHours && <div className="profile-item">
              <h3>Weekly Hours: {documents[0].hoursPerWeek}</h3>
              <img 
                src={edit_icon} 
                alt="Edit button" 
                onClick={(() => setEditWeeklyHours(true))}
              />
          </div> }

          { editWeeklyHours && <div className="change-item">
              <h3>New weekly hours:</h3>
              <input 
                type="number" 
                onChange={(e) => setHoursPerWeek(e.target.value)}
                value={hoursPerWeek}
              />
              { !isPending && <button 
                className="btn"
                onClick={() => handleWeeklyHours(user, hoursPerWeek)}
              >Submit</button> }
              { isPending && <button className="btn" disabled>Loading...</button>}
               <img 
                src={cancel_icon} 
                alt="Cancel button" 
                onClick={(() => setEditWeeklyHours(false))}
              />
            </div> }

          { !editDaysPerWeek && <div className="profile-item">
              <h3>Days per Week: {documents[0].daysPerWeek}</h3>
              <img 
                src={edit_icon} 
                alt="Edit button" 
                onClick={(() => setEditDaysPerWeek(true))}
              />
          </div> }

          { editDaysPerWeek && <div className="change-item">
              <h3>Days per Week:</h3>
              <input 
                type="number" 
                onChange={(e) => setDaysPerWeek(e.target.value)}
                value={daysPerWeek}
              />
              { !isPending && <button 
                className="btn"
                onClick={() => handleDaysPerWeek(user, daysPerWeek)}
              >Submit</button> }
              { isPending && <button className="btn" disabled>Loading...</button>}
               <img 
                src={cancel_icon} 
                alt="Cancel button" 
                onClick={(() => setEditDaysPerWeek(false))}
              />
            </div> }

          { !editPassword && <div className="profile-item">
              <h3>Change Password</h3>
              <img 
                src={edit_icon} 
                alt="Edit button"
                onClick={(() => setEditPassword(true))}
              />
          </div> }

          { editPassword && <div className="change-password">
                <div className="password-match">
                  <div className="password-block">
                    <h3>New Password:</h3>
                    <input 
                      type="password" 
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                  <div className="password-block">
                    <h3>Confirm new password:</h3>
                    <input 
                      type="password" 
                      onChange={(e) => setPasswordCheck(e.target.value)}
                      value={passwordCheck}
                    />
                  </div>
                  { !isPending && <button 
                    className="btn"
                    onClick={() => handlePassword(user, password)}
                  >Submit</button> }
                  { isPending && <button className="btn" disabled>Loading...</button>}
                </div>
              <img 
                src={cancel_icon} 
                alt="Cancel button"
                onClick={(() => setEditPassword(false))}
              />
            </div> }
        </>
      }
    </div>
  )
}
