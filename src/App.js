
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import HomePage from "./components/HomePage/HomePage";
import Product from "./components/Product/Product";

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:id" element={<Product />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
