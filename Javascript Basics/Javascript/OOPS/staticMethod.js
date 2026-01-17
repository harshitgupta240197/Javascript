// STATIC METHOD
/**A static method in JavaScript is a function that belongs to the class itself, rather than any specific 
 instance (object) of the class. It is defined using the static keyword and is called directly on the class name.  */

 class Calculator {

    static add (a,b){
        return a + b
    }
 }

//  let newCalc = new Calculator()       We cannot do this while using static
//  console.log(newCalc.add(2,3));       We cannot do this while using static

console.log(Calculator.add(2,3));        // Correct way of accessing the method when using STATIC