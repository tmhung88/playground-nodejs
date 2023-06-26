import dayjs from 'dayjs'
import weekYear from 'dayjs/plugin/weekYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isoWeek from 'dayjs/plugin/isoWeek'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'

// initialize dayjs
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isoWeek)
dayjs.extend(isBetween)
dayjs.extend(isSameOrAfter)

export default dayjs
