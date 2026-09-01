// ____________________________________________________________

function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true;
            if (success) {
                resolve('Data fetched successfully')
            } else {
                reject('Error fetching the data')
            }
        }, 3000);
    })
}

fetchData()
    .then((data) => console.log(data))
    .catch ((error) => console.error(error));

// ____________________________________________________________

const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
}

fakeRequest('google.com')
    .then(() => {
        console.log('Completed the reqest');
    })
    .catch(() => {
        console.log('You got an error');
    })


// ____________________________________________________________

const delayedColorChange = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}

delayedColorChange('yellow', 1000)
    .then(() => delayedColorChange('red', 20000))
    .then(() => delayedColorChange('brown', 20000))
    .then(() => delayedColorChange('green', 20000))
    .then(() => delayedColorChange('white', 20000))

// ____________________________________________________________