import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProducts";
import Error from "./pages/Error";
import Login from "./pages/Login";
import SharedLayout from "./components/SharedLayout";
import Cart from "./pages/Cart";
import { AppProvider } from "./context/AppProvider";
import SingleBlog from "./pages/SingleBlog";
import ScrollToTop from "./components/ScrollTop";
import ForgotPass from "./pages/ForgotPass";

function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <ScrollToTop/>
                <Routes>
                    <Route path="/" element={<SharedLayout />}>
                        <Route index element={<Home />} />
                        <Route path="products" element={<Products />} />
                        <Route
                            path="products/:productId"
                            element={<SingleProduct />}
                        />
                        <Route path="blog" element={<Blog />} />
                        <Route
                            path="blog/:blogId"
                            element={<SingleBlog />}
                        />
                        <Route path="about" element={<About />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="login" element={<Login />} />
                        <Route path="reset-password" element={<ForgotPass />} />
                        <Route path="cart" element={<Cart />} />
                        <Route path="*" element={<Error />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AppProvider>
    );
}

export default App;
