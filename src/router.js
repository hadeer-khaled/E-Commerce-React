import {createBrowserRouter } from "react-router-dom";


/* Pages */
import CreateCategory from "features/Category/pages/Create"
import ShowCategory from "features/Category/pages/Show"
import UpdateCategory from "features/Category/pages/Update"
import ListCategory from "features/Category/pages/List"

/* Layouts */
import UserLayout from 'layouts/UserLayout'
import Register from "features/Auth/pages/Register";

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
                path:'register',
                element:<Register></Register>
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
    },
    {
        path: '*',
        element: <h1>Not Found</h1>
    }
])

export default router 