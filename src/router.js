import {createBrowserRouter } from "react-router-dom";


/* Pages */
import CreateCategory from "features/Category/pages/Create"
import ShowCategory from "features/Category/pages/Show"
import UpdateCategory from "features/Category/pages/Update"
import ListCategory from "features/Category/pages/List"

/* Layouts */
import UserLayout from 'layouts/UserLayout'

const router = createBrowserRouter([
    {
        path:'/',
        element:<UserLayout></UserLayout>,
        children:[
            {
                index:true,
                element:<h1> Home </h1>
            },
            {
                path:"categories",
                children:[
                    {
                       index:true,
                        element:<ListCategory></ListCategory>
                    },
                    {
                        path:"create",
                        element:<CreateCategory></CreateCategory>
                    },
                    {
                        path:":id/show",
                        element:<ShowCategory></ShowCategory>
                    },
                    {
                        path:":id/update",
                        element:<UpdateCategory></UpdateCategory>
                    },
                ]
            },
            
        ]
    }
])

export default router 