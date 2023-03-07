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
import { Orders } from "./pages/Orders";
import { OrderDetails } from "./pages/OrderDetails";
import { Toaster } from "react-hot-toast";
import { ProductDetails } from "./pages/Product-Details";

function App() {
  return (
    <div className="bg-slate-500">
      <AuthContextComponent>
        <Toaster />
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
          <Route
            path="/orders"
            element={<ProtectedRoute component={Orders} />}
          />
          <Route
            path="/order-details/:orderId"
            element={<ProtectedRoute component={OrderDetails} />}
          />
          <Route
            path="/product-details/:productId"
            element={<ProtectedRoute component={ProductDetails} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;
