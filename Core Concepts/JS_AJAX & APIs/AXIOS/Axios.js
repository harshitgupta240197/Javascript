const getStarWarsPerson = async (id) => {
    try {
        const res = await axios.get(`https://swapi.dev/api/people/${id}/`);
        console.log(res.data);
    } catch(e) {
        console.log('Errror', e);
        
    }
};

getStarWarsPerson(5)