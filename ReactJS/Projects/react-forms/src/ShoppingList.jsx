import { useState } from "react";
import ShoppingListForm from "./ShoppingListForm";
import { v4 as uuid } from 'uuid';

function ShoppingList() {

    const [items, setItems] = useState([
        { id: 1, product: 'banana', quantity: 8 }
    ]);

    const addItem = (item) => {
        setItems((currItems) => {
            return [...currItems, { ...item, id: uuid() }];
        })
    }

    return (
        <div>
            <h1>Shopping List</h1>
            <ul>
                {items.map(i =>
                    <li key={i.id}>
                        {i.product} - {i.quantity}
                    </li>)}
            </ul>
            <ShoppingListForm addItem={addItem} />
        </div>
    )
}

export default ShoppingList;