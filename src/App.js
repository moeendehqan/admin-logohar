import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './style/style.css'
import 'react-toastify/dist/ReactToastify.css';
import Login from './layot/login';
import Desk from './layot/desk';
import Pallet from './page/pallet';
function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/desk' element={<Desk/>}>
            <Route path='pallet' element={<Pallet/>}></Route>

          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
