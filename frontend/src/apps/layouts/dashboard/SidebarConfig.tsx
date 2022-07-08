import React from "react";
import { Icon, IconifyIcon } from "@iconify/react";
import layersFill from "@iconify/icons-eva/layers-fill";

// ----------------------------------------------------------------------

const getIcon = (name: IconifyIcon) => (
  <Icon icon={name} width={22} height={22} />
);

const sidebarConfig = [
  {
    title: "Files",
    path: "/files",
    children: [
      {
        title: "Upload File",
        path: "/files/upload",
      },
    ],
    icon: getIcon(layersFill),
  },
];

export default sidebarConfig;
