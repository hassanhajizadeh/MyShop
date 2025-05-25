import React, { useContext } from "react";
import ProductsShow from "../components/ProductsShow";
import Filters from "../components/Filters";
import { AppContext } from "../context/AppContext";

const Products = () => {
    const {screenSize} = useContext(AppContext)
    return (
        <div className="products">
            <div className="page-header" id="products-show">
                <h1>محصولات</h1>
            </div>
            <div className="products-manage">
                {screenSize>1250 && <Filters />}
                <ProductsShow />
            </div>
        </div>
    );
};

export default Products;
