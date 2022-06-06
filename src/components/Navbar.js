//styles
import './Navbar.css'
//react elements
import { Link } from 'react-router-dom'
//hooks
import { useAuthContext } from '../hooks/useAuthContext'

export default function Navbar() {
  const { user } = useAuthContext()

  return (
    <div className="navbar">
        <Link className='navbar-header' to="/">TOIL Free</Link>
        <h3>The easiest way to track your hours!</h3>
        { !user && 
          <div className="no-user">
            <Link className="btn navbar-link" to="/login">Login</Link>
            <Link className="btn navbar-link" to="/signup">Sign Up</Link>
          </div> 
        }
    </div>
  )
}
