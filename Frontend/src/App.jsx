import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage/Home';
import SignupPage from './Components/Signup/Signup';
import LoginPage from './Components/Login/Login';
import PlotComponent from './Components/Plot';
import SettingsPage from './Components/Settingspage/Settings';
import MLComponent from './Components/MLpage/MLpage';
import 'primereact/resources/themes/saga-blue/theme.css'; // or any other theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import './index.css'
const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<SignupPage />}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/plot" element={<PlotComponent />}/>
      <Route path="/settings/" element={<SettingsPage />} />  
      <Route path="/mlupload" element={<MLComponent />} />
    </Routes>
    </>
  )
}

export default App;