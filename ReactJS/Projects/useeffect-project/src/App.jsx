import Counter from './Counter'
import './App.css'
import Quotefetcher from './Quotefetcher'
import QuotefetcherLoader from './QuoteFetcherLoader'

function App() {

  return (
    <>
      <Counter />
      <br /><br /><br />
      <QuotefetcherLoader />
      <Quotefetcher />
    </>
  )
}

export default App
