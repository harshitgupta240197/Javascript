/* Write a FOR loop that iterates through the array [2, 5, 7, 9]
Skip the value 7 and multiply the rest by 2.
Store the rest in a new array  called doubledNumbers
*/

numbers = [2, 5, 7, 9]
doubledNumbers = []

for (let i = 0; i < numbers.length; i++) {
    
    if (numbers[i] === 7) {
        continue 
    }
    doubledNumbers.push(numbers[i]*2)
    
}
console.log(doubledNumbers);


