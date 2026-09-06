import './App.css'
import Dice from './Dice'
import SlotMachine from './SlotMachine'

function App() {
  return (
    <div className='harshit'>
      <h1><Dice /></h1>
      <h1><Dice /></h1>
      <br />
      <br />
      <br />
      <h1><SlotMachine val1='d' val2='d' val3='d' /></h1>
      <h1><SlotMachine val1='d' val2='e' val3='d' /></h1>
    </div>
  ) 
}

export default App
