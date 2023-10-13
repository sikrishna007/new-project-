import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import toast from "react-hot-toast";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {RouterLink} from "src/components/router-link";
import {Seo} from "src/components/seo";
import {paths} from "src/paths";
import {useRouter} from "src/hooks/use-router";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import {endpoints} from "src/endpoints";
import Cookies from "js-cookie";
import SvgIcon from "@mui/material/SvgIcon";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import {Layout as DashboardLayout} from "@/layouts/admin-dashboard";
import CommonDialog from "@/custom-components/CommonDialog";

const initialValues = {
    sgstPercentage: "",
    cgstPercentage: "",
    igstPercentage: "",
    code: "",
    description:"",
    isHsn:"",
    submit: null,
};

const validationSchema = Yup.object({
    sgstPercentage: Yup.string().required("Sgst is required"),
    cgstPercentage: Yup.string().required("Cgst is required"),
    igstPercentage: Yup.string().required("Igst is required"),
    code: Yup.string().max(255).required().label("Code"),
});

const HsnSacCreate = ({CodeName, codePath, isHsn}) => {
    const router = useRouter();
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

    initialValues.isHsn = isHsn === "true" ? "true" : "false";
    const handleCreateDialogOpen = () => {
        setCreateDialogOpen(true);
    };

    const handleCreateDialogClose = (formik) => {
        setCreateDialogOpen(false);
    };

    const handleCancelDialogOpen = () => {
        setCancelDialogOpen(true);
    };

    const handleCancelDialogClose = (formik) => {

        setCancelDialogOpen(false);
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                const response = await fetch(
                    process.env.NEXT_PUBLIC_BASE_URL + endpoints.hsnSac.index,
                    {
                        method: "POST",
                        body: JSON.stringify({
                            code: values.code,
                            description: values.description,
                            sgstPercentage: values.sgstPercentage,
                            igstPercentage: values.igstPercentage,
                            cgstPercentage: values.cgstPercentage,
                            isHsn:values.isHsn,
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${Cookies.get("accessToken")}`,
                        },
                    }
                );
                toast.success("Code Created Successfully",{
                    position: 'top-right', // Set the position to top-right
                    autoClose: 10000,
                });
                router.push(`/setup/${codePath}`);
            } catch (err) {
                console.error(err);
                toast.error("Something went wrong!",{
                    position: 'top-right', // Set the position to top-right
                    autoClose: 10000,
                });
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: err.message });
                helpers.setSubmitting(false);
            }
        },
    });

    return (
        <>
            <Seo title={`Dashboard: ${CodeName} Create`} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack spacing={1}>
                            <div
                                style={{
                                    alignItems: "center",
                                    display: "flex",
                                }}
                            >
                                <Link
                                    color="text.primary"
                                    component={RouterLink}
                                    href={`/setup/${codePath}`}

                                    underline="hover"
                                >
                                    <SvgIcon sx={{mr: 1}}>
                                        <ArrowLeftIcon/>
                                    </SvgIcon>
                                </Link>
                                <Typography variant="h4">Create {CodeName} Code</Typography>
                            </div>
                        </Stack>
                        <form onSubmit={formik.handleSubmit}>
                            <Stack spacing={4}>
                                <Card>
                                    <CardContent>
                                        <Grid container spacing={3}>
                                            <Grid xs={12} md={4}>
                                                <Typography variant="h6" sx={{display:"flex"}}>Product {CodeName} Code <Typography sx={{color:"red"}}>*</Typography></Typography>
                                            </Grid>
                                            <Grid xs={12} md={8}>
                                                <Stack spacing={3}>
                                                    <TextField
                                                        error={
                                                            !!(formik.touched.code && formik.errors.code)
                                                        }
                                                        fullWidth
                                                        helperText={
                                                            formik.touched.code && formik.errors.code
                                                        }
                                                        label={`Enter ${CodeName} Code`}
                                                        name="code"
                                                        onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        value={formik.values.code}
                                                    />
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <CardContent>
                                        <Grid container spacing={3}>
                                            <Grid xs={12} md={4}>
                                                <Typography variant="h6" sx={{display:"flex"}}>GST <Typography sx={{color:"red"}}>*</Typography></Typography>
                                            </Grid>
                                            <Grid xs={12} md={2.5}>
                                                <Stack spacing={3}>
                                                    <TextField
                                                        error={
                                                            !!(
                                                                formik.touched.sgstPercentage &&
                                                                formik.errors.sgstPercentage
                                                            )
                                                        }
                                                        fullWidth
                                                        helperText={
                                                            formik.touched.sgstPercentage &&
                                                            formik.errors.sgstPercentage
                                                        }
                                                        label="SGST%"
                                                        name="sgstPercentage"
                                                        onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        value={formik.values.sgstPercentage}
                                                    />
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} md={2.5}>
                                                <Stack spacing={3}>
                                                    <TextField
                                                        error={
                                                            !!(
                                                                formik.touched.cgstPercentage &&
                                                                formik.errors.cgstPercentage
                                                            )
                                                        }
                                                        fullWidth
                                                        helperText={
                                                            formik.touched.cgstPercentage &&
                                                            formik.errors.cgstPercentage
                                                        }
                                                        label="CGST%"
                                                        name="cgstPercentage"
                                                        onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        value={formik.values.cgstPercentage}
                                                    />
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} md={2.5}>
                                                <Stack spacing={3}>
                                                    <TextField
                                                        error={
                                                            !!(
                                                                formik.touched.igstPercentage &&
                                                                formik.errors.igstPercentage
                                                            )
                                                        }
                                                        fullWidth
                                                        helperText={
                                                            formik.touched.igstPercentage &&
                                                            formik.errors.igstPercentage
                                                        }
                                                        label="IGST%"
                                                        name="igstPercentage"
                                                        onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        value={formik.values.igstPercentage}
                                                    />
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <CardContent>
                                        <Grid>
                                            <Grid xs={12} md={2.5}>
                                                <Stack sx={{marginLeft:"35%"}} spacing={3}>
                                                    <TextField
                                                        name="description"
                                                        label="Description"
                                                        multiline
                                                        rows={6}
                                                        onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        value={formik.values.description}
                                                        fullWidth
                                                        error={!!(
                                                            formik.touched.description &&
                                                            formik.errors.description
                                                        )}
                                                        helperText={
                                                            formik.touched.description &&
                                                            formik.errors.description
                                                        }
                                                    />
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>

                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    justifyContent="flex-end"
                                    spacing={1}
                                >
                                    <Button onClick={handleCancelDialogOpen}
                                            color="error" size="small" variant="outlined">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleCreateDialogOpen}  variant="contained">
                                        Create
                                    </Button>
                                </Stack>
                                <CommonDialog
                                    title={"Create"}
                                    onConfirm={() => {
                                        formik.handleSubmit();
                                        handleCreateDialogClose();
                                    }}
                                    onClose={handleCreateDialogClose}
                                    open={createDialogOpen}
                                    description={"Are you sure you want to create ?"}
                                />
                                <CommonDialog
                                    title={"Yes"}
                                    onConfirm={() => {
                                        router.push(`/setup/${codePath}`);
                                        handleCancelDialogClose();
                                    }}
                                    onClose={handleCancelDialogClose}
                                    open={cancelDialogOpen}
                                    description={"Are you sure you want to Cancel ?"}
                                />
                            </Stack>
                        </form>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

HsnSacCreate.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default HsnSacCreate;
