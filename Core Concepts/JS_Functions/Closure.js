function outer() {
    counter = 2
    return function () {
        counter++
        return counter        
    }
}

let increment = outer()
console.log(increment());


function createCounter() {
    let counter = 0;
    return function () {
        counter++
        return counter
    }
}

function rateLimiter(fn, limit) {
    let lastCall = 0; // closure variable — persists across calls to the returned function

    return function(...args) {
        const now = Date.now();

        if (now - lastCall >= limit) {
            lastCall = now;        // update only when the call is actually allowed
            return fn(...args);    // forward whatever arguments were passed
        }

        return "Rate limit exceeded";
    };
}

function memoize(fn) {
    const cache = {}; // closure variable — private cache, persists across calls

    return function(...args) {
        const key = JSON.stringify(args); // turn the argument list into a lookup key

        if (key in cache) {
            return cache[key]; // cached — skip recomputation
        }

        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}