import React, { useState, useEffect } from "react";
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
// import axios from 'axios';
//
import { Icon } from "@iconify/react";
import arrowFill from "@iconify/icons-eva/arrow-back-fill";
//
import Page from "apps/common/components/Page";
import useItemStore from "apps/exl_frontend/stores/itemsStore";
import { toast } from "react-toastify";
import { successToastConfig, errorToastConfig } from "../../common/utils/general/configs";
import axios from 'apps/common/utils/axios/defaults'

interface iConn {
    azure_connection: {
        account_name: string;
        account_key: string;
        container_name: string;
    },
    s3_connection: {
        bucket_name: string;
        access_key: string;
        secret_key: string;
    },
    gcp_connection: {
        bucket_name: string;
        connection_json: string;
    };
}

export function NewConnection() {
    const navigate = useNavigate();

    const [_, { addItem }] = useItemStore();
    const [selectedFile, setSelectedFile] = useState<File>();
    const [loading, setLoading] = useState(false);
    const [connExists, setConnExists] = useState<boolean>(false);
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [conn, setConn] = useState<iConn>({
        azure_connection: {
            account_name: '',
            account_key: '',
            container_name: '',
        },
        s3_connection: {
            bucket_name: '',
            access_key: '',
            secret_key: '',
        },
        gcp_connection: {
            bucket_name: '',
            connection_json: ''
        }
    });
    console.log(conn)

    const getDefaultConnection = async () => {
        setConnExists(false);
        const config = {
            method: 'get',
            url: 'http://localhost:8000/api/v1/connections/1',
            headers: {
                'Authorization': authHeaders(),
            }
        };

        setLoading(true);
        let conn = await axios(config);
        if (!(conn.data.azure_connection && conn.data.s3_connection)) {
            setConnExists(true);
        }
        console.log(conn.data);
        setConn(conn.data);
        setLoading(false);
    }

    useEffect(() => {
        getDefaultConnection();
    }, [])

    return (
        <Page title="Item Details">
            <Container maxWidth="xl">
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={10} md={10}>
                        <Box sx={{ pt: 2 }}>
                            <Button variant="text" component={RouterLink} to="/connections/new">
                                <Icon icon={arrowFill} color="#46C084" height={30} />
                                Back to Connections
                            </Button>
                        </Box>
                        <Box sx={{ pt: 2, pl: 1 }}>
                            <Typography variant="h4">New Connection</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={10} md={10}>
                        {loading ? (
                            <Skeleton variant="rectangular" height={200} />
                        ) : (
                            <Card>
                                <CardContent>
                                    {connExists ? <>
                                        <Typography variant="h5">A user can have only 1 connection</Typography>

                                    </> : <>
                                        <Typography variant="h5">Azure</Typography>

                                        <TextField
                                            sx={{ p: 1, m: 1 }}
                                            id="item-name"
                                            label="Account Name"
                                            value={conn.azure_connection.account_name}
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e) => {
                                                let tempConn = { ...conn };
                                                tempConn.azure_connection.account_name = e.target.value;
                                                setConn(tempConn);
                                            }}
                                        /> <TextField
                                            sx={{ p: 1, m: 1 }}
                                            id="item-name"
                                            label="Account Key"
                                            value={conn.azure_connection.account_key}
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e) => {
                                                let tempConn = { ...conn };
                                                tempConn.azure_connection.account_key = e.target.value;
                                                setConn(tempConn);
                                            }}
                                        /> <TextField
                                            sx={{ p: 1, m: 1 }}
                                            id="item-name"
                                            label="Container Name"
                                            value={conn.azure_connection.container_name}
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e) => {
                                                let tempConn = { ...conn };
                                                tempConn.azure_connection.container_name = e.target.value;
                                                setConn(tempConn);
                                            }}
                                        />
                                        <Typography variant="h5">AWS</Typography>

                                        <TextField
                                            sx={{ p: 1, m: 1 }}
                                            id="item-name"
                                            label="Bucket Name"
                                            value={conn.s3_connection.bucket_name}
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e) => {
                                                let tempConn = { ...conn };
                                                tempConn.s3_connection.bucket_name = e.target.value;
                                                setConn(tempConn);
                                            }}
                                        /> <TextField
                                            sx={{ p: 1, m: 1 }}
                                            id="item-name"
                                            label="Secret Key"
                                            value={conn.s3_connection.secret_key}
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e) => {
                                                let tempConn = { ...conn };
                                                tempConn.s3_connection.secret_key = e.target.value;
                                                setConn(tempConn);
                                            }}
                                        /> <TextField
                                            sx={{ p: 1, m: 1 }}
                                            id="item-name"
                                            label="Access Key"
                                            value={conn.s3_connection.access_key}
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e) => {
                                                let tempConn = { ...conn };
                                                tempConn.s3_connection.access_key = e.target.value;
                                                setConn(tempConn);
                                            }}
                                        />
                                        <Typography variant="h5">GCP</Typography>
                                                <TextField
                                                    sx={{ p: 1, m: 1 }}
                                                    id="item-name"
                                                    label="Bucket Name"
                                                    value={conn.gcp_connection.bucket_name}
                                                    fullWidth
                                                    variant="outlined"
                                                    onChange={(e) => {
                                                        let tempConn = { ...conn };
                                                        tempConn.gcp_connection.bucket_name = e.target.value;
                                                        setConn(tempConn);
                                                    }}
                                                />
                                                <TextField
                                                    sx={{ p: 1, m: 1 }}
                                                    id="item-name"
                                                    label="Connection Properties"
                                                    value={conn.gcp_connection.connection_json}
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                    variant="outlined"
                                                    onChange={(e) => {
                                                        let tempConn = { ...conn };
                                                        tempConn.gcp_connection.connection_json = e.target.value;
                                                        setConn(tempConn);
                                                    }}
                                                />

                                        <Button
                                            sx={{ p: 1, m: 1, ml: 2 }}
                                            variant="contained"
                                            onClick={async () => {
                                                setLoading(true);
                                                var config = {
                                                    method: 'post',
                                                    url: 'http://localhost:8000/api/v1/connections/',
                                                    headers: {
                                                        'Authorization': authHeaders(),
                                                        'Content-Type': 'application/json'
                                                    },
                                                    data: conn
                                                };
                                                try {
                                                    let data = await axios(config)
                                                    toast.success('Connection created successfully', successToastConfig)

                                                }
                                                catch (e) {
                                                    console.log(e);
                                                    toast.error('Connection already exists', errorToastConfig)
                                                }
                                                finally {
                                                    setLoading(false);
                                                }
                                                // navigate("/items/all");
                                            }}
                                        >
                                            {loading ? <CircularProgress /> : "Save"}
                                        </Button>
                                    </>}
                                </CardContent>
                            </Card>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}
