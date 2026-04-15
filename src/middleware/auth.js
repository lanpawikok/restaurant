import { useContext } from "react";
import {redirect } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { Navigate } from "react-router-dom";


export function auth() {
    const access_token = localStorage.getItem("access_token");

    // cek jika di localstorage ada access_token maka halaman gaboleh akses
    if(!access_token) {
        // perpindahan halaman:
        // 1. navigate: jika func dipanggil lewat event (onChange, dsb)
        // 2. redirect: jika func biasa bukan dari on/event
        return redirect("/login");
    } 
    // kalau gaada localstorage bole akses
    return null;
}

export function cart() {
    const access_token = localStorage.getItem("access_token");

    // cek jika di localstorage ada access_token maka halaman gaboleh akses
    if(access_token) {
        
        return redirect("/cart");
    } 
    // kalau gaada localstorage bole akses
    return null;
}

