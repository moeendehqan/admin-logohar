import { QueryClient, QueryClientProvider } from "react-query";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/style.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./layot/login";
import Desk from "./layot/desk";
import Pallet from "./page/pallet";
import Vector from "./page/vector";
import Font from "./page/font";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/desk' element={<Desk />}>
            <Route path='pallet' element={<Pallet />}></Route>
            <Route path='vector' element={<Vector />}></Route>
            <Route path='font' element={<Font />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
