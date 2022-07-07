import React from "react";

// material
import { Popover, SxProps, Theme } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

// ----------------------------------------------------------------------

const ArrowStyle = styled("span")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    top: -7,
    zIndex: 1,
    width: 12,
    right: 20,
    height: 12,
    content: "''",
    position: "absolute",
    borderRadius: "0 0 4px 0",
    transform: "rotate(-135deg)",
    background: theme.palette.background.paper,
    borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
    borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
  },
}));

// ----------------------------------------------------------------------

interface PropTypes {
  children: React.ReactNode;
  sx: SxProps<Theme>;
  open: boolean;
  onClose?: React.ReactEventHandler<{}>;
  anchorEl?: Element | null;
}

export default function MenuPopover({
  children,
  sx,
  open,
  onClose,
  anchorEl,
}: PropTypes) {
  return (
    <Popover
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      PaperProps={{
        sx: {
          mt: 1.5,
          ml: 0.5,
          overflow: "inherit",
          boxShadow: (theme) => theme.shadows[19],
          border: (theme) => `solid 1px ${theme.palette.grey[500]}`,
          width: 200,
          ...sx,
        },
      }}
    >
      <ArrowStyle className="arrow" />

      {children}
    </Popover>
  );
}
