import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthContextComponent } from "./context/authContext";
import { ErrorPage } from "./pages/ErrorPage";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { Signup } from "./pages/Signup";
import { CreateProduct } from "./pages/Create-Product";

function App() {
  return (
    <div className="bg-slate-500" >
      <AuthContextComponent>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={<ProtectedRoute component={Profile} />}
          />
          <Route
            path="/create-product"
            element={<ProtectedRoute component={CreateProduct} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;
