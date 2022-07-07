import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Skeleton,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Container } from "@mui/system";
import { Link as RouterLink, useNavigate } from "react-router-dom";
//
import { Icon } from "@iconify/react";
import arrowFill from "@iconify/icons-eva/arrow-back-fill";
//
import Page from "apps/common/components/Page";
import useItemStore from "apps/exl_frontend/stores/itemsStore";

export function ItemsAdd() {
  const navigate = useNavigate();

  const [_, { addItem }] = useItemStore();

  const [loading, setLoading] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  return (
    <Page title="Item Details">
      <Container maxWidth="xl">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={10} md={10}>
            <Box sx={{ pt: 2 }}>
              <Button variant="text" component={RouterLink} to="/items/all">
                <Icon icon={arrowFill} color="#46C084" height={30} />
                Back to items
              </Button>
            </Box>
            <Box sx={{ pt: 2, pl: 1 }}>
              <Typography variant="h4">Add an Item</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={10} md={10}>
            {loading ? (
              <Skeleton variant="rectangular" height={200} />
            ) : (
              <Card>
                <CardContent>
                  <TextField
                    sx={{ p: 1, m: 1 }}
                    id="item-name"
                    label="Item Name"
                    value={itemName}
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setItemName(e.target.value)}
                  />
                  <TextField
                    sx={{ p: 1, m: 1 }}
                    id="item-description"
                    label="Item Description"
                    value={itemDescription}
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setItemDescription(e.target.value)}
                  />
                  <Button
                    sx={{ p: 1, m: 1, ml: 2 }}
                    variant="contained"
                    onClick={async () => {
                      setLoading(true);
                      await addItem({
                        name: itemName,
                        description: itemDescription,
                      });
                      setLoading(false);
                      navigate("/items/all");
                    }}
                  >
                    {loading ? <CircularProgress /> : "Save"}
                  </Button>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
