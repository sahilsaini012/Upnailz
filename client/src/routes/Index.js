import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Public } from './Public';
import { useAuth } from '../context/AuthContext';
import { ProtectedRoutes } from './ProtectedRoutes';


const Routes = () => {
    const {isLoggedIn}=useAuth();
    const PublicRoutes=()=>{
        if(isLoggedIn){
            return ProtectedRoutes;
        }
       return Public;
    }
    return <RouterProvider router={createBrowserRouter(PublicRoutes())} />;
};

export default Routes;
