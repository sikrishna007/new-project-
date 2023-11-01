import React from "react";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import CardHeader from "@mui/material/CardHeader";
import {PropertyList} from "src/components/property-list";
import {PropertyListItem} from "src/components/property-list-item-custom";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import {RouterLink} from "src/components/router-link";
import {Seo} from "src/components/seo";
import {CardMedia} from "@mui/material";
import {Layout as DashboardLayout} from "src/layouts/admin-dashboard";
import {paths} from "src/paths";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import {useRouter} from "next/router";
import {endpoints} from "src/endpoints";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";
import Cookies from "js-cookie";
import RoleBasedView from "@/contexts/roleAut/RoleBasedView";

const Page = ({product, vendor}) => {
    const router = useRouter();
    let role=Cookies.get("role")
    return (
        <>
            <Seo title="Dashboard: Product Details"/>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="lg">
                    <Stack spacing={4}>
                        <div
                            style={{
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >

                            <div
                                style={{
                                    alignItems: "center",
                                    display: "flex"
                                }}
                            >
                                <Link
                                    color="text.primary"
                                    component={RouterLink}
                                    href={paths.productManagement.products.index}
                                    underline="hover"
                                >
                                    <SvgIcon sx={{marginTop: "10px"}}>
                                        <ArrowLeftIcon/>
                                    </SvgIcon>
                                </Link>
                                <Typography variant="h4">Product Information</Typography>
                            </div>
                            <RoleBasedView permissions={["ADMIN","VENDOR MANAGER"]}>
                                {product?.isActive ? (
                                    <Button
                                        onClick={() =>
                                            router.push(paths.productManagement.products.edit + product.id)
                                        }
                                        color="inherit"
                                        style={{backgroundColor: "#4338CA", color: "white"}}
                                        endIcon={
                                            <SvgIcon>
                                                <Edit02Icon/>
                                            </SvgIcon>
                                        }
                                    >
                                        Edit
                                    </Button>
                                ) : (
                                    <Button
                                        color="inherit"
                                        style={{
                                            backgroundColor: "#CACACA",
                                            color: "white",
                                            opacity: "1",
                                            cursor: "not-allowed"
                                        }}
                                        title="Deactive records cant't edit"
                                        endIcon={
                                            <SvgIcon>
                                                <Edit02Icon/>
                                            </SvgIcon>
                                        }
                                    >
                                        Edit
                                    </Button>
                                )}
                            </RoleBasedView>
                        </div>
                        <div style={{marginLeft: '2.3%', marginTop: '0.5%'}}>
                            <Breadcrumbs separator={<ArrowRightSharpIcon style={{marginLeft: '-40%'}}/>}
                                         sx={{color: "#4338CA"}}>
                                {/*<Link*/}
                                {/*    color='#4338CA'*/}
                                {/*    component={RouterLink}*/}
                                {/*    href={paths.dashboard.index}*/}
                                {/*    variant="subtitle2"*/}
                                {/*>*/}
                                {/*    Dashboard*/}
                                {/*</Link>*/}
                                <Link
                                    color='#4338CA'
                                    component={RouterLink}
                                    href={paths.productManagement.products.index}
                                    variant="subtitle2"
                                >
                                    Products
                                </Link>
                                <Typography
                                    color="text.primary"
                                    variant="subtitle2"
                                    sx={{marginLeft: '-22%'}}
                                >
                                    Product Info
                                </Typography>

                            </Breadcrumbs>
                        </div>
                        <Card sx={{padding: "1%"}}>
                            <CardHeader title="Product Details"/>
                            <PropertyList>
                                <Grid container spacing={3}>
                                    <Grid xs={12} md={4}>
                                        <PropertyListItem label="Product Name"
                                                          value={product.name}
                                        />
                                    </Grid>
                                    <Grid xs={12} md={4}>
                                        <PropertyListItem label="Vendor Name"
                                                          value={vendor.user.firstName + ' ' + vendor.user.lastName}
                                        />
                                    </Grid>
                                    <Grid xs={12} md={4}>
                                        <PropertyListItem
                                            label="Product Type"
                                            value={product.isGoods ? "Goods" : "Service"}
                                        />
                                    </Grid>
                                    <Grid xs={12} md={4}>
                                        <PropertyListItem
                                            label="HSN/SAC Code"
                                            value={product.hsnSacCode?.code}
                                        />
                                    </Grid>
                                    <Grid xs={12} md={4}>
                                        <PropertyListItem
                                            label="Category"
                                            value={
                                                product.offeringSubCategories?.offeringCategories?.name
                                            }
                                        />
                                    </Grid>
                                    <Grid xs={12} md={4}>
                                        <PropertyListItem
                                            label="Sub Category"
                                            value={product.offeringSubCategories?.name}
                                        />
                                    </Grid>
                                    <Grid xs={12} md={4}></Grid>
                                    <Grid xs={12} md={12}>
                                        <PropertyListItem
                                            label="Description"
                                            value={product.longDescription}
                                        />
                                    </Grid>
                                    <Grid xs={12} md={12} m={2}>
                                        <PropertyListItem label="Product Tags" disableGutters/>
                                        <Stack direction="row" spacing={1}>
                                            {product.tags.map((item, index) => (
                                                <Chip
                                                    key={index}
                                                    label={item}
                                                    variant="outlined"
                                                />
                                            ))}
                                        </Stack>
                                    </Grid>
                                    <Grid xs={12} md={12} m={2}>
                                        <PropertyListItem label="Event Categories" disableGutters/>
                                        <Stack direction="row" spacing={1}>
                                            {product.eventCategories.map((item, index) => (
                                                <Chip
                                                    key={index}
                                                    label={item.name}
                                                    variant="outlined"
                                                />
                                            ))}
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </PropertyList>

                        </Card>
                        {/* <Card sx={{ padding: "1%" }}>
              <CardHeader title="Event Category" />
              <PropertyList>
                <Grid container spacing={3}>
                  <Grid xs={12} md={12} m={2}>
                    <PropertyListItem label="Event Tags" disableGutters />
                    <Stack direction="row" spacing={1}>
                      <Chip label="Chip Outlined" variant="outlined" />
                      <Chip label="Chip Outlined" variant="outlined" />
                    </Stack>
                  </Grid>
                </Grid>
              </PropertyList>
            </Card> */}
                        <Card sx={{padding: "1%"}}>
                            <CardHeader title="Pricing"/>
                            <PropertyList>
                                <Grid container spacing={3}>
                                    <Grid xs={12} md={3}>
                                        <PropertyListItem
                                            label="Unit Price"
                                            value={`₹${product.unitPrice}`}
                                        />
                                    </Grid>
                                    <Grid xs={12} md={3}>
                                        <PropertyListItem
                                            label="Cost price"
                                            // value={(
                                            //     product.unitPrice *
                                            //     (product.igst / 100) *
                                            //     (product.sgst / 100) *
                                            //     (product.cgst / 100) +
                                            //     product.unitPrice
                                            // ).toFixed(2)}
                                            value={`₹${product.discountPrice}`}
                                        />
                                    </Grid>
                                    <Grid xs={12} md={3}>
                                        <PropertyListItem
                                            label="Vendor Share"
                                            value={`₹${product.vendorPrice}`}
                                        />
                                    </Grid>
                                    <Grid xs={12} md={3}>
                                        <PropertyListItem
                                            label="Organisation Share"
                                            value={`₹${(product.unitPrice) - (product.vendorPrice)}`}
                                        />
                                    </Grid>
                                    <Grid xs={12} md={3}>
                                        <PropertyListItem
                                            label="SGST"
                                            value={product.hsnSacCode?.sgstPercentage + "%"}
                                        />
                                    </Grid>
                                    <Grid xs={12} md={3}>
                                        <PropertyListItem
                                            label="CGST"
                                            value={product.hsnSacCode?.cgstPercentage + "%"}
                                        />
                                    </Grid>
                                    <Grid xs={12} md={3}>
                                        <PropertyListItem
                                            label="IGST"
                                            value={product.hsnSacCode?.igstPercentage + "%"}
                                        />
                                    </Grid>
                                    <Grid xs={12} md={3}></Grid>
                                </Grid>
                            </PropertyList>
                            {/* <CardActions>
        <Button
          color="inherit"
          size="small"
        >
          Reset Password
        </Button>
      </CardActions> */}
                        </Card>
                        <Card sx={{padding: "1%"}}>
                            <CardHeader title="Images"/>
                            <PropertyList>
                                <Grid container spacing={0}>
                                    {product?.files.map((file) =>
                                        <Grid xs={6} md={3}>
                                            <Card sx={{width: "60%", margin: "5% 5%"}}>
                                                <CardMedia
                                                    component="img"
                                                    image={file.filePath}
                                                    alt={product?.name}
                                                />
                                            </Card>
                                        </Grid>)}
                                </Grid>
                            </PropertyList>
                        </Card>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};
export const getServerSideProps = async (context) => {
    const token = context.req.cookies.accessToken;
    const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
        endpoints.product.index +
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
                product: {},
            },
        };
    }
    const {data} = await res.json();
    // console.log(data[0].vendor);
    const vend = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
        endpoints.userManagement.vendors.index +
        "/" +
        data[0].vendor,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const vendor = await vend.json();
    // console.log(vendor);
    return {
        props: {
            product: data[0],
            vendor: vendor.data[0],
        },
    };
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;