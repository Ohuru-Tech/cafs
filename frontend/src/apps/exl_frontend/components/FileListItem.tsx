import React from "react";
import { useNavigate } from "react-router-dom";
// material
import { Card, CardHeader, Box, Stack, CardActionArea, Typography, Button } from "@mui/material";
import { File } from "apps/exl_frontend/models/file";
// ----------------------------------------------------------------------
import useFileStore from "apps/exl_frontend/stores/fileStore";
import DeleteIcon from '@mui/icons-material/Delete';
interface FileListItemProps {
    file: File;
}

function getFileLink(file: File) {
    return file.file_azure || file.file_s3 || file.file_gcloud || file.file;
}

function getFileName(path: string) {
    if (!path)
        return;
    return path.substring(path.lastIndexOf("/") + 1, (path.indexOf("?", 1) !== -1 ? path.indexOf("?", 1) : path.length));
}

export default function ApplicationListItem({ file }: FileListItemProps) {
    const [{ }, { deleteFile, fetchAllFiles }] = useFileStore();
    const navigate = useNavigate();
    return (
        <Card sx={{ p: 1, mb: 2, mt: 2 }}>

            <Stack direction="row" spacing={2}>
                <CardActionArea
                    onClick={() => window.open(getFileLink(file))}
                >
                    <CardHeader title={decodeURI(getFileName(file.file_azure || file.file_s3 || file.file_gcloud || file.file) || ' ')} />
                </CardActionArea>
                <Button variant="contained" component="span"
                    
                    startIcon={<DeleteIcon />}
                    onClick={async () => {
                        console.log(file.id);
                        await deleteFile(file.id)
                        fetchAllFiles();
                    }}
                >Delete</Button>
            </Stack>


        </Card>
    );
}
