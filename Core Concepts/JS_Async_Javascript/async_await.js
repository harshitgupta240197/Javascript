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