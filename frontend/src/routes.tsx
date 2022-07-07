import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
// layouts
import LogoOnlyLayout from "apps/layouts/LogoOnlyLayout";
import DashboardLayout from "apps/layouts/dashboard";
import { Login, Register } from 'apps/users';
//
import Page404 from "apps/common/features/Page404";
import { RequireAuth } from "apps/common/utils/RequireAuth";
import { ItemsList } from "apps/exl_frontend/features/ItemList";
import { ItemsAdd } from "apps/exl_frontend/features/ItemsAdd";
import { ItemDetails } from "apps/exl_frontend/features/ItemDetails";
import { FileUpload } from "apps/exl_frontend/features/FileUpload";

// ----------------------------------------------------------------------

export default function Routes() {
  return useRoutes([
    {
      path: "/files",
      element: <RequireAuth redirectTo="/login"><DashboardLayout /></RequireAuth>,
      children: [
        { path: "upload", element: <FileUpload /> }
      ]
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Register /> },
        { path: "404", element: <Page404 /> },
        { path: "/", element: <Navigate to="/files/upload" /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
  ]);
}
