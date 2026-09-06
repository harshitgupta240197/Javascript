import './App.css'
import ShoppingList from './ShoppingList'

const data = [
  { id: 1, item: 'eggs', quantity: 12, completed: false },
  { id: 2, item: 'milk', quantity: 1, completed: true },
  { id: 3, item: 'carrot', quantity: 10, completed: false },
  { id: 4, item: 'chicken', quantity: 22, completed: true }
]

function App() {
  return <ShoppingList items={data}/>
}

export default App
