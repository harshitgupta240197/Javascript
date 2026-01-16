console.log(2 > 1)
console.log(2 < 1)
console.log(2 >= 1)
console.log(2 == 1)
console.log(2 != 1)

console.log("2" > 1) //This will return True
console.log("02" > 1) //This will return True


// Avoid these types of conversions
console.log(null > 0) // Returns False
console.log(null == 0) // Returns False
console.log(null >= 0) // Returns True

// Avoid these types of conversions
console.log(undefined == 0) // Returns False
console.log(undefined > 0) // Returns False
console.log(undefined < 0) // Returns False
console.log(undefined <= 0) // Returns False

//Using a strict check (===) will produce correct result
console.log("2" === 2)
