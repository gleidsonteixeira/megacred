import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";

//PAGES
import Login from '../pages/Login';
import Home from "../pages/Home";
import NotFound from '../pages/NotFound';
import PageUser from '../pages/PageUser';
import PageCategoryPayment from '../pages/PageCategoryPayment';
import PageCostCenter from '../pages/PageCostCenter';
import PageClient from '../pages/PageClient';
import PageCategoryClient from '../pages/PageCategoryClient';

export default function Ways()
{
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<Login />} />
                    <Route exact path="/dashboard" element={<Home />} />
                    <Route exact path="/users" element={<PageUser />} />
                    <Route exact path="/clients" element={<PageClient />} />
                    <Route exact path="/category-payments" element={<PageCategoryPayment />} />
                    <Route exact path="/category-clients" element={<PageCategoryClient />} />
                    <Route exact path="/cost-center" element={<PageCostCenter />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}