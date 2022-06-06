//react elements
import { useState } from 'react'
//hooks
import { useSignup } from '../../hooks/useSignup'
//styles
import './Signup.css'
//assets
import info_icon from '../../assets/info_icon.svg'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [hoursPerWeek, setHoursPerWeek] = useState('')
  const [daysPerWeek, setDaysPerWeek] = useState('')
  const [nameHover, setNameHover] = useState(false)
  const [hoursHover, setHoursHover] = useState(false)
  const [daysHover, setDaysHover] = useState(false)

  const { signup, isPending, error } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    signup(email, password, passwordCheck, displayName, hoursPerWeek, daysPerWeek)
  }

  return (
     
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label> 
        <span>Email Address:</span>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label> 
        <span>Password:</span>
        <input 
          type="password" 
          value={password}  
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label> 
        <span>Confirm Password:</span>
        <input 
          type="password" 
          value={passwordCheck}  
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
      </label>
      <label> 
        <div className="float">
          <span>Display Name:</span>
          <img 
            src={info_icon} 
            alt="information icon" 
            onMouseOver={() => setNameHover(true)}
            onMouseOut={() => setNameHover(false)}
          />
        </div>
        { nameHover && <p>Choose your display name</p>}
        <input 
          type="text" 
          value={displayName}  
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </label>
      <label> 
        <div className="float">
          <span>Hours Per Week:</span>
          <img 
            src={info_icon} 
            alt="information icon" 
            onMouseOver={() => setHoursHover(true)}
            onMouseOut={() => setHoursHover(false)}
          />
        </div>
        { hoursHover && <p>Please provide your contracted number of hours per week</p>}
        <input 
          type="text" 
          value={hoursPerWeek}  
          onChange={(e) => setHoursPerWeek(e.target.value)}
        />
      </label>
      <label> 
        <div className="float">
          <span>Days Per Week:</span>
          <img 
            src={info_icon} 
            alt="information icon" 
            onMouseOver={() => setDaysHover(true)}
            onMouseOut={() => setDaysHover(false)}
          />
        </div>
        { daysHover && <p>Please provide the number of days per week that you work</p>}
        <input 
          type="text" 
          value={daysPerWeek}  
          onChange={(e) => setDaysPerWeek(e.target.value)}
        />
      </label>
      {!isPending && <button className="btn">Create Account</button>}
      {isPending && <button className="btn" disabled>Creating...</button>}
      {error && <p>{error}</p>}
  </form>
  )
}
