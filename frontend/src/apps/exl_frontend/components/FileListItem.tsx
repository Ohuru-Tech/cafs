import React from "react";
import { useNavigate } from "react-router-dom";
// material
import { Card, CardHeader, Box, Stack, CardActionArea, Typography } from "@mui/material";
import { File } from "apps/exl_frontend/models/file";
// ----------------------------------------------------------------------

interface FileListItemProps {
    file: File;
}

function getFileLink(file: File) {
    return file.file_azure || file.file_s3 || file.file_gcloud || file.file;
}

export default function ApplicationListItem({ file }: FileListItemProps) {
    const navigate = useNavigate();
    return (
        <Card sx={{ p: 1, mb: 2, mt: 2 }}>

            <CardActionArea
                onClick={() => {
                    // navigate(`/items/${item?.id}`);
                    window.open(getFileLink(file));
                }}
            >
                <CardHeader title={`file: ${file.id} user:${file.user}`} sx={{ color: "#46C084" }} />
            </CardActionArea>
            
        </Card>
    );
}
