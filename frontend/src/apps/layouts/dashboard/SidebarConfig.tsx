import React from "react";
import { Icon, IconifyIcon } from "@iconify/react";
import layersFill from "@iconify/icons-eva/layers-fill";

// ----------------------------------------------------------------------

const getIcon = (name: IconifyIcon) => (
  <Icon icon={name} width={22} height={22} />
);

const sidebarConfig = [
  {
    title: "items",
    path: "/items",
    children: [
      {
        title: "All Items",
        path: "/items/all",
      },
      {
        title: "Add items",
        path: "/items/add",
      },
    ],
    icon: getIcon(layersFill),
  },
  {
    title: "Files",
    path: "/files",
    children: [
      // {
      //   title: "View all files",
      //   path: "/files/all",
      // },
      {
        title: "Upload File",
        path: "/files/upload",
      },
    ],
    icon: getIcon(layersFill),
  },
];

export default sidebarConfig;
