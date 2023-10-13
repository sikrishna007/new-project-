import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import toast from "react-hot-toast";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {useCallback, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {RouterLink} from "src/components/router-link";
import {Seo} from "src/components/seo";
import {Layout as DashboardLayout} from "src/layouts/admin-dashboard";
import {paths} from "src/paths";
import {useRouter} from "next/router";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import {FileDropzone} from "src/components/file-dropzone";
import {QuillEditor} from "src/components/quill-editor";
import {endpoints} from "src/endpoints";
import Cookies from "js-cookie";
import SvgIcon from "@mui/material/SvgIcon";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import CommonDialog from "../../../../custom-components/CommonDialog";

const validationSchema = Yup.object({
    longDescription: Yup.string().max(5000),
    images: Yup.array(),
    name: Yup.string().max(45).required().matches(/^[A-Za-z ]+$/, 'Event category name should only contain alphabets'),
});

const Page = ({category}) => {
    // console.log(category);
    const router = useRouter();
    const {id} = router.query;
    const initialValues = {
        longDescription: category.longDescription,
        images: [],
        name: category.name,
        submit: null,
    };
    const [files, setFiles] = useState([]);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const handleCreateDialogOpen = () => {
        setCreateDialogOpen(true);
    };

    const handleCreateDialogClose = (formik) => {

        setCreateDialogOpen(false);
    };
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, helpers) => {
            try {
                // console.log(files);
                // console.log(values);

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}${endpoints.eventCategories.index}/${id}`,
                    {
                        method: "PATCH",
                        body: JSON.stringify({
                            name: values.name,
                            longDescription: values.longDescription,
                            shortDescription: "active",
                            files: {},
                        }),
                        headers: {
                            Authorization: `Bearer ${Cookies.get("accessToken")}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await response.json();
                // console.log(data);
                // console.log(data);
                toast.success("Event Category Edited Successfully");
                if (response.ok) router.push(paths.eventCategory.index);
            } catch (err) {
                // console.error(err);
                toast.error("Something went wrong!");
                helpers.setStatus({success: false});
                helpers.setErrors({submit: err.message});
                helpers.setSubmitting(false);
            }
        },
    });

    const handleFilesDrop = useCallback((newFiles) => {
        setFiles((prevFiles) => {
            if (prevFiles?.length == 0) return [...prevFiles, ...newFiles];
            return [...newFiles];
        });
    }, []);

    const handleFileRemove = useCallback((file) => {
        setFiles((prevFiles) => {
            return prevFiles.filter((_file) => _file.path !== file.path);
        });
    }, []);

    const handleFilesRemoveAll = useCallback(() => {
        setFiles([]);
    }, []);

    return (
        <>
            <Seo title="Dashboard: Event-Category"/>
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
                                    href={paths.eventCategory.index}

                                    underline="hover"
                                >
                                    <SvgIcon sx={{mr: 1}}>
                                        <ArrowLeftIcon/>
                                    </SvgIcon>
                                </Link>
                                <Typography variant="h4">Edit Event Category</Typography>

                            </div>
                            {/*<div style={{marginLeft:'2.2%'}}>*/}
                            {/*  <Breadcrumbs separator={<BreadcrumbsSeparator/>} >*/}
                            {/*  <Link*/}
                            {/*      color='#4338CA'*/}
                            {/*      component={RouterLink}*/}
                            {/*      href={paths.dashboard.index}*/}
                            {/*      variant="subtitle2"*/}
                            {/*  >*/}
                            {/*    Dashboard*/}
                            {/*  </Link>*/}
                            {/*  <Link*/}
                            {/*      color='#4338CA'*/}
                            {/*      component={RouterLink}*/}
                            {/*      href={paths.eventCategory.index}*/}
                            {/*      variant="subtitle2"*/}
                            {/*  >*/}
                            {/*    Event Categories List*/}
                            {/*  </Link>*/}
                            {/*  <Typography*/}
                            {/*      color="text.primary"*/}
                            {/*      variant="subtitle2"*/}
                            {/*  >*/}
                            {/*    Edit*/}
                            {/*  </Typography>*/}
                            {/*</Breadcrumbs>*/}
                            {/*</div>*/}

                        </Stack>
                        <form onSubmit={formik.handleSubmit}>
                            <Stack spacing={4}>
                                <Card>
                                    <CardContent>
                                        <Grid container spacing={3}>
                                            <Grid xs={12} md={4}>
                                                <Typography variant="h6" sx={{display: "flex"}}>Event Category
                                                    details <Typography sx={{color: "red"}}>*</Typography></Typography>
                                            </Grid>
                                            <Grid xs={12} md={8}>
                                                <Stack spacing={3}>
                                                    <TextField
                                                        error={
                                                            !!(formik.touched.name && formik.errors.name)
                                                        }
                                                        fullWidth
                                                        helperText={
                                                            formik.touched.name && formik.errors.name
                                                        }
                                                        label="Event Category Name"
                                                        name="name"
                                                        onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        value={formik.values.name}
                                                    />
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <CardContent>
                                        <Grid container spacing={3}>
                                            <Grid xs={12} md={4}>
                                                <Stack spacing={1}>
                                                    <Typography variant="h6" sx={{display: "flex"}}>
                                                        Upload Thumbnail Image <Typography
                                                        sx={{color: "red"}}>*</Typography>
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid xs={12} md={8}>
                                                <FileDropzone
                                                    maxFiles={1}
                                                    accept={{"image/*": []}}
                                                    caption="(SVG, JPG, PNG, or gif maximum 900x400)"
                                                    files={files}
                                                    onDrop={handleFilesDrop}
                                                    onRemove={handleFileRemove}
                                                    onRemoveAll={handleFilesRemoveAll}
                                                    disabled
                                                />
                                                <Grid mt={5} xs={12} md={8}>
                                                    <TextField
                                                        error={
                                                            !!(formik.touched.longDescription && formik.errors.longDescription)
                                                        }
                                                        fullWidth
                                                        helperText={
                                                            formik.touched.longDescription && formik.errors.longDescription
                                                        }
                                                        label="Description"
                                                        name="longDescription"
                                                        multiline
                                                        rows={6}
                                                        onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        value={formik.values.longDescription}
                                                    />
                                                </Grid>
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
                                    <Button
                                        onClick={() => router.push(paths.eventCategory.index)}
                                        color="error"
                                        size="small"
                                        variant="outlined"
                                    >
                                        Discard
                                    </Button>
                                    <Button onClick={handleCreateDialogOpen} variant="contained"
                                            disabled={formik.values.name === ""}>
                                        Save Changes
                                    </Button>
                                </Stack>
                                <CommonDialog
                                    title={"Save"}
                                    onConfirm={() => {
                                        formik.handleSubmit();
                                        handleCreateDialogClose();
                                    }}
                                    onClose={handleCreateDialogClose}
                                    open={createDialogOpen}
                                    description={"Are you sure you want to Change Details ?"}
                                />
                            </Stack>
                        </form>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps = async (context) => {
    // console.log(context.req.cookies.username)
    const token = context.req.cookies.accessToken;
    // console.log(token);
    const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
        endpoints.eventCategories.index +
        "/" +
        context.params.id,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    if (!res.ok) {
        return {
            props: {
                category: {},
            },
        };
    }
    const {data} = await res.json();
    return {
        props: {
            category: data[0],
        },
    };
};

export default Page;
