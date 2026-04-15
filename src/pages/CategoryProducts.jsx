import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardList from "../components/CardList";
import FilterComp from "../components/FilterComp";
import PaginationComp from "../components/PaginationComp";

export default function CategoryProducts() {
    // mengambil path dinamis, nama path dinamis 
    // sesuaii di routing
    const { categoryId } = useParams();
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);



    const onPageChange = (page) => {
        setCurrentPage(page);
        getCategoryProducts("https://api.escuelajs.co/api/v1/products/?categoryId=" + categoryId + "&limit=4" + "&offset=" + currentPage);
    };

    function sortProduct(type) {
        const newProduct = [...products];
        if (type == "harga termurah") {
            // fungsi js untuk mengururkan nilain nmer : sort()
            newProduct.sort((a, b) => a.price - b.price);

        } else if (type == "harga termahal") {
            newProduct.sort((a, b) => b.price - a.price)
        } else if (type == "alfabet a-z") {
            newProduct.sort((a, b) => a.title.localeCompare(b.title));
        } else if (type == "alfabet z-a") {
            newProduct.sort((a, b) => b.title.localeCompare(a.title));
        }
        setProducts(newProduct);
    }

    function updateSearchValue(value) {
        // menyimpan value dari props updatesearchvalue
        setSearch(event.target.value);
        let url = "https://api.escuelajs.co/api/v1/products/?categoryId=" + categoryId + "&limit=4" + "&offset=" + currentPage + "&title=" + search;
        getCategoryProducts(url)
    };

    async function getCategory() {
        const url = "https://api.escuelajs.co/api/v1/categories/" + categoryId;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            // let state categoryProduts dengan data dari API (result)
            setCategory(result);
        } catch (error) {
            console.error(error.message);
        }
    };

    async function getCategoryProducts(url = "https://api.escuelajs.co/api/v1/products/?categoryId=" + categoryId + "&limit=4" + "&offset=" + currentPage) {

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            // let state categoryProduts dengan data dari API (result)
            setProducts(result);
            // hitung total page untuk pagination
            // jumlah data dibagi data yg dimunculkan sebanyak 4
            // let totalPages = Math.ceil(result.length / 4);
            // setTotalPages(totalPages);
            setLoading(false);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        setCurrentPage(1);
        getCategory();
        getCategoryProducts();
    }, [categoryId]);

    if (loading == true) {
        return (
            <div className="block mx-auto mt-50 w-100 text-center">
                <Spinner /> Sedang Memuat data...
            </div>
        );
    }

    return (
        <>
            <h1 className="text-3xl font-bold m-10">
                Produk Kategori {category.name}
            </h1>

            <FilterComp updateSearchValue={updateSearchValue} sortProduct={sortProduct} />

            <CardList data={products} type={"products"} />
            <PaginationComp currentPage={currentPage} onPageChange={onPageChange} />
        </>
    );
}