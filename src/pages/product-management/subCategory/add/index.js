import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Container from "@mui/material/Container";
import toast from "react-hot-toast";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BreadcrumbsSeparator } from "src/components/breadcrumbs-separator";
import { RouterLink } from "src/components/router-link";
import { Seo } from "src/components/seo";

import { Layout as DashboardLayout } from "src/layouts/dashboard";
import { paths } from "src/paths";
import { ProductCreateForm } from "src/sections/dashboard/product/product-create-form";
import { useRouter } from "src/hooks/use-router";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import { FileDropzone } from "src/components/file-dropzone";
import { QuillEditor } from "src/components/quill-editor";
import Switch from "@mui/material/Switch";
import MenuItem from "@mui/material/MenuItem";
import { fi } from "date-fns/locale";
import { endpoints } from "src/endpoints";
import Cookies from "js-cookie";
import SvgIcon from "@mui/material/SvgIcon";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import * as React from "react";
import CommonDialog from "../../../../custom-components/CommonDialog";
import Autocomplete from "@mui/material/Autocomplete";

const initialValues = {
  longDescription: "",
  images: [],
  categoryName: "",
  subCategoryName: "",
  submit: null,
};

const validationSchema = Yup.object({
  longDescription: Yup.string().max(5000),
  images: Yup.array(),
  categoryName: Yup.string().max(45).required(),
  subCategoryName: Yup.string().max(45).required().matches(/^[A-Za-z ]+$/, 'Product sub category name should only contain alphabets'),
});

const Page = () => {
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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        // console.log(files);
        // console.log(values);
        // // NOTE: Make API request
        // console.log({
        //   name: values.subCategoryName,
        //   categoryName: values.categoryName,
        //   longDescription: values.longDescription,
        //   shortDescription: values.shortDescription
        //   // files: {},
        // });

        let token = Cookies.get("accessToken")

        const response = await fetch(
          process.env.NEXT_PUBLIC_BASE_URL + endpoints.subCategory.index,
          {
            method: "POST",
            body: JSON.stringify({
              // name: values.subCategoryName,
              name: values.subCategoryName
                  .toLowerCase()
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' '),
              offeringCategories:{
                id:values.categoryName
              },
              longDescription: values.longDescription,
              shortDescription: "active",
              // files: {},
            }),
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          // console.log("API Response:", data);
          toast.success("Product Sub Category Created Successfully", {autoClose:10000});
          router.push(paths.productListing.subCategory.index);
        } else {
          // Handle API errors here
          const errorData = await response.json();
          // console.error("API Error:", errorData);
          toast.error("Something went wrong!", {autoClose:10000});
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: errorData.message });
          helpers.setSubmitting(false);
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong!", {autoClose:10000});
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
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

  const getCategories = async () => {
    try {
      let token = Cookies.get("accessToken");
      const categories = await fetch(
          process.env.NEXT_PUBLIC_BASE_URL + endpoints.category.index,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      const { data: categoryData } = await categories.json();
      setCategories(categoryData);
      // console.log(categories);
    } catch (err) {
      // console.error(err);
    }
  };
  React.useEffect(() => {
    getCategories();
  }, []);


  return (
    <>
      <Seo title="Dashboard: Product Sub Category Create" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <div
                style={{
                  alignItems: "center",
                  display: "flex",
                }}
            >
              <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.productListing.subCategory.index}

                  underline="hover"
              >
                <SvgIcon sx={{ mr: 1 }}>
                  <ArrowLeftIcon />
                </SvgIcon>
              </Link>
                <Typography variant="h4">Create Product Sub-Category</Typography>
            </div>
            {/*<div style={{marginLeft:'3%',marginTop:'0.5%'}}>*/}
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
            {/*      href={paths.productListing.subCategory.index}*/}
            {/*      variant="subtitle2"*/}
            {/*  >*/}
            {/*    Product Sub-Category List*/}
            {/*  </Link>*/}
            {/*  <Typography*/}
            {/*      color="text.primary"*/}
            {/*      variant="subtitle2"*/}
            {/*  >*/}
            {/*    Create*/}
            {/*  </Typography>*/}
            {/*</Breadcrumbs></div>*/}
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={4}>
                <Card>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid xs={12} md={4}>
                        <Typography variant="h6" sx={{display:"flex"}}>Product Category <Typography sx={{color:"red"}}>*</Typography></Typography>
                      </Grid>
                      <Grid xs={12} md={8}>
                        <Stack spacing={3}>
                          {/*<TextField*/}
                          {/*    error={*/}
                          {/*      !!(formik.touched.categoryName && formik.errors.categoryName)*/}
                          {/*    }*/}
                          {/*    fullWidth*/}
                          {/*    helperText={*/}
                          {/*        formik.touched.categoryName && formik.errors.categoryName*/}
                          {/*    }*/}
                          {/*    label="Product Category Name"*/}
                          {/*    name="categoryName"*/}
                          {/*    onBlur={formik.handleBlur}*/}
                          {/*    onChange={formik.handleChange}*/}
                          {/*    value={formik.values.categoryName}*/}
                          {/*    select*/}
                          {/*>*/}
                          {/*  {categories.map((option) => (*/}
                          {/*      <MenuItem key={option.id} value={option.id}>*/}
                          {/*        {option?.name}*/}
                          {/*      </MenuItem>*/}
                          {/*  ))}*/}
                          {/*</TextField>*/}
                          <Autocomplete
                              options={categories}
                              getOptionLabel={(option) => option.name}
                              renderInput={(params) => (
                                  <TextField {...params} label="Select Product Category" />
                              )}
                              onChange={(vendor, value) => {
                                formik.values.categoryName=value?.id
                                // console.log(value?.id)
                              }}
                          />
                        </Stack>
                      </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                      <Grid xs={12} md={4}>
                        <Typography variant="h6" sx={{display:"flex"}}>Product Sub-Category <Typography sx={{color:"red"}}>*</Typography></Typography>
                      </Grid>
                      <Grid xs={12} md={8}>
                        <Stack spacing={3}>
                          <TextField
                            error={
                              !!(formik.touched.subCategoryName && formik.errors.subCategoryName)
                            }
                            fullWidth
                            helperText={
                              formik.touched.subCategoryName && formik.errors.subCategoryName
                            }
                            label="Product Sub Category Name"
                            name="subCategoryName"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.subCategoryName}
                          />
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid xs={12} md={4}>
                        <Stack spacing={1}>
                          <Typography variant="h6" sx={{display:"flex"}}>
                            Upload Thumbnail Image <Typography sx={{color:"red"}}>*</Typography>
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid xs={12} md={8}>
                        <FileDropzone
                          maxFiles={1}
                          accept={{ "image/*": [] }}
                          caption="(SVG, JPG, PNG, or gif maximum 900x400)"
                          files={files}
                          onDrop={handleFilesDrop}
                          onRemove={handleFileRemove}
                          onRemoveAll={handleFilesRemoveAll}
                          disabled
                        />
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
                  <Button  onClick={handleCreateDialogOpen} variant="contained" disabled={formik.values.subCategoryName === ""}>
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
                      router.push(paths.productListing.subCategory.index)
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

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps = async (context) => {
  // console.log(context.req.cookies.username)
  const token = context.req.cookies.accessToken;
  // console.log(token);
  const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
      endpoints.category.index ,
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
  const { data } = await res.json();
  return {
    props: {
      category: data[0],
    },
  };
};
export default Page;
