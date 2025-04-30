import './App.css'
import { Cell } from './components/Cell/Cell'

function App() {
  return (
    <>
      <Cell value={'O'} onClick={() => console.log('Oval')}/>
      <Cell value={'X'} onClick={() => console.log('Cross')}/>
    </>
  )
}

export default App
