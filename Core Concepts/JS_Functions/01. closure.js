function outer() {
    counter = 2
    return function () {
        counter++
        return counter        
    }
}

let increment = outer()
console.log(increment());