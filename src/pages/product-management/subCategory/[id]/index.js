import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import Box from "@mui/material/Box";
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

import {Layout as DashboardLayout} from "src/layouts/admin-dashboard";
import {paths} from "src/paths";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import {endpoints} from "src/endpoints";
import {useRouter} from "next/router";
import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";
import RoleBasedView from "@/contexts/roleAut/RoleBasedView";
import {CardMedia} from "@mui/material";

const Page = ({subCategory}) => {
    const router = useRouter();

    return (
        <>
            <Seo title={`Product Sub Category`}/>
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
                                    href={paths.productManagement.subCategory.index}

                                    underline="hover"
                                >
                                    <SvgIcon sx={{marginTop: "10px"}}>
                                        <ArrowLeftIcon/>
                                    </SvgIcon>
                                </Link>
                                <Typography variant="h4">Sub Category Information</Typography>
                            </div>
                            <RoleBasedView permissions={["ADMIN"]}>
                            {subCategory?.isActive ? (
                                <Button
                                    onClick={() =>
                                        router.push(paths.productManagement.subCategory.edit + subCategory.id)
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
                        <div style={{marginLeft: '2.4%', marginTop: '0.5%'}}>
                            <Breadcrumbs separator={<ArrowRightSharpIcon style={{marginLeft: '-40%'}}/>}
                                         sx={{color: "#4338CA"}}>
                                {/*<Link*/}
                                {/*    color='#4338CA'*/}
                                {/*    component={RouterLink}*/}
                                {/*    href={paths.dashboard.index}*/}
                                {/*    variant="subtitle2"*/}
                                {/*>*/}
                                {/*  Dashboard*/}
                                {/*</Link>*/}
                                <Link
                                    color='#4338CA'
                                    component={RouterLink}
                                    href={paths.productManagement.subCategory.index}
                                    variant="subtitle2"
                                >
                                    Product Sub-Categories
                                </Link>
                                <Typography
                                    color="text.primary"
                                    variant="subtitle2"
                                    sx={{marginLeft: '-12%'}}
                                >
                                    Product Sub-Category Info
                                </Typography>
                            </Breadcrumbs>

                        </div>
                        <Card sx={{paddingBottom: "1%"}}>
                            <CardHeader title="Basic Details"/>
                            <PropertyList>
                                    <Grid container spacing={3} sx={{padding:"2%"}}>
                                        <Grid xs={12} md={3} >
                                            <Card sx={{width:"200px",height:"200px"}}>
                                            <CardMedia
                                                component="img"
                                                image={subCategory?.files?.filePath}
                                                alt={subCategory?.name}
                                            />
                                        </Card>
                                    </Grid>
                                    <Grid xs={12} md={6}>
                                        <PropertyListItem
                                            label="Sub Category Name"
                                            value={subCategory.name}
                                        />
                                        <PropertyListItem
                                            label="Product Category"
                                            value={subCategory.offeringCategories?.name}
                                        />
                                        <PropertyListItem
                                            label="Description"
                                            value={subCategory.longDescription}
                                        />
                                    </Grid>
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
                subCategory: {},

            },
        };
    }
    const {data} = await res.json();
    return {
        props: {
            subCategory: data[0],
        },
    };
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
