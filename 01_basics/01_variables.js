const accountId = 13324   
let accountEmail = "harshit@gmail.com"
var accountPassword = "12345"
accountCity = "Varanasi"
let accountState;
// If you dont assign any value to a variable in JS then it is read as undefined


// accountId = 2435
accountEmail = "harshit2024@gmail.com"
accountPassword = "12345678"
accountCity = "Lucknow"

// To print a single variable we use console.log
console.log(accountId)

// To print multiple variables we will use console.table
console.table([accountId, accountEmail, accountPassword, accountCity, accountState])

// Using CONST will lock the value so that it cannot be changed 

// To declare a constant there is only one way CONST
// To declare a variable there are two ways : VAR and LET
// We dont use VAR anymore because of issue in block scope and functional scope