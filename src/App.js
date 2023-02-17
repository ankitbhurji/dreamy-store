import HomePage from "./components/HomePage/HomePage";
import Product from "./components/Product/Product";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
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
