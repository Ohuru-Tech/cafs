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
import useFileStore from "apps/exl_frontend/stores/fileStore";

function getUploadType(bucketType: string) {
    switch (bucketType) {
        case 'AWS':
            return 's3';
        case 'Azure':
            return 'azure';
        case 'GCP':
            return 'gcloud';
        default:
            return '';
    }
}

export function FileUpload() {
    const navigate = useNavigate();

    const [{ }, { }] = useFileStore();
    const [selectedFile, setSelectedFile] = useState<File>();
    const [loading, setLoading] = useState(false);
    const [bucketType, setBucketType] = useState('Local');
    const [fileUploadLink, setFileUploadLink] = useState<any>({});

    return (
        <Page title="Item Details">
            <Container maxWidth="xl">
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={10} md={10}>
                        <Box sx={{ pt: 2 }}>
                            <Button variant="text" component={RouterLink} to="/files/all">
                                <Icon icon={arrowFill} color="#46C084" height={30} />
                                Back to Files
                            </Button>
                        </Box>
                        <Box sx={{ pt: 2, pl: 1 }}>
                            <Typography variant="h4">Upload a File</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={10} md={10}>
                        {loading ? (
                            <Skeleton variant="rectangular" height={200} />
                        ) : (
                            <Card>
                                <CardContent>
                                    <Button
                                        variant="contained"
                                        component="label"
                                    >
                                        Select File
                                        <input type="file" hidden
                                            onChange={(event) => setSelectedFile(event.target.files![0])}
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
                                        sx={{ p: 1, ml: 1, mb: 3 }}
                                        variant="contained"
                                        component="label"
                                        onClick={async () => {

                                            const myFormData = new FormData();
                                            myFormData.append(`file_${getUploadType(bucketType)}`, selectedFile as Blob, selectedFile!.name)

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
                                                    // console.log(JSON.stringify(response.data));
                                                    setFileUploadLink(response.data)
                                                })
                                                .catch(function (error) {
                                                    console.log(error);
                                                });
                                        }}
                                    >Upload</Button>
                                    {fileUploadLink.id && <Button
                                        sx={{ p: 1, m: 1 }}
                                        variant="contained"
                                        onClick={() => window.open(fileUploadLink.file || fileUploadLink.file_s3 || fileUploadLink.file_azure || fileUploadLink.file_gcloud)}
                                        component="label">Open File</Button>}


                                </CardContent>
                            </Card>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}
