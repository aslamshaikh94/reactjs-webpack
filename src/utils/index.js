// password between 7 to 15 characters which contain at least one numeric digit and a special character
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PHONE_REGEX = /^[6-9]\d{9}$/

import { getAppStore } from '@store'
export const isUserLoggedIn = () => {
  const { loggedInUserData = {} } = getAppStore()
  return !!Object.keys(loggedInUserData).length
}

export const generateQuickGuid = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}

export const getYearsDiff = (startingDate, endingDate) => {
  let startDate = new Date(new Date(startingDate).toISOString().substr(0, 10))
  if (!endingDate) {
    endingDate = new Date().toISOString().substr(0, 10) // need date in YYYY-MM-DD format
  }
  let endDate = new Date(endingDate)
  if (startDate > endDate) {
    let swap = startDate
    startDate = endDate
    endDate = swap
  }
  let startYear = startDate.getFullYear()
  let february =
    (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0
      ? 29
      : 28
  let daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

  let yearDiff = endDate.getFullYear() - startYear
  let monthDiff = endDate.getMonth() - startDate.getMonth()
  if (monthDiff < 0) {
    yearDiff--
    monthDiff += 12
  }
  let dayDiff = endDate.getDate() - startDate.getDate()
  if (dayDiff < 0) {
    if (monthDiff > 0) {
      monthDiff--
    } else {
      yearDiff--
      monthDiff = 11
    }
    dayDiff += daysInMonth[startDate.getMonth()]
  }

  return yearDiff + '.' + monthDiff
}

// Validate password
export const validatePassword = password => {
  return password && PASSWORD_REGEX.test(password)
}

// Validate email
export const validateEmail = email => {
  return email && EMAIL_REGEX.test(email)
}

// Get alphabets trimed from start and number not allow
export const getAlphabets = value => {
  return value.replace(/[^A-Za-z ]/gi, '').trimStart()
}

// Get number alphabets not allow
export const getNumber = value => {
  return Number(value.replace(/[^0-9 ]/gi, '').trim())
}

// Get input value as per type alphabets not allow
export const getInputVal = (value, type, max) => {
  if (max && value.length > Number(max)) return false
  if (type && type === 'number') {
    return getNumber(value)
  } else return value
}
