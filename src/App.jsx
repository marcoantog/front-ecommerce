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
import { CreateProduct } from "./pages/CreateProduct";
import { Orders } from "./pages/Orders";
import { OrderDetails } from "./pages/OrderDetails";
import { Toaster } from "react-hot-toast";
import { ProductDetails } from "./pages/Product-Details";
import { ProductsUser } from "./pages/ProductsUser";
import { EditProduct } from "./pages/EditProduct";
import { CategoryProducts } from "./pages/CategoryProducts";
import { WishList } from "./pages/WishList";
import { WishListComponent } from "./context/WishListContext";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-slate-500">
      <AuthContextComponent>
        <WishListComponent>
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
            <Route
              path="/products-user"
              element={<ProtectedRoute component={ProductsUser} />}
            />
            <Route
              path="/edit-product/:productId"
              element={<ProtectedRoute component={EditProduct} />}
            />
            <Route
              path="category-products/:category"
              element={<CategoryProducts />}
            />
            <Route
              path="/wish-list"
              element={<ProtectedRoute component={WishList} />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </WishListComponent>
      </AuthContextComponent>
    </div>
  );
}

export default App;
