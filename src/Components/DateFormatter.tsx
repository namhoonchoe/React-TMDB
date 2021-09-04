import React from 'react'
import { Text, Flex } from "@chakra-ui/react"

interface IDateProps {
  date:string
}

const DateFormatter:React.FC<IDateProps> = ({ date }) => {

  const target = date.split("-")

  const year = target[0]
  const month = target[1]
  const day = target[2]
  const monthNames = ['Jan',	'Feb',	'Mar',	'Apr',	'May',	'June',	'July',	'Aug',	'Sept',	'Oct',	'Nov',	'Dec']

  const setMonthName = (month:string) => {
    switch(month) {
      case '01':
        return monthNames[0]
      case '02':
        return monthNames[1]
      case '03':
        return monthNames[2]
      case '04':
        return monthNames[3]
      case '05':
        return monthNames[4]
      case '06':
        return monthNames[5]
      case '07':
        return monthNames[6]
      case '08':
        return monthNames[7]
      case '09':
        return monthNames[8]
      case '10':
        return monthNames[9]
      case '11':
        return monthNames[10]
      case '12':
        return monthNames[11]
    }
  } 

  const mmddyyyy = `${setMonthName(month)} ${day}, ${year}`
  return (
    <>
      <Text mr={1} fontWeight="semibold">{mmddyyyy}</Text>
    </>
  )
}


export default DateFormatter
