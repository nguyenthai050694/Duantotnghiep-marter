import React from "react";
import Nav from './NavPage';
import HeaderPage from './HeaderPage';
import { Outlet } from "react-router-dom";
// className Home extends React.Component {
const WebsiteLayout = () => {
    return (
        <>
            <Nav />
            <HeaderPage />
            <Outlet/>
        </>
    )
}

export default WebsiteLayout;