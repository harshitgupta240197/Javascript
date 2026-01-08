
// Curly Braces {} is SCOPE
if (true) {
    let a = 20
    const b = 30
    var c = 70
}

var c = 300

//console.log(a); // a is not defined
//console.log(b); // b is not defined
console.log(c); // Returns 70

// VAR is mostly avoided by developers since it is easwily mutable

// BLOCK SCOPE :  Anything inside a if block code
// GLOBAL SCOPE :  Everything outside the Block is global scope

// The values provided inside the BLOCK SCOPE should not go outside the block scope


// Now we will check for Block scope and Global scope
let x = 500
if (true){
    let x = 70
    const y = 400
    console.log("INNER", x);
}





//***************************************************************** NESTED SCOPE *******************************************************/
function one(){
    const username = "Harshit"
    //Nesting another function inside the present function
    function two(){
        const owner = "microsoft"
        console.log(username);
        
    }
    // console.log(owner); // Will result in not defined

    two()
    
}

one()







// Nested IF conditions
if (true) {
    const bigName = "Harshit"
    if (bigName === "Harshit") {
        const website = " youtube"
        console.log(bigName + website);
    }
    // console.log(website); // This will cause an error 
    
}
// console.log(bigName); // This will cause an error








//*********************************** Functions are made using two ways **************************** */

// We will make a function that adds 1 to any given number
// In this case we can access the function beofre it's declaration
function addOne(num){
    return num + 1
}
addOne(5) // Calling the function
console.log(addOne(5)); // This will result as 6
// If I place this console log before the function then too it will produce the result


// Sicne this function is being held inside a variable so we cannot access the function only after it is declared
// Another function that will add 2
// This is also a function but sometimes referred to as EXPRESSION
const addTWo = function(num){
    return num + 2
}
addTWo(7)
console.log(addTWo(7)); // This will return 9
// If I palce this console log before the expression then it will throw an error
