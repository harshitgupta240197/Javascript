
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


