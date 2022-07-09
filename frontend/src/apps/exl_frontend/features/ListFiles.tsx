import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//
import {
    Box,
    Container,
    Grid,
    IconButton,
    Skeleton,
    Typography,
} from "@mui/material";
//
import { Icon } from "@iconify/react";
import addIcon from "@iconify/icons-eva/plus-fill";
//
import Page from "apps/common/components/Page";
import FileListItem from "apps/exl_frontend/components/FileListItem";
// import useItemStore from "apps/exl_frontend/stores/itemsStore";
import useFileStore from "apps/exl_frontend/stores/fileStore";

export function ListFiles() {
    const [{ files }, { fetchAllFiles }] = useFileStore();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        async function getAllFiles() {
            await fetchAllFiles();
        }
        // async function getAllItems() {
            //     await fetchAllItems();
            // }
            setLoading(false);
            getAllFiles();
            // getAllItems();
        }, []);
        console.log(files);
        return (
        <Page title="All Files">
            <Container maxWidth="xl">
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={10} md={10}>
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
                            <Typography variant="h4">
                                {loading ? <Skeleton height={60} /> : "Items"}
                            </Typography>
                            <IconButton
                                onClick={() => {
                                    navigate("/items/add");
                                }}
                            >
                                <Icon icon={addIcon} color="#46C084" height={30} />
                            </IconButton>
                        </Box>
                    </Grid>
                    {loading ? (
                        <Grid item xs={12} sm={10} md={10}>
                            <Skeleton variant="rectangular" height={80} width={80} />
                        </Grid>
                    ) : (
                        <Grid item xs={12} sm={10} md={10} spacing={2}>
                            {files.length === 0 && (
                                <Typography variant="h2">All empty here</Typography>
                            )}
                            {files.map((file) => (
                                <FileListItem key={file.id} file={file} />
                            ))}
                        </Grid>
                    )}
                </Grid>
            </Container>
        </Page>
    );
}
