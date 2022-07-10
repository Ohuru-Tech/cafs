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
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Container } from "@mui/system";
import { authHeaders } from "apps/common/utils//axios/authHeader";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// import NewFormData from 'form-data'
import axios from "axios";
//
import { Icon } from "@iconify/react";
import arrowFill from "@iconify/icons-eva/arrow-back-fill";
//
import Page from "apps/common/components/Page";
import useFileStore from "apps/exl_frontend/stores/fileStore";

export function DeleteConnection() {
  const navigate = useNavigate();

  const [_, { deleteConnection }] = useFileStore();
  const [selectedFile, setSelectedFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [bucketType, setBucketType] = useState("Local");
  const [connId, setConnId] = useState("");

  return (
    <Page title="Item Details">
      <Container maxWidth="xl">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={10} md={10}>
            <Box sx={{ pt: 2 }}>
              <Button
                variant="text"
                component={RouterLink}
                to="/connections/new"
              >
                <Icon icon={arrowFill} color="#46C084" height={30} />
                Back to Connections
              </Button>
            </Box>
            <Box sx={{ pt: 2, pl: 1 }}>
              <Typography variant="h4">Delete Connection</Typography>
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
                    label="Connection ID"
                    value={connId}
                    type="number"
                    fullWidth
                    variant="outlined"
                    onChange={(e) => setConnId(e.target.value)}
                  />
                  <Button
                    sx={{ p: 1, m: 1, ml: 2 }}
                    variant="contained"
                    onClick={async () => {
                      setLoading(true);
                      let x = await deleteConnection(
                        connId as unknown as number
                      );
                      setLoading(false);
                      navigate("/connections/new");
                    }}
                  >
                    {loading ? <CircularProgress /> : "Delete"}
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
