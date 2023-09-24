import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { UserProvider } from './context/UserContext';
import './style/style.css'
import 'react-toastify/dist/ReactToastify.css';
import Login from './layot/login';
import Desk from './layot/desk';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/desk' element={<Desk/>}></Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
