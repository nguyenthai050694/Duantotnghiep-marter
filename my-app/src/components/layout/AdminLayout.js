import React from "react";
import Product from "../product/Product";
import Bill from "../bill/Bill";
import Admin from "./Admin";
import {
    Route
} from "react-router-dom";

class AdminLayout extends React.Component {
    render() {
        return (
            <div>
                <Admin />
                <Route path="/" element={<Product />} exact={true} />
            </div>
        )
    }
}

export default AdminLayout