import React from "react";
import { useNavigate } from "react-router-dom";
// material
import { Card, CardHeader, Box, Stack, CardActionArea } from "@mui/material";
import { Item } from "apps/exl_frontend/models/item";
// ----------------------------------------------------------------------

interface ItemListItemProps {
  item: Item;
}

export default function ApplicationListItem({ item }: ItemListItemProps) {
  const navigate = useNavigate();
  return (
    <Card sx={{ p: 1, mb: 2, mt: 2 }}>
      <CardActionArea
        onClick={() => {
          navigate(`/items/${item?.id}`);
        }}
      >
        <CardHeader title={item?.name} sx={{ color: "#46C084" }} />
      </CardActionArea>
      <Box sx={{ p: 3, pb: 2 }} dir="ltr">
        <Stack spacing={3}>{item.description}</Stack>
      </Box>
    </Card>
  );
}
