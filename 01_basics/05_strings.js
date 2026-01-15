const name = "harshit"
const repoCount = 50
console.log(name + " " + repoCount) // This is an old method and now people don't use this method

// The new method us using backticks and dollar sign
// Also using this method you can directly use a method inside it as well
console.log(`Hello my name is ${name} and my repo count on github is ${repoCount}`)

//Another method of declaring string is by using NEW (OBJECT):
const gameName = new  String('harshit')
console.log(gameName) // In this case String is an object and is a KEY VALUE PAIR
// Since  this is a key value pair, we will try to access a key
console.log(gameName[0])

// To access prototype
console.log(gameName.__proto__)

// To know the length
console.log(gameName.length)

// To convert to UpperCase
console.log(gameName.toUpperCase())

// To see which character is at which position 
console.log(gameName.charAt(6))

// To know by giving the character that at what position it is
console.log(gameName.indexOf('t'))

//Creating substrings:
const newString = gameName.substring(0, 4)
console.log(newString)

// Slicing
const anotherString = gameName.slice(-6, 4)
console.log(anotherString)

// Trimming
const newStringOne = "    harshit    "
console.log(newStringOne)
console.log(newStringOne.trim())

// To check if an item is present or not
console.log(gameName.includes('harshit')) 

// To replace
console.log(gameName.replace('s', 'ss'))