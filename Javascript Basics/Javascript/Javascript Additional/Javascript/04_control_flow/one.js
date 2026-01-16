// IF Statements

// if(condition){scope}

// The condition should be TRUE then only the code inside the scope will get executeed.

const isUserLoggedIn = true

if (isUserLoggedIn){

}


if (2 == 2){
    console.log("executed"); // This will be executed since the condition stands true
}


if (2 == 4){
    console.log("executed"); // This will not be execute since 2 is not equal to 4
}


//  <, >, <=, >=, ==, !=, ===, !==



// We will build a simpple temperature checker
const temperature = 40

if (temperature < 50){
    console.log('temperature is less than 50'); // gets executed since the condition is True
    
}


// Now we will also use ELSE
// We will build a simple speed checker
const speed = 150

if (speed > 200){
    console.log('Speed is more than 200');
} else {
    console.log('Speed is less than 200'); // This part will get execute because of the ELSE
    
}

// We will build a Food Checker

const food = 7

if (food > 5){
    console.log('Customer loves the food');
} else {
    console.log('Customer does not like the food');
}





// VAR is completely GLOBAL so anything declared using VAR can also be accessed outside the SCOPE.
//  CONST and LET if declared inside a SCOPE cannot be accessed outside the SCOPE.
// This is the reason why CONST and LET are preferred in JS over VAR since it keeps the code safe

// const score = 200

// if(score > 100){
//     let power = 'fly' // If we use VAR then no error will be thrown but we should not use VAR
//     console.log(`User Power ${power}`);
// }
// console.log(`User Power: ${power}`); // This will throw error



// Shorthand in JS
//******************************************** IMPLICIT SCOPE ******************************************************/
const balance = 2000
if (balance > 500) console.log('Good Balance');                // This has to be executed in a single line // IMPLICIT SCOPE

if (balance > 500) console.log('Good Balance'), console.log('Great Balance');          // Avoid doing this since it is not good practice



// Now we will see NESTED IF conditions

const bal = 2000

if (bal < 500) {
    console.log('Bal less than 500');
} else if (bal < 1000) {
    console.log('Bal less than 1000');
} else if (bal < 1500) {
    console.log('Bal is less than 1500');
} else {
    console.log('Bal is more than 1800');
}






// Using AND && Statement 

const userLoggedIn = true
const debitCard = true
const ruleFollow = true

if (userLoggedIn && debitCard && ruleFollow) {                            // This && will make sure to check both the conditions to be true
    console.log("You are allowed to buy the course");
}


// Using OR (||) PIPE 

const loggedInFromGoogle = false
const loggedInFromEmail = true

if (loggedInFromGoogle || loggedInFromEmail) {
    console.log("Welcome User");
    
}
