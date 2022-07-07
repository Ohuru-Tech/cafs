import React from "react";
import { Helmet } from "react-helmet-async";
import { forwardRef } from "react";
// material
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

interface PropType {
  children: React.ReactNode;
  title: string;
}

const Page = forwardRef(({ children, title = "", ...other }: PropType, ref) => (
  <Box ref={ref} {...other}>
    <title>{title}</title>
    {children}
  </Box>
));

export default Page;
