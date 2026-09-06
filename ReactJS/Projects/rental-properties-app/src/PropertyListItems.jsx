function PropertyListItems({ name, rating, price }) {
    return (
        <td>
            <h2>{name}</h2>
            <h3>${price} a night</h3>
            <h4>{rating}</h4>
        </td>
    )
}

export default PropertyListItems;