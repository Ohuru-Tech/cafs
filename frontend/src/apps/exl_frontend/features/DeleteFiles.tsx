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

//
import { Icon } from "@iconify/react";
import arrowFill from "@iconify/icons-eva/arrow-back-fill";
//
import Page from "apps/common/components/Page";
import useFileStore from "apps/exl_frontend/stores/fileStore";
import { toast } from "react-toastify";
import { successToastConfig } from "apps/common/utils/general/configs";



export function DeleteFile() {
    const navigate = useNavigate();
    const [{ }, { deleteFile }] = useFileStore();

    const [loading, setLoading] = useState(false);

    const [fileId, setFileId] = useState<number>(0);
    return (
        <Page title="Item Details">
            <Container maxWidth="xl">
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={10} md={10}>
                        <Box sx={{ pt: 2 }}>
                            <Button variant="text" component={RouterLink} to="/files/upload">
                                <Icon icon={arrowFill} color="#46C084" height={30} />
                                Back to Files
                            </Button>
                        </Box>
                        <Box sx={{ pt: 2, pl: 1 }}>
                            <Typography variant="h4">Delete Files</Typography>
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
                                        label="File ID"
                                        value={fileId}
                                        type="number"
                                        fullWidth
                                        variant="outlined"
                                        onChange={(e) => setFileId(e.target.value as unknown as number)}
                                    />
                                    <Button
                                        sx={{ p: 1, m: 1, ml: 2 }}
                                        variant="contained"
                                        onClick={async () => {
                                            setLoading(true);
                                            try {
                                                await deleteFile(fileId);
                                                navigate("/files/delete");
                                            }
                                            catch (e) {
                                                toast("Error deleting file", successToastConfig)
                                            }
                                            finally {
                                                setLoading(false);
                                            }
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
