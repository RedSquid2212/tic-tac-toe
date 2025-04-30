import './App.css'
import { Board } from './components/Board/Board'

function App() {
  return (
    <>
      <Board cells={['X', 'O', 'O', 'X', 'O', 'X', 'O', 'O', 'X']} onCellClick={() => console.log('click')}/>
    </>
  )
}

export default App
