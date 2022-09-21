import React from 'react';
import Header from "./Header";
import { useLocation } from 'react-router-dom';
import Footer from "./Footer";

const Layout = ({children}) => {
    const location = useLocation();
    return (
        <>
            <Header/>
            <div className={"min-h-full"}>
                <main>
                    {children}
                </main>
            </div>
            <Footer/>
        </>
    );
};

export default Layout;