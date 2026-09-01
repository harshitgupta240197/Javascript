// ___________________________________________________________
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true;
            if (success) {
                resolve({name: 'google', url: 'https://google.com'});
            } else {
                reject('Error in fetching Data')
            }
        }, 3000);
    })
}

async function getUserData() {
    try {
        console.log('Fetching user data');
        const userData = await fetchData()
        console.log('User data fetched', userData);
    } catch (error) {
        console.log('Error fetching data', error);
    }
}

getUserData()

// _____________________________________________________________

const delayedColorChange = (color, delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}

async function rainbow() {
    await delayedColorChange('red', 1000)
    await delayedColorChange('yellow', 1000)
    await delayedColorChange('violet', 1000)
    await delayedColorChange('indigo', 1000)
    await delayedColorChange('yellow', 1000)
    await delayedColorChange('green', 1000)
    return 'All Done'
}

// rainbow.then(() => console.log('Completed Rainbow'))

async function printRainbow() {
    await rainbow();
    console.log('Completed Rainbow');
}