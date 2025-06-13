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