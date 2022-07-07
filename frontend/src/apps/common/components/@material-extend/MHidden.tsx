// material
import { Theme, useMediaQuery, Breakpoint } from "@mui/material";

// --------------------------------------------------------------

interface PropTypes {
  width:
    | "xsDown"
    | "smDown"
    | "mdDown"
    | "lgDown"
    | "xlDown"
    | "xsUp"
    | "smUp"
    | "mdUp"
    | "lgUp"
    | "xlUp";
  children: JSX.Element;
}

export default function MHidden({ width, children }: PropTypes) {
  const breakpoint = width.substring(0, 2) as Breakpoint;

  const hiddenUp = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up(breakpoint)
  );
  const hiddenDown = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(breakpoint)
  );

  if (width.includes("Down")) {
    return hiddenDown ? null : children;
  }

  if (width.includes("Up")) {
    return hiddenUp ? null : children;
  }

  return null;
}
