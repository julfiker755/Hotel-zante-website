import { DateRange } from 'react-date-range'

const DatePicker = ({ value}) => {
  return (
    <DateRange
       onChange={() => {}}
        ranges={[value]}
        rangeColors={['#F43F5E']}
        direction='vertical'
        showDateDisplay={false}
    />
  )
}

export default DatePicker
