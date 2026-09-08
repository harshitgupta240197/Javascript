import './App.css'
import Dice from './Dice'

function App() {
  return (
    <>
      <Dice dice={[3, 6, 1]} />
      <Dice dice={[3, 6, 1]} color={'pink'}/>
      <Dice dice={[3, 6, 1]} />
    </>
  )
}

export default App
