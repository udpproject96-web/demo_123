import { lazy } from "react";
const Home = lazy(()=> import('./Pages/Home'))
const Error = lazy(()=> import('./Pages/Error'))
const ProductForm = lazy(()=> import('./Pages/ProductForm'))
const SingleProduct = lazy(()=> import('./Pages/SingleProduct'))
// import Error from "./Pages/Error";
// import Home from "./Pages/Home";

const Routing = [
    {
        path : '/',
        element : Home
    },
    {
        path : '/addProduct',
        element : ProductForm
    },
    {
        path : '/addProduct/:id',
        element : ProductForm
    },
    {
        path : '/single-product/:id',
        element : SingleProduct
    },
    {
        path : '*',
        element : Error
    },
]

export default Routing