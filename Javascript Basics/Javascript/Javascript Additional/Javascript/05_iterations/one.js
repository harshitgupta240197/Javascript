// FOR LOOP *******************



// for (let index = 0; index < array.length; index++) {
//     const element = array[index];
    
// }

// let index = 0               ------> This is the variable declared which has an index of 0
// index < array.length        ------> CONDITION CHECK ----> Says that the length of the index should be less than the array length
// index++                     ------> This is responsible for the iterations. This is executed at the last.


// 1. The code reads the index value
// 2. The code checks the CONDITION mentioned.
// 3. If the condition matches to be true then the code execute what is inside the bloack.
// 4. At last the code comes to index++ for repeating the same process til the time the condition is met.


// number series
for (let index = 0; index < 10; index++) {          // We replaced array.length with 10 = hard coded
    const element = index;                          // We replcaed array[index] with index
    console.log(element);                           // Until and unless the values of the index reaches 10 it will keep printing
}



for (let i = 5; i < 10; i++) {        
    const element = i;                          
    console.log(element);                         
}  // This element will not be available outside the scope. (will throw an error)
// element is not available outside the scope to prevent spilling and keep the code intact



// Now we will nest an IF condition inside this FOR LOOP
for (let i = 0; i < 10; i++) {
    const element = i;
    if (element == 5) {
        console.log('5 is the best number');  // This will be printed along with the printing of 5
    }
    console.log(element);
    
}





// NESTED FOR LOOPS --> Nesting of For loop inside another FOR loop
for (let x = 0; x < 10; x++) {
    console.log(`Outer Loop ${i}`);
    for (let y = 0; y < 7; y++) {
        const element = y;
        
    }
    
}

