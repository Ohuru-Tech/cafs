import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Skeleton,
  TextField,
  Typography,
  useTheme,
  Container,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  CircularProgress
} from "@mui/material";
import { useParams, Link as RouterLink, useNavigate } from "react-router-dom";
//
import { Icon } from "@iconify/react";
import arrowFill from "@iconify/icons-eva/arrow-back-fill";
import editIcon from "@iconify/icons-eva/edit-2-fill";
//
import Page from "apps/common/components/Page";
import useItemStore from "apps/exl_frontend/stores/itemsStore";

export function ItemDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const itemId = parseInt(params.id as string);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [{ selectedItem }, { fetchItem, setItemId, updateItem, deleteItem }] =
    useItemStore();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [confirmDeleteActive, setConfirmDeleteActive] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [updating, setUpdating] = useState(false);

  const switchEditingMode = () => {
    setEditing(!editing);
    if (!editing) {
      setItemName(selectedItem.name);
      setItemDescription(selectedItem.description);
    }
  };

  const openConfirmDelete = () => {
    setConfirmDeleteActive(true);
  };
  const closeConfirmDelete = () => {
    setConfirmDeleteActive(false);
  };
  const handleDelete = async () => {
    await deleteItem();
    navigate("/items/all");
  };

  const confirmDeleteDialog = () => {
    return (
      <Dialog
        fullScreen={fullScreen}
        open={confirmDeleteActive}
        onClose={closeConfirmDelete}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure you want to delete?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This cannot be undone, if you delete the item, it will be gone
            forever.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={closeConfirmDelete}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            autoFocus
          >
            Yes, delete it
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  useEffect(() => {
    async function getItem() {
      await setItemId(itemId);
      await fetchItem();
      setLoading(false);
    }
    getItem();
  }, [itemId]);

  return (
    <Page title="Item Details">
      {confirmDeleteDialog()}
      <Container maxWidth="xl">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={10} md={10}>
            <Box sx={{  pt: 2 }}>
              <Button variant="text" component={RouterLink} to="/items/all">
                <Icon icon={arrowFill} color="#46C084" height={30} />
                Back to items
              </Button>
            </Box>
            <Box sx={{ pt: 2, pl: 1 }}>
              <Typography variant="h4">
                {loading ? <Skeleton height={60} /> : "Item Details"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={10} md={10}>
            {loading ? (
              <Skeleton variant="rectangular" height={200} />
            ) : (
              <Card>
                <CardContent>
                  {editing ? (
                    <>
                      <TextField
                        sx={{ p: 1, m: 1 }}
                        id={`item-${selectedItem.id}-name`}
                        label="Item Name"
                        value={itemName}
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setItemName(e.target.value)}
                      />
                      <TextField
                        sx={{ p: 1, m: 1 }}
                        id={`item-${selectedItem.id}-description`}
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
                          setUpdating(true);
                          await updateItem({
                            name: itemName,
                            description: itemDescription,
                          });
                          setUpdating(false);
                          setEditing(false);
                        }}
                      >
                        {updating ? <CircularProgress /> : "Save"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          p: 1,
                          m: 1,
                          bgcolor: "background.paper",
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant="h2">
                          {selectedItem.name}
                        </Typography>
                        <Box>
                          <IconButton onClick={switchEditingMode}>
                            <Icon icon={editIcon} color="#46C084" height={30} />
                          </IconButton>
                          <IconButton onClick={openConfirmDelete}>
                            <Icon
                              icon="ant-design:delete-filled"
                              color="red"
                              height={30}
                            />
                          </IconButton>
                        </Box>
                      </Box>
                      <Typography variant="body1" sx={{ p: 1, m: 1 }}>
                        {selectedItem.description}
                      </Typography>
                    </>
                  )}
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
