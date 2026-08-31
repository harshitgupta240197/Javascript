class Calculator {
    static add(a, b) {
        return a + b;
    }
    static subtract(a, b) {
        return a - b;
    }
}

console.log(Calculator.add(4, 5));
console.log(Calculator.subtract(8, 5));

// We can access the static methods via the CLASS itself and not via extending or new keyword through another variable.

