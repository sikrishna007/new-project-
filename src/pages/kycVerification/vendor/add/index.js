import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import React, {useRef, useState} from "react";
import {endpoints} from "@/endpoints";
import TextField from "@mui/material/TextField";
import {useFormik} from "formik";
import * as Yup from "yup";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import {Seo} from "@/components/seo";
import toast from "react-hot-toast";
import {Layout as DashboardLayout} from "@/layouts/admin-dashboard";
import CommonDialog from "@/custom-components/CommonDialog";
import {paths} from "@/paths";
import {useRouter} from "next/router";
import {ToastError} from "@/icons/ToastError";
import {multiFileUpload, patchMethod} from "@/utils/util";

const Page = ({vendor}) => {
    const panFileInputRef = useRef(null);  // Separate ref for PAN file input
    const gstFileInputRef = useRef(null);  // Separate ref for GST file input
    const [selectedPanName, setSelectedPanName] = useState(null);
    const [selectedGstName, setSelectedGstName] = useState(null);
    const [selectedPanFile, setSelectedPanFile] = useState(null);
    const [selectedGstFile, setSelectedGstFile] = useState(null);
    const [files, setFiles]=useState([])
    const [filesData,setFilesData] = useState([]);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [create, setCreate] = useState(false)
    let router = useRouter();
    const handleCreateDialogOpen = (value) => {
        setCreate(value)
        setCreateDialogOpen(true);
    };

    const handleCreateDialogClose = () => {
        setCreateDialogOpen(false);
    };

    const submitKyc = async (values) => {
        formik.setSubmitting(true); // Set form submission status to true

        const onUpload = async () => {
            try {
                const data = await multiFileUpload([selectedPanFile, selectedGstFile]);
                setFilesData(data);
                return data;
            } catch (error) {
                console.error("Error uploading files:", error);
                toast.error("Error uploading files. Please try again later.");
                return null;
            }
        };

        const filesData = await onUpload();

        if (filesData && Object.keys(formik.validateForm(values)).length === 0) {
            const path = endpoints.userManagement.vendors.index;
            const body = {
                user: {
                    panFile: {id: filesData[0].id},
                    gstFile: {id: filesData[1].id},
                    kycStatus: {
                        id: "7123313635396419580"
                    }
                }
            };

            try {
                const jsonString = JSON.stringify(body);
                const json = await patchMethod(vendor.id, jsonString, path);

                if (json.status === "Success") {
                    toast.success("Documents Uploaded Successfully");
                } else {
                    toast.error("Error uploading documents. Please try again later.");
                }
            } catch (error) {
                console.error("Error uploading documents:", error);
                toast.error("Error uploading documents. Please try again later.");
            }
        } else {
            toast.error("Please fill in all the required fields");
        }

        formik.setSubmitting(false); // Set form submission status back to false
    };

    const handleFileChangePan = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileSize = file.size / 1024; // in KB
            if (fileSize <= 300) {
                setSelectedPanName(file.name);
                setSelectedPanFile(file)
            } else {
                toast.error("File size exceeds 300KB", {position: 'top-right', autoClose: 10000});
            }
        }
    };
    const handleFileChangeGst = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileSize = file.size / 1024; // in KB
            if (fileSize <= 300) {
                setSelectedGstName(file.name);
                setSelectedGstFile(file)
            } else {
                toast.error("File size exceeds 300KB", {position: 'top-right', autoClose: 10000});
            }
        }
    };

    const handleChooseFileClickPan = () => {
        panFileInputRef.current.click();
    };

    const handleChooseFileClickGst = () => {
        gstFileInputRef.current.click();
    };

    const formik = useFormik({
        initialValues: {
            panNumber: vendor?.panNumber ? vendor.panNumber : "",
            gstNumber: vendor?.gstNumber ? vendor.gstNumber :"",
        },
        validationSchema: Yup.object({
            panNumber: Yup.string().matches(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/, 'Must be a valid PAN Number').required("Pan Number is required"),
            gstNumber: Yup.string().matches(/^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zuyA-Z]{1}[1-9a-zA-Z]{1}Z[0-9a-zA-Z]{1}$/, "Must be a valid GST Number").required("Gst Number is Required")
        }),
        onSubmit: submitKyc,
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
                                <Typography variant="h3">Vendor</Typography>

                            </div>
                        </Stack>
                        <Card sx={{marginTop: "3%"}}>
                            <CardHeader title="PAN Information"/>
                            <CardContent>
                                <Grid
                                    container
                                    rowSpacing={1}
                                    columnSpacing={{xs: 1, sm: 2, md: 6}}
                                >
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            error={!!(formik.touched.panNumber && formik.errors.panNumber)}
                                            fullWidth
                                            helperText={formik.touched.panNumber && formik.errors.panNumber}
                                            label={
                                                <span>
                                                    Pan Number&nbsp;
                                                    <span style={{color: "red"}}>*</span>
                                                </span>
                                            }
                                            name="panNumber"
                                            onBlur={formik.handleBlur}
                                            onChange={(e) => formik.handleChange(e, e.target.value.toUpperCase())}
                                            value={formik.values.panNumber}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <div style={{display: 'flex', alignItems: 'stretch', width: '600px'}}>
                                            <Typography variant="body1" sx={{
                                                border: '1px solid #ccc',
                                                borderRadius: '5px 0 0 5px',
                                                color: "grey",
                                                padding: '0.87rem',
                                                width: '250px',
                                                maxWidth: '600px'
                                            }}>
                                                {selectedPanName ? `${selectedPanName}` : "Upload Pan Document"}
                                            </Typography>
                                            <Input
                                                id="file-input"
                                                type="file"
                                                accept=".pdf,.png,.jpg"
                                                onChange={handleFileChangePan}
                                                style={{display: 'none'}}
                                                inputRef={panFileInputRef}
                                            />
                                            <Button
                                                sx={{marginRight: 0, borderRadius: '0 5px 5px 0', padding: '0.8rem'}}
                                                variant="contained"
                                                color="primary"
                                                onClick={handleChooseFileClickPan}
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
                                    columnSpacing={{xs: 1, sm: 2, md: 6}}
                                >
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            error={!!(formik.touched.gstNumber && formik.errors.gstNumber)}
                                            fullWidth
                                            helperText={formik.touched.gstNumber && formik.errors.gstNumber}
                                            label={
                                                <span>
                                                Gst Number&nbsp;
                                                    <span style={{color: "red"}}>*</span>
                                                </span>
                                            }
                                            name="gstNumber"
                                            onBlur={formik.handleBlur}
                                            onChange={(e) => formik.handleChange(e, e.target.value.toUpperCase())}
                                            value={formik.values.gstNumber.toUpperCase()}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <div style={{display: 'flex', alignItems: 'stretch', width: '600px'}}>
                                            <Typography variant="body1" sx={{
                                                border: '1px solid #ccc',
                                                borderRadius: '5px 0 0 5px',
                                                padding: '0.87rem',
                                                color: "grey",
                                                width: '250px',
                                                maxWidth: '600px'
                                            }}>
                                                <div
                                                    style={{width: "fit-content"}}>{selectedGstName ? `${selectedGstName}` : "Upload Gst Document"}</div>
                                            </Typography>
                                            <Input
                                                id="gst-input"
                                                type="file"
                                                accept=".pdf,.png,.jpg"
                                                onChange={handleFileChangeGst}
                                                style={{display: 'none'}}
                                                inputRef={gstFileInputRef}
                                            />
                                            <Button
                                                sx={{marginRight: 0, borderRadius: '0 5px 5px 0', padding: '0.8rem'}}
                                                variant="contained"
                                                color="primary"
                                                onClick={handleChooseFileClickGst}
                                            >
                                                Choose File
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <CardContent sx={{pt: 0}}>
                            <Grid><Stack
                                alignItems="center"
                                direction="row"
                                justifyContent="flex-end"
                                spacing={1}
                                sx={{marginLeft: "1%"}}
                            >
                                <Button
                                    // onClick={() => router.push(paths.userManagement.vendors.index)}
                                    onClick={() => handleCreateDialogOpen(false)}
                                    color="error" size="small" variant="outlined">
                                    Discard
                                </Button>
                                <Button onClick={() => handleCreateDialogOpen(true)}
                                        variant="contained">
                                    Submit
                                </Button>
                                <CommonDialog
                                    onConfirm={() => {
                                        if (create) {
                                            handleCreateDialogClose();
                                           formik.handleSubmit();
                                        } else {
                                            router.push(paths.dashboard.index);
                                            handleCreateDialogClose();
                                        }
                                    }}
                                    onClose={handleCreateDialogClose}
                                    open={createDialogOpen}
                                    description={create ? "Are you sure you want to Submit ?" : "Are you sure you want to go back ?"}
                                />
                            </Stack></Grid>
                        </CardContent>
                    </Stack>
                </Container>
            </Box>
        </>
    );

}
Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export const getServerSideProps = async (context) => {
    const token = context.req.cookies.accessToken;
    const id = context.req.cookies.id;
    const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
        endpoints.userManagement.vendors.index + `/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (!res.ok) {
        return {
            props: {
                vendor: {},
                address: {}
            },
        };
    }
    const {data} = await res.json();
    return {
        props: {
            vendor: data[0],
        },
    };
};
export default Page;