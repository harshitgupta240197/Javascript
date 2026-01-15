// Dates 

// 2025-05-24T11:32:10.441Z
let myDate = new Date()
console.log(myDate)

// Converting Date to String
//Sat May 24 2025 11:36:32 GMT+0000 (Coordinated Universal Time)
console.log(myDate.toString())

// 5/24/2025, 11:36:32 AM
console.log(myDate.toLocaleString())

// Sat May 24 2025
console.log(myDate.toDateString())

// Whqt type of is Date: OBJECT
console.log(typeof myDate)


let myCreatedDate = new Date(2023, 0, 23)
console.log(myCreatedDate)
console.log(myCreatedDate.toDateString())


// Timestamp
let myTimeStamp = Date.now()
console.log(myTimeStamp)
console.log(myCreatedDate.getTime())

console.log(Math.floor(Date.now()/1000))


let newDate = new Date()
console.log(newDate)
console.log(newDate.getMonth()) // Will extract the month number
console.log(newDate.getDay()) // Will extract the month number


// Internationlisation
newDate.toLocaleDateString('default', {
    weekday : 'long'
})