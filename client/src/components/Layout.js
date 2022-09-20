import React from 'react';
import Header from "./Header";
import {useRouter} from "next/router";
import Footer from "./Footer";

const Layout = ({children}) => {
    const location = useRouter();
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