import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";

//PAGES
import Login from '../pages/Login';
import Home from "../pages/Home";
import NotFound from '../pages/NotFound';
import PageUser from '../pages/PageUser';
import PageCategoryPayments from '../pages/PageCategoryPayments';

export default function Ways()
{
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<Login />} />
                    <Route exact path="/dashboard" element={<Home />} />
                    <Route exact path="/users" element={<PageUser />} />
                    <Route exact path="/category-payments" element={<PageCategoryPayments />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}