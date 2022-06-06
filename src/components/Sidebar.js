//styles
import './Sidebar.css'
//react
import React from 'react'
import { NavLink } from 'react-router-dom'
//components
import AvailableToil from './AvailableToil'
//hooks
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCollection } from '../hooks/useCollection'

export default function Sidebar() {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const { documents } = useCollection('users', ["uid", "==", user.uid])


  return (
     <div className="sidebar">
        {user && documents && <div className="sidebar-content">
            <div className="user">
                <h2>Hi {user.displayName}</h2>
                <AvailableToil documents={documents} />
            </div>
            <nav className='links'>
                <ul>
                    <li>
                        <NavLink to="/profile">
                            <span>Your Profile</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/user_content">
                            <span>Record Hours</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/personalise">
                            <span>Personalise</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/history">
                            <span>TOIL History</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div> }
        { user && 
            <div className="logout">
                <button className="btn" onClick={logout}>Log out</button> 
            </div>
        }
    </div>
  )
}
