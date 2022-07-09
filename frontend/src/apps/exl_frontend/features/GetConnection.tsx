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
    InputAdornment,
    IconButton, InputLabel,
    OutlinedInput, Accordion, AccordionSummary,
    AccordionDetails
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

interface iPassField {
    password: string;
    name: string
}

function PassField({ password, name }: iPassField) {
    const [showPass, setShowPass] = useState(false);
    return (
        <>
            <InputLabel htmlFor="outlined-adornment-password">{name}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPass ? 'text' : 'password'}
                value={password}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={(event) => setShowPass(!showPass)}
                            onMouseDown={(event) => event.preventDefault()}
                            edge="end"
                        >
                            {showPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label={name}
            />
        </>
    )
}

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
    }
}

export function GetConnection() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [connid, setConnId] = useState("");
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
        }
    });

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
                            <Typography variant="h4">Get Connection</Typography>
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
                                        id="connection-id"
                                        label="Connection ID"
                                        value={connid}
                                        variant="outlined"
                                        onChange={(e) => setConnId(e.target.value)}
                                    />

                                    <Button
                                        sx={{ p: 1, m: 1, ml: 2 }}
                                        variant="contained"
                                        onClick={async () => {

                                            const config = {
                                                method: 'get',
                                                url: `http://localhost:8000/api/v1/connections/${connid}`,
                                                headers: {
                                                    'Authorization': authHeaders(),
                                                }
                                            };

                                            setLoading(true);
                                            let conn = await axios(config);
                                            console.log(conn.data);
                                            setConn(conn.data);
                                            // await addItem({
                                            //     name: itemName,
                                            //     description: itemDescription,
                                            // });
                                            setLoading(false);
                                            // navigate("/items/all");
                                        }}
                                    >
                                        {loading ? <CircularProgress /> : "Get"}
                                    </Button>
                                    {conn && (
                                        <Box sx={{ pt: 2, pl: 1 }}>
                                            <Accordion sx={{ pt: 2, pl: 1 }}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel2a-content"
                                                    id="panel2a-header"
                                                >
                                                    <Typography>Azure</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <PassField name="Account Name" password={conn.azure_connection.account_name} />
                                                    <PassField name="Account Key" password={conn.azure_connection.account_key} />
                                                    <PassField name="Container Name" password={conn.azure_connection.container_name} />
                                                </AccordionDetails>
                                            </Accordion>

                                            <Accordion sx={{ pt: 2, pl: 1 }}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel2a-content"
                                                    id="panel2a-header"
                                                >
                                                    <Typography>AWS</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <PassField name="Access Key" password={conn.s3_connection.access_key} />
                                                    <PassField name="Secret Key" password={conn.s3_connection.secret_key} />
                                                    <PassField name="Bucket Name" password={conn.s3_connection.bucket_name} />
                                                </AccordionDetails>
                                            </Accordion>

                                        </Box>
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
