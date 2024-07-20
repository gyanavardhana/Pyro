import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage/Home';
import SignupPage from './Components/Signup/Signup';
import LoginPage from './Components/Login/Login';
import PlotComponent from './Components/Plot';
import './index.css'
const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<SignupPage />}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/plot" element={<PlotComponent />}/>
      
    </Routes>
    </>
  )
}

export default App;