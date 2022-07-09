import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
// layouts
import LogoOnlyLayout from "apps/layouts/LogoOnlyLayout";
import DashboardLayout from "apps/layouts/dashboard";
import { Login, Register } from 'apps/users';
//
import Page404 from "apps/common/features/Page404";
import { RequireAuth } from "apps/common/utils/RequireAuth";

import {
  ItemsList,
  ItemsAdd,
  ItemDetails,
  NewConnection,
  FileUpload,
  GetConnection,
  DeleteConnection, 
  UpdateConnection,
  ListFiles,
  DeleteFile
} from "apps/exl_frontend/features";

// ----------------------------------------------------------------------

export default function Routes() {
  return useRoutes([
    {
      path: "/files",
      element: <RequireAuth redirectTo="/login"><DashboardLayout /></RequireAuth>,
      children: [
        { path: "upload", element: <FileUpload /> },
        { path: "all", element: <ListFiles /> },
        { path: "delete", element: <DeleteFile /> }
      ]
    },
    {
      path: "/connections",
      element: <RequireAuth redirectTo="/login"><DashboardLayout /></RequireAuth>,
      children: [
        { path: "new", element: <NewConnection /> },
        { path: "get", element: <GetConnection /> },
        { path: "update", element: <UpdateConnection /> },
        { path: "delete", element: <DeleteConnection /> }
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
