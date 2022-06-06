//hooks
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
//components
import RecordHours from './RecordHours'
//styles
import './UserContent.css'


export default function UserContent() {
    const { user } = useAuthContext()
    const { documents } = useCollection('users', ["uid", "==", user.uid])
    
  return (
    
    <div className="user-content">
        {documents && (
            <div className="toil-content">
                <div>
                   <RecordHours user={user} documents={documents} />
                </div>
            </div>
        )}
    </div>
  )
}
