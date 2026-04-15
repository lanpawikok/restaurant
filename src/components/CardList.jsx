import { useState } from "react";
import CardCommerceComp from "./CardCommerceComp";
import CardComp from "./CardComp";
import ModalCartComp from "./ModalCartComp";

export default function CardList({ data, type, children }) {
    const [openModal, setOpenModal] = useState(false);
    const [product, setProduct] = useState({});

    function handleOpenModal(item) {
        setProduct(item);
        setOpenModal(true);
    } 
    function handleCloseModal() {
        setOpenModal(false);
    } 
    return (
        <div className="w-4xl block mx-auto">
            {children}
            <div className="grid grid-cols-4 gap-3
        mt-15">
                {
                    data.map((item, index) =>
                        type == "category" ? (
                            <CardComp item={item} key={index} />) : (
                            <CardCommerceComp item={item} key={index} handleOpenModal={handleOpenModal}/>)
                    )   
                }
            </div>
            <ModalCartComp openModal={openModal} handleCloseModal={handleCloseModal}
            item={product}/>
        </div>
    );
}