import { Routes, Route } from 'react-router-dom';
import Home from './pges/Home.js'
import AboutUs from './pges/About.js';
import Login from './Auth/Login.js';
import Register from './Auth/Register.js';
import RequirAuth from './Auth/RequireAuth.js';
import MqttDataDisplay from './MqttPages/Mqtt.js';
import PublishData from './MqttPages/PublishData.js';

function App() {
  return (
    <Routes>

      
    
      <Route path='/login' element={ <Login/>} />
      <Route path='/register' element={<Register/>} />

      <Route element={<RequirAuth/>}>
      
       <Route path="/" element={<Home />} >

       <Route path='about' element={<AboutUs/>} />
       <Route path='mqtt-publish-data' element={<PublishData/>} />
       <Route path='mqtt-get-data' element={<MqttDataDisplay/>} />
       </Route>
       
     
      </Route>
    </Routes>
  );
}

export default App;

