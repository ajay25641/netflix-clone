import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import { DetailPage } from './DetailPage';
import Nav from './Nav';
import SearchBar from './SearchBar';


const Router = () => {
    return (

        <BrowserRouter>
            <Nav />
            <Routes>
            <Route exact path='/' element={<App/>} />
            <Route path='/movieDetail' element={<DetailPage/>} />
            <Route path='/searchMovie' element={<SearchBar/>} />
            </Routes>
        </BrowserRouter>

    )
}
export default Router;