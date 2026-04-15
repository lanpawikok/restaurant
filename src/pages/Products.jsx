import { useState, useEffect } from "react";
import CardCommerceComp from "../components/CardCommerceComp";
import CardList from "../components/CardList";
import { Spinner } from "flowbite-react";
import FilterComp from "../components/FilterComp";
import PaginationComp from "../components/PaginationComp";


export default function Products() {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // simpan semua data
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const ITEMS_PER_PAGE = 8;

  const onPageChange = (page) => {
    setCurrentPage(page);
    // potong data sesuai halaman
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setProducts(allProducts.slice(start, end));
  };

  function sortProduct(type) {
    const newProduct = [...products];
    if (type == "harga termurah") {
      newProduct.sort((a, b) => a.price - b.price);
    } else if (type == "harga termahal") {
      newProduct.sort((a, b) => b.price - a.price);
    } else if (type == "alfabet a-z") {
      newProduct.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
    } else if (type == "alfabet z-a") {
      newProduct.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
    }
    setProducts(newProduct);
  }

  function updateSearchValue() {
    setSearch(event.target.value);
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${event.target.value}`;
    getDataProducts(url);
  }

  async function getDataProducts(url = "https://www.themealdb.com/api/json/v1/1/search.php?f=a") {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      const meals = result.meals;

      if (!meals) {
        setProducts([]);
        setAllProducts([]);
        setTotalPages(1);
        setLoading(false);
        return;
      }

      // Tambahkan harga random ke setiap meal
      const mealsWithPrice = meals.map((meal) => ({
        ...meal,
        price: Math.floor(Math.random() * 2) + 11,
      }));

      setAllProducts(mealsWithPrice);
      setTotalPages(Math.ceil(mealsWithPrice.length / ITEMS_PER_PAGE));
      // tampilkan 8 data pertama
      setProducts(mealsWithPrice.slice(0, ITEMS_PER_PAGE));
      setCurrentPage(1);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getDataProducts();
  }, []);

  if (loading == true) {
    return (
      <div className="block mx-auto mt-50 w-100 text-center">
        <Spinner /> Sedang Memuat data...
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-bold text-2xl m-15">Daftar Lengkap Makanan</h1>
      <div>
        <FilterComp updateSearchValue={updateSearchValue} sortProduct={sortProduct} />
        <CardList data={products} />
        <PaginationComp currentPage={currentPage} onPageChange={onPageChange} totalPages={totalPages} />
      </div>
    </div>
  );
}