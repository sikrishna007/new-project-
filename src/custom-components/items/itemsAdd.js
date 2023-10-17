import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import toast from "react-hot-toast";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useCallback, useEffect, useState} from "react";
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
import {FileDropzone} from "src/components/file-dropzone";
import Cookies from "js-cookie";
import SvgIcon from "@mui/material/SvgIcon";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import CommonDialog from "@/custom-components/CommonDialog";
import Autocomplete from "@mui/material/Autocomplete";
import {endpoints} from "@/endpoints";
import {search} from "@/utils/util";


const ItemAdd = ({title, pathUrl}) => {
    const router = useRouter();
    const [files, setFiles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
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

    let location = window.location.href.split("/")[4];
    const formik = useFormik({
        initialValues: {
            longDescription: "",
            images: [],
            name: "",
            categoryName: "",
            submit: null,
        },

        validationSchema:
            location === "add" ?
                Yup.object({
                    longDescription: Yup.string().max(5000),
                    images: Yup.array(),
                    name: Yup.string().max(45).required().matches(/^[A-Za-z ]+$/, 'Event category name should only contain alphabets'),
                })
                :
                location === "category" ?
                    Yup.object({
                        longDescription: Yup.string().max(5000),
                        images: Yup.array(),
                        name: Yup.string().max(45).required().matches(/^[A-Za-z ]+$/, 'Product Category name should only contain alphabets'),
                    })
                    :
                    Yup.object({
                        longDescription: Yup.string().max(5000),
                        images: Yup.array(),
                        categoryName: Yup.string().max(45).required(),
                        name: Yup.string().max(45).required().matches(/^[A-Za-z ]+$/, 'Event category name should only contain alphabets'),
                    }),

        onSubmit: async (values, helpers) => {
            try {
                let token = Cookies.get("accessToken")
                let pathName
                location === "add" ? pathName = "eventCategories" : location === "category" ? pathName = "category" : pathName = "subCategory"
                let endpoint = endpoints[pathName].index

                const requestBody = {
                    longDescription: formik.values.longDescription,
                    images: formik.values.images,
                    name: formik.values.name
                        .toLowerCase()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' '),
                    shortDescription: "",
                };

                if (location === "subCategory") {
                    requestBody.offeringCategories = {
                        id: formik.values.categoryName,
                    };
                }
                const response = await fetch(
                    process.env.NEXT_PUBLIC_BASE_URL + endpoint,
                    {
                        method: "POST",
                        body: JSON.stringify(requestBody),
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                toast.success(`${title} Created Successfully`, {autoClose: 10000});
                router.push(pathUrl)
            } catch (err) {
                toast.error("Something went wrong!", {autoClose: 10000});
                helpers.setStatus({success: false});
                helpers.setErrors({submit: err.message});
                helpers.setSubmitting(false);
            }
        },
    });

    const handleFilesDrop = useCallback((newFiles) => {
        setFiles((prevFiles) => {
            if (prevFiles?.length === 0) return [...prevFiles, ...newFiles];
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

    const handleGetCat =async (input)=>{
        let path = endpoints.category.index.index;
        let result = await search(input,path);
        setCategories(result.hits);
    }
    useEffect(() => {
        handleGetCat("")
    }, []);

    return (
        <>
            <Seo title="Dashboard: Event Category Create"/>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>


                        <Stack sx={{marginTop: '-40px'}}
                               direction="row" justifyContent="space-between" spacing={4}>
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
                                        href={pathUrl}
                                        underline="hover"
                                    >
                                        <SvgIcon sx={{mr: 1}}>
                                            <ArrowLeftIcon/>
                                        </SvgIcon>
                                    </Link>
                                    <Typography variant="h4">Create {title}</Typography>
                                </div>
                            </Stack>
                        </Stack>

                        <form onSubmit={formik.handleSubmit}>
                            <Stack spacing={4}>
                                <Card>
                                    <CardContent>
                                        {location === "subCategory" && (
                                            <Grid container spacing={3}>
                                                <Grid xs={12} md={4}>
                                                    <Typography variant="h6" sx={{display: "flex"}}>Product
                                                        Category <Typography
                                                            sx={{color: "red"}}>*</Typography></Typography>
                                                </Grid>
                                                <Grid xs={12} md={8}>
                                                    <Stack spacing={3}>
                                                        <Autocomplete
                                                            options={categories}
                                                            name="categoryName"
                                                            onInputChange={(event, newInputValue) => handleGetCat(newInputValue)}
                                                            getOptionLabel={(option) => option.name}
                                                            renderInput={(params) => (
                                                                <TextField {...params} label="Select Product Category"/>
                                                            )}
                                                            onChange={(category, value) => {
                                                                formik.values.categoryName = value?.id;
                                                            }}
                                                        />
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        )}

                                        <Grid container spacing={3}>
                                            <Grid xs={12} md={4}>
                                                <Typography variant="h6"
                                                            sx={{display: "flex"}}>{title} details <Typography
                                                    sx={{color: "red"}}>*</Typography></Typography>
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
                                                        label={`${title} Name`}
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
                                                {/*<FileDropzone*/}
                                                {/*    maxFiles={1}*/}
                                                {/*    accept={{"image/*": []}}*/}
                                                {/*    caption="(SVG, JPG, PNG, or gif maximum 900x400)"*/}
                                                {/*    files={files}*/}
                                                {/*    onDrop={handleFilesDrop}*/}
                                                {/*    onRemove={handleFileRemove}*/}
                                                {/*    onRemoveAll={handleFilesRemoveAll}*/}
                                                {/*    disabled*/}
                                                {/*/>*/}
                                                <Grid mt={5} xs={12} md={8}>
                                                    {location === "add" && (

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

                                                    )}
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
                                    <Button onClick={handleCancelDialogOpen}
                                            color="error" size="small" variant="outlined">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleCreateDialogOpen} variant="contained"
                                            disabled={formik.values.name === ""}>
                                        Create
                                    </Button>
                                </Stack>
                                <CommonDialog
                                    onConfirm={() => {
                                        formik.handleSubmit();
                                        handleCreateDialogClose();
                                    }}
                                    onClose={handleCreateDialogClose}
                                    open={createDialogOpen}
                                    description={"Are you sure you want to create ?"}
                                />
                                <CommonDialog
                                    onConfirm={() => {
                                        router.push(pathUrl)
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


export default ItemAdd;
