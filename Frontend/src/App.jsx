import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage/Home';
import './index.css'
const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
    </>
  )
}

export default App;