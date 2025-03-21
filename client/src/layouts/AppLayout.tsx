import React from 'react';
import {Outlet} from "react-router";

const AppLayout = () => {
    return (
        <div>
            <main>
                <Outlet/>
            </main>
        </div>
    );
};

export default AppLayout;