const form = document.querySelector('#movieForm')
const searchBox = document.querySelector('#searchBox')
const searchButton = document.querySelector('#searchButtton')

form.addEventListener('submit', async function(e) {
    e.preventDefault()
    const searchTerm = form.nextElementSibling.querySelector.value;
    const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`) 
    makeImages(res.data)  
})

const makeImages = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement('img')
            img.src = result.show.image.medium;
            document.body.append(img)
        }
    }
}