import HomePage from "./components/HomePage/HomePage";
import Product from "./components/Product/Product";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import HomePage1 from "./components/HomePage1/HomePage1";

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage1 />} />
      {/* <Route path="/" element={<HomePage />} />
      <Route path="/:id" element={<Product />} /> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
