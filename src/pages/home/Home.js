// react
import { Link } from 'react-router-dom'
//styles
import './Home.css'
//assets
import personalise from '../../assets/personalise.png'
import history from '../../assets/history.png'


export default function Home() {
  return (
    <div className="landing-page">
      <h2>Track your hours and calculate your TOIL!</h2>
      <p>If your employer offers flexible working with Time off in Lieu (TOIL), then this site allows you to easily monitor your hours and keep track of your overtime!</p>
      <p>With an easy to use system, you can manage your TOIL through manual entries or through custom timesheets and ensure you get the time off that you've earned.</p>
      <p>This website is free to use, just create an account using the Sign Up button in the top right hand corner, or by clicking <Link to='/signup'>here</Link>.</p>
      <div className="sales-images">
        <div className="history-banner">
          <h3>You'll be able to see a full record of your recorded hours and track how much TOIL you earn each day:</h3>
          <img src={history} alt="historic timesheet records image" />
        </div>
        <div className="personalise-banner">
          <h3>You can even create your own personalised timesheets to speed up recording your hours!</h3>
          <img src={personalise} alt="personalise timesheets image" />
        </div>
      </div>
    </div>
  )
}
