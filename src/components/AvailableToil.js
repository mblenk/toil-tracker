

export default function AvailableToil({ documents }) {
    const currentToilValue = documents[0].accumulatedToil
    const hours = Math.floor(currentToilValue)
    const minutes = Math.round((currentToilValue - hours) * 60)

  return (
    <div>
        <div className="total">
            <h4>Your remaining TOIL:</h4>
            { hours < -1 && <h3>{hours} hrs {minutes} mins</h3>}
            { -1 < hours < 0 && <h3>{minutes} mins</h3>}
            { -1 === hours && <h3>{hours} hrs</h3>}
            { hours === 0 && <h3>{minutes} mins</h3> }
            { hours === 1 && <h3>{hours} hr {minutes} mins</h3> }
            { hours > 1 && <h3>{hours} hrs {minutes} mins</h3> }
        </div>
    </div>
  )
}
