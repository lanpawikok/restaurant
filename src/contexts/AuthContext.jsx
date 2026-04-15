import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
// biar bisa diulang berkali kali

export default function AuthProvider({children}) {

    const [isLogin, setIsLogin] = useState(localStorage.getItem("access_token"));

    function checkLogin() {
        if (localStorage.getItem("access_token")) {
            setIsLogin(localStorage.getItem("access_token"));
        }
    }

    function logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setIsLogin(null);
    }

    return (
        // value : ekport state dan func yang akan digunakan file
        <AuthContext.Provider value={{ isLogin, checkLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
}