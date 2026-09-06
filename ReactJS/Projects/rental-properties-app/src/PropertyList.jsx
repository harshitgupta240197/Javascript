import PropertyListItems from "./PropertyListItems";

function PropertyList({ properties }) {
    return (
        <table>
            {properties.map((p) => (
                <PropertyListItems
                    key={p.id}
                    name={p.name}
                    rating={p.rating}
                    price={p.price}
                />
            ))}
        </table>
    )
}

export default PropertyList;