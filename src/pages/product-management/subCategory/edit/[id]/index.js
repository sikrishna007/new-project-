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
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import CommonDialog from "../../../../../custom-components/CommonDialog";


const validationSchema = Yup.object({
  longDescription: Yup.string().max(5000),
  images: Yup.array(),
  subCategory: Yup.string().max(45).required().matches(/^[A-Za-z ]+$/, 'Product sub category name should only contain alphabets'),
});

const Page = ({category}) => {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const initialValues = {
    longDescription: category?.longDescription,
    subCategory: category?.name,
    categoryId:category?.offeringCategories.id,
    submit: null,
  };
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

        // NOTE: Make API request



        let token = Cookies.get("accessToken")

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}${endpoints.subCategory.index}/${category.id}`,
            {
              method: "PATCH",
              body: JSON.stringify({
                name: values.subCategory,
                offeringCategories: {id:values.categoryId},
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
        const data = await response.json();
        toast.success("Product Sub Category Edited Successfully", {autoClose:10000});
        if (response.ok) router.push(paths.productListing.subCategory.index);
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
    } catch (err) {
      console.error(err);
    }
  };
  React.useEffect(() => {
    getCategories();
  }, []);


  return (
      <>
        <Seo title="Dashboard: Product Sub Category" />
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
                <Typography variant="h4">Edit Product Sub Category</Typography>
              </div>
              {/*<div style={{marginLeft:'2.3%'}}>*/}
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
              {/*    Edit*/}
              {/*  </Typography>*/}
              {/*</Breadcrumbs>*/}
              {/*</div>*/}
              <form onSubmit={formik.handleSubmit}>
                <Stack spacing={4}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid xs={12} md={4}>
                          <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>Product Category  <Typography sx={{color:"red"}}>*</Typography></Typography>
                        </Grid>
                        <Grid xs={12} md={8}>
                          <Stack spacing={3}>
                            <TextField
                                error={
                                  !!(formik.touched.categoryId && formik.errors.categoryId)
                                }
                                fullWidth
                                helperText={
                                    formik.touched.categoryId && formik.errors.categoryId
                                }
                                label="Product Category Name"
                                name="categoryId"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.categoryId}
                                select
                            >
                              {categories.map((option) => (
                                  <MenuItem key={option.id} value={option.id}>
                                    {option?.name}
                                  </MenuItem>
                              ))}
                            </TextField>
                          </Stack>
                        </Grid>
                      </Grid>

                      <Grid container spacing={3}>
                        <Grid xs={12} md={4}>
                          <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>Product Sub-Category  <Typography sx={{color:"red"}}>*</Typography></Typography>
                        </Grid>
                        <Grid xs={12} md={8}>
                          <Stack spacing={3}>
                            <TextField
                                error={
                                  !!(formik.touched.subCategory && formik.errors.subCategory)
                                }
                                fullWidth
                                helperText={
                                    formik.touched.subCategory && formik.errors.subCategory
                                }
                                label="Product Sub Category Name"
                                name="subCategory"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.subCategory}
                            />
                          </Stack>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid xs={12} md={4}>
                          <Stack spacing={1}>
                            <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
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
                    <Button
                        onClick={handleCancelDialogOpen}
                        color="error" size="small" variant="outlined">
                      Discard
                    </Button>
                    <Button onClick={handleCreateDialogOpen} variant="contained">
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
                  <CommonDialog
                      title={"Yes"}
                      onConfirm={() => {
                        router.push(paths.productListing.subCategory.index)
                        handleCancelDialogClose();
                      }}
                      onClose={handleCancelDialogClose}
                      open={cancelDialogOpen}
                      description={"Are you sure you want to Discard ?"}
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
  const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
      endpoints.subCategory.index +
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
  const { data } = await res.json();
  return {
    props: {
      category: data[0],
    },
  };
};

export default Page;
