import React from "react";
import { useNavigate } from "react-router-dom";
// material
import { Card, CardHeader, Box, Stack, CardActionArea, Typography } from "@mui/material";
import { File } from "apps/exl_frontend/models/file";
// ----------------------------------------------------------------------

interface FileListItemProps {
    file: File;
}

export default function ApplicationListItem({ file }: FileListItemProps) {
    const navigate = useNavigate();
    return (
        <Card sx={{ p: 1, mb: 2, mt: 2 }}>

            {/* <CardActionArea
                // onClick={() => {
                //     navigate(`/items/${item?.id}`);
                // }}
            >
                <CardHeader title={file.id} sx={{ color: "#46C084" }} />
            </CardActionArea> */}
            <Box sx={{ p: 3, pb: 2 }} dir="ltr">
                <Stack spacing={3}>{ file.file_s3 }</Stack>
                {/* <Typography variant="subtitle1">{file.file_s3}</Typography> */}
            </Box>
        </Card>
    );
}
