import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Products from "../pages/Products";
import Template from "../Template";
import Profile from "../pages/Profile"; 
import CategoryProduts from "../pages/CategoryProducts";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import { auth, cart } from "../middleware/auth";
import Payment from "../pages/Payment";
import MealDetail from "../pages/MealDetail";

// variable yg menyimpan daftar routing, di export biar bisa dipake di file lain
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Template />,
        // mengisi ke outlet di Template.jsx
        children: [
            {
                path: "/", //url path
                element: <App />, //file yg akan ditampilkan
            }, {
                path: "/products",
                element: <Products />,
            }, {
                path: "/profile",
                element: <Profile />,
            }, {
                // path dinamis menggunakan titik 2 (:)
                path: "/products/category/:categoryId",
                element: <CategoryProduts />
            }, {
                path: "/login",
                element: <Login />,
                loader: cart,
            }, 
            { path: "/meal/:id", element: <MealDetail /> }
        ]
    }, {
        path: "/",
        element: <Template />,
        // memanggil middleware sebelum menjalankan path didalam sini
        loader: auth,
        children: [
            {
                path: "/cart",
                element: <Cart />
            }, {
                path: "/payment",
                element: <Payment />,
            }
        ]
    }

]);

// buat folder routes buat file index.jsx untuk menyimpan daftar routing pake createBrowserRouter
// daftarkan juga di main.jsx daftar pake RouterProvider
// buat folder pages dan file Products.jsx
// pake Link (to="/") untuk menghubungkan