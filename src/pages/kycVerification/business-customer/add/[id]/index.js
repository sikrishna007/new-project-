import {GuestGuard} from "@/guards/guest-guard";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import {RouterLink} from "@/components/router-link";
import {paths} from "@/paths";
import SvgIcon from "@mui/material/SvgIcon";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import {SeverityPill} from "@/components/severity-pill";
import Stack from "@mui/material/Stack";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import React, {useRef, useState} from "react";
import {endpoints} from "@/endpoints";
import TextField from "@mui/material/TextField";
import {useFormik} from "formik";
import * as Yup from "yup";
import {InputLabel} from "@mui/material";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import {Seo} from "@/components/seo";
import {Toast} from "next/dist/client/components/react-dev-overlay/internal/components/Toast";
import toast from "react-hot-toast";
const Page = ({customer}) =>{
    const fileInputRef = useRef(null);
    const [selectedPanName, setSelectedPanName] = useState(null);
    const [selectedGstName, setSelectedgstName] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileSize = file.size / 1024; // in KB
            if (fileSize <= 300) {
                setSelectedPanName(file.name);
                // File is less than or equal to 300KB
                // Process the file here
            } else {
                toast.error("File size exceeds 300KB", {position: 'top-right', autoClose: 10000 });
            }
        }
    };

    const handleChooseFileClick = () => {
        fileInputRef.current.click();
    };
    const formik = useFormik({
        initialValues: {
            panNumber: "",
            gstNumber:"",
        },
        validationSchema:Yup.object({
            panNumber: Yup.string().matches(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/, 'Must be a valid PAN Number'),
            gstNumber:Yup.string().matches(/^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zuyA-Z]{1}[1-9a-zA-Z]{1}Z[0-9a-zA-Z]{1}$/, "Must be a valid GST Number")
        }),
        onSubmit: null,
    })
    return (
        <>
            <Seo title="Create Kyc"/>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="lg">
                    <Stack spacing={4}>
                        <Stack spacing={4}>
                            <div
                                style={{
                                    alignItems: "center",
                                    display: "flex",
                                }}
                            >
                                <Typography variant="h3">Business Customer</Typography>

                            </div>
                        </Stack>
                        <Card sx={{marginTop: "3%"}}>
                            <CardHeader title="PAN Information"/>
                            <CardContent>
                                <Grid
                                    container
                                    rowSpacing={1}
                                    columnSpacing={{ xs: 1, sm: 2, md: 6 }}
                                >
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            error={!!(formik.touched.panNumber && formik.errors.panNumber)}
                                            fullWidth
                                            helperText={formik.touched.panNumber && formik.errors.panNumber}
                                            label="PAN Number"
                                            name="panNumber"
                                            onBlur={formik.handleBlur}
                                            onChange={(e) => formik.handleChange(e, e.target.value.toUpperCase())}
                                            value={formik.values.panNumber.toUpperCase()}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <div style={{ display: 'flex', alignItems: 'stretch', width: '600px' }}>
                                            <Typography variant="body1" sx={{ border: '1px solid #ccc', borderRadius: '5px 0 0 5px', padding: '0.87rem', maxWidth: '20rem' }}>
                                                {selectedPanName && `${selectedPanName}`}
                                            </Typography>
                                            <Input
                                                id="file-input"
                                                type="file"
                                                accept=".pdf,.png,.jpg"
                                                onChange={handleFileChange}
                                                style={{ display: 'none' }}
                                                inputRef={fileInputRef}
                                            />
                                            <Button
                                                sx={{ marginRight: 0, borderRadius: '0 5px 5px 0', padding: '0.8rem' }}
                                                variant="contained"
                                                color="primary"
                                                onClick={handleChooseFileClick}
                                            >
                                                Choose File
                                            </Button>
                                        </div>
                                    </Grid>


                                </Grid>
                            </CardContent>
                        </Card>
                        <Card sx={{marginTop: "3%"}}>
                            <CardHeader title="GST Information"/>
                            <CardContent>
                                <Grid
                                    container
                                    rowSpacing={1}
                                    columnSpacing={{ xs: 1, sm: 2, md: 6 }}
                                >
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            error={!!(formik.touched.gstNumber && formik.errors.gstNumber)}
                                            fullWidth
                                            helperText={formik.touched.gstNumber && formik.errors.gstNumber}
                                            label="PAN Number"
                                            name="gstNumber"
                                            onBlur={formik.handleBlur}
                                            onChange={(e) => formik.handleChange(e, e.target.value.toUpperCase())}
                                            value={formik.values.gstNumber.toUpperCase()}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <div style={{ display: 'flex', alignItems: 'stretch', width: '600px' }}>
                                            <Typography variant="body1" sx={{ border: '1px solid #ccc', borderRadius: '5px 0 0 5px', padding: '0.87rem', maxWidth: '20rem' }}>
                                                {selectedGstName && `${selectedGstName}`}
                                            </Typography>
                                            <Input
                                                id="gst-input"
                                                type="file"
                                                accept=".pdf,.png,.jpg"
                                                onChange={handleFileChange}
                                                style={{ display: 'none' }}
                                                inputRef={fileInputRef}
                                            />
                                            <Button
                                                sx={{ marginRight: 0, borderRadius: '0 5px 5px 0', padding: '0.8rem' }}
                                                variant="contained"
                                                color="primary"
                                                onClick={handleChooseFileClick}
                                            >
                                                Choose File
                                            </Button>
                                        </div>
                                    </Grid>


                                </Grid>
                            </CardContent>
                        </Card>
                    </Stack>
                </Container>
            </Box>
        </>
    );

}
Page.getLayout = (page) => (
    <GuestGuard>
        {page}
    </GuestGuard>
);

export const getServerSideProps = async (context) => {
    const token = context.req.cookies.accessToken;
    const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
        endpoints.userManagement.customers.index +
        "/" +"7111321576066252800"
        ,
        {
            headers: {
                Authorization: `Bearer ${context.params.id}`,
            },
        }
    );
    if (!res.ok) {
        return {
            props: {
                customer: {},

            },
        };
    }
    const {data} = await res.json();
    return {
        props: {
            customer: data[0],
        },
    };
};
export default Page;