

export const useRecordToil = () => {

    const calculateToilEarned = (startTime, finishTime, lunchBreak, hoursPerWeek, daysPerWeek, customTimesheet) => {

        if(!customTimesheet) {
            const start = startTime.split(':')
            const finish = finishTime.split(':')

            const combinedStart = parseInt(start[0]) * 60 + parseInt(start[1])
            const combinedFinish = parseInt(finish[0]) * 60 + parseInt(finish[1])
            const delta = combinedFinish - combinedStart

            const hours = Math.floor(delta / 60)
            const minutes = (delta / 60) - hours
            
            const totalHours = hours + minutes - (lunchBreak/60)

            const toilEarned = Math.round((totalHours - (hoursPerWeek/daysPerWeek)) * 100) /100

            return { toilEarned, hours, minutes }
        }
        if(customTimesheet) {
            const hours = customTimesheet.hours
            const minutes = customTimesheet.minutes / 60

            const totalHours = hours + minutes

            const toilEarned = Math.round((totalHours - (hoursPerWeek/daysPerWeek)) * 100) /100


            return { toilEarned, hours, minutes }

        }

        
    }
    
    return { calculateToilEarned }
}