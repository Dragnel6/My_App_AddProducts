import LoginComponent from "./view/LoginComponent";
import { Products } from "./view/Products/Products";
import NavBar from "./view/NavBar";
import RegisterComponent from "./view/RegisterComponents/RegisterComponent";
import { BrowserRouter, Route, Routes } from 'react-router'; // corregido

function App() {
  return (
    <div className="bg-dark min-vh-100 text-light">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/products" element={<Products />} />
          <Route path="/register" element={<RegisterComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
