import React from "react";
import { Icon, IconifyIcon } from "@iconify/react";
import layersFill from "@iconify/icons-eva/layers-fill";

// ----------------------------------------------------------------------

const getIcon = (name: IconifyIcon) => (
  <Icon icon={name} width={22} height={22} />
);
interface iSidebarConfig {
  title: string;
  path: string;
  children: Array<{ title: string; path: string }>;
  icon: JSX.Element;
}

const sidebarConfig: iSidebarConfig[] = [
  {
    title: "Connections",
    path: "/connections",
    children: [
      {
        title: "New connection",
        path: "/connections/new",
      },
      // {
      //   title: "Get connection",
      //   path: "/connections/get"
      // },
      {
        title: "Update connection",
        path: "/connections/update",
      },
      // {
      //   title: "Delete connection",
      //   path: "/connections/delete"
      // }
    ],
    icon: getIcon(layersFill),
  },
  {
    title: "Files",
    path: "/files",
    children: [
      {
        title: "Upload File",
        path: "/files/upload",
      },
      {
        title: "List Files",
        path: "/files/all",
      },
    ],
    icon: getIcon(layersFill),
  },
];

export default sidebarConfig;
