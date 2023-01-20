import React, {lazy, StrictMode} from 'react'

import {createRoot} from "react-dom/client";
import 'virtual:windi.css'
import '@styles/common.css'
import '@lib/dayjs'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";

// 懒加载路由
const App = lazy(() => import('@containers/app'))

const rootEl = document.getElementById('root')
const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App/>,
            children: [
                {}
            ]
        },
        {
            path: "/settings",
            element: <h1>Settings</h1>,
        },
        {
            path: "/auth",
            element: <h1>Auth</h1>,
        },
        {
            path: "*",
            element: <Navigate to="/" replace/>,
        }
    ]
)

const AppInstance = (
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
)

const root = createRoot(rootEl!)
root.render(AppInstance)
