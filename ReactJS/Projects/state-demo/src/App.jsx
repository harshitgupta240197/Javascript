import './App.css';
import Counter from './Counter';
import EmojiClicker from './EmojiClicker';
import ScoreKeeper from './ScoreKeeper';
import MultiPlayer from './MultiPlayer';

function App() {

  return (
    <>
    <h1>State Demo</h1>
    <br />
    <Counter />
    <br />
    <ScoreKeeper />
    <br /><br />
    <EmojiClicker />
    <br /><br />
    <MultiPlayer numPlayers={4} target={3} />
    </>
  )
}

export default App
