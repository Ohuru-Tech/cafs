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
import axios from 'axios';
//
import { Icon } from "@iconify/react";
import arrowFill from "@iconify/icons-eva/arrow-back-fill";
//
import Page from "apps/common/components/Page";
import useItemStore from "apps/exl_frontend/stores/itemsStore";

function getUploadType(bucketType: string) {
    switch (bucketType) {
        case 'AWS':
            return '_s3';
        case 'Azure':
            return '_azure';
        case 'GCP':
            return '_gcloud';
        default:
            return '';
    }
}

export function DeleteConnection() {
    const navigate = useNavigate();

    const [_, { addItem }] = useItemStore();
    const [selectedFile, setSelectedFile] = useState<File>();
    const [loading, setLoading] = useState(false);
    const [bucketType, setBucketType] = useState('Local');
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    let fileData;

    return (
        <Page title="Item Details">
            <Container maxWidth="xl">
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={10} md={10}>
                        <Box sx={{ pt: 2 }}>
                            <Button variant="text" component={RouterLink} to="/items/all">
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
                                    {/* <TextField
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
                                    /> */}
                                    <Button
                                        variant="contained"
                                        component="label"
                                    >
                                        Select File
                                        <input type="file" hidden
                                            onChange={(event) => {
                                                setSelectedFile(event.target.files![0])

                                                // let reader = new FileReader();
                                                // reader.readAsArrayBuffer(event.target.files![0]);
                                                // reader.addEventListener('load', (e) => {
                                                //     fileData = e.target!.result;
                                                //     console.log(fileData)
                                                // });

                                            }}
                                        />
                                    </Button>
                                    <Typography sx={{ p: 1, m: 1 }} variant="subtitle1" component='span'>{selectedFile?.name}</Typography>
                                    <br />
                                    <br />
                                    <Select
                                        value={bucketType}
                                        onChange={(e) => setBucketType(e.target.value)}
                                        label="Bucket Type"
                                    >
                                        <MenuItem value="Local">
                                            Local
                                        </MenuItem>
                                        <MenuItem value={'AWS'}>AWS</MenuItem>
                                        <MenuItem value={'Azure'}>Azure</MenuItem>
                                    </Select>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        onClick={() => {

                                            const myFormData = new FormData();
                                            myFormData.append(`file${getUploadType(bucketType)}`, selectedFile as Blob, selectedFile!.name)

                                            var config = {
                                                method: 'post',
                                                url: 'http://localhost:8000/api/v1/files/',
                                                headers: {
                                                    'Authorization': authHeaders(),

                                                    'Content-Type': 'multipart/form-data'
                                                },
                                                data: myFormData
                                            };
                                            axios(config)
                                                .then(function (response) {
                                                    console.log(JSON.stringify(response.data));
                                                })
                                                .catch(function (error) {
                                                    console.log(error);
                                                });

                                        }}
                                    >Upload</Button>
                                    {/* <Button
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
                                    </Button> */}
                                </CardContent>
                            </Card>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}
