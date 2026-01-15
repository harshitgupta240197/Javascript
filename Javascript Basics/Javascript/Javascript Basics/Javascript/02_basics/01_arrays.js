// ARRAY
// It can hold any type of element
const myArr = [0, 1, 2, 3, true, "harshit"]
const superHeroes = ['Iron Man', 'Batman', 'Spider Man']
const myList = new Array(1, 2, 3, 4) // In this case square brackets is not required since we are directly calling Array

// Javascript arrays are resizable : We can add as many elements we want

// To access any value in an array we cannot use strings instead we use numbers
console.log(myArr[2])


// ARRAY METHODS

myArr.push(6)  // PUSH will basically add a value to the array
console.log(myArr)

// POP will simply remove the last value that was added to the array.
myArr.pop()
console.log(myArr)




// SHIFT and UNSHIFT work on the starting of an array:

// UNSHIFT will add a value to the staring of an array
myArr.unshift(12)
console.log(myArr)

// SHIFT will remove the value that is present at the starting of the array
myArr.shift()
console.log(myArr)


// We can also ask questions using INCLUDE

// Here we are asking if 9 is present in our array or not
console.log(myArr.includes(9));
console.log(myArr.includes(2));

// We can also ask for the index/position
console.log(myArr.indexOf(5)); // If we get -1 as an answer


// Using JOIN to convert the array to a string also it binds the array
const newArray = myArr.join()

console.log(myArr)                       // [ 0, 1, 2, 3, true, 'harshit' ]
console.log(newArray);                   // 0,1,2,3,true,harshit
console.log(typeof newArray);            // string




//==================================SLICE & SPLICE==================================//

// SLICE does not manipulate the original array
// SPLCIE manipulates the original array

// SLICE
console.log("A", myArr)
const myn1 = myArr.slice(1, 3)
console.log(myn1);
console.log("B", myArr);


// SPLICE
const myn2 = myArr.splice(1, 3)
console.log(myn2);

// Print original array now
console.log("C", myArr);



