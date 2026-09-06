function ShoppingList({ items }) {

    return (
        <div>
            <ul>
                {items.map((i) => (
                    <li key={i.id}
                        style={{color: i.completed ? 'grey' : 'black',
                        textDecoration: i.completed ? 'line-through' : 'none'
                    }}>
                        {i.item} - {i.quantity}
                    </li>
                ))}
            </ul>
        </div>
    ) 
}

export default ShoppingList;