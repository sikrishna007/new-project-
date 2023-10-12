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
import {CardMedia} from "@mui/material";
import {endpoints} from "src/endpoints";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ArrowRightSharpIcon from '@mui/icons-material/ArrowRightSharp';

const Page = () => {
    const router = useRouter();
    // console.log(router.query);
    const [category, setCategory] = useState({});

    const getCategory = async () => {
        try {
            const token = Cookies.get("accessToken")
            const res = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL +
                endpoints.eventCategories.index +
                "/" +
                router.query.id,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const {data} = await res.json();
            setCategory(data[0]);
            // console.log(data);
        } catch (error) {
            // console.log(error);
        }
    };

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <>
            <Seo title={`Event Category: ${category.name}`}/>
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
                                    href={paths.eventCategory.index}
                                    underline="hover"
                                >
                                    <SvgIcon sx={{marginTop: "10px"}}>
                                        <ArrowLeftIcon/>
                                    </SvgIcon>
                                </Link>
                                <Typography variant="h4">{category.name}</Typography>
                            </div>
                            {category?.isActive ? (
                                <Button
                                    onClick={() =>
                                        router.push(paths.eventCategory.edit + router.query.id)
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
                        </div>
                        <div style={{marginLeft: '2.3%', marginTop: '0.5%'}}>
                            <Breadcrumbs separator={<ArrowRightSharpIcon style={{marginLeft: '-40%'}}/>}
                                         sx={{color: "#4338CA"}}>
                                <Link
                                    color='#4338CA'
                                    variant="subtitle2"
                                    component={RouterLink}
                                    href={paths.eventCategory.index}
                                >
                                    Event Categories
                                </Link>
                                <Typography
                                    color="text.primary"
                                    variant="subtitle2"
                                    sx={{marginLeft: '-15%'}}
                                >
                                    Event Category Info
                                </Typography>

                            </Breadcrumbs>

                        </div>
                        <div>
                            <Stack
                                alignItems="flex-start"
                                direction="row"
                                justifyContent="space-between"
                                spacing={3}
                            >
                            </Stack>
                        </div>
                        <Card sx={{paddingBottom: "1%"}}>
                            <CardHeader title="Basic Details"/>
                            <PropertyList>
                                <Grid container spacing={3}>
                                    <Grid xs={12} md={6}>
                                        <PropertyListItem
                                            label="Event Category"
                                            value={category?.name && category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                                        />
                                        <PropertyListItem
                                            label="Description"
                                            // value={category.long_description}
                                        >
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: category.longDescription,
                                                }}
                                            />
                                        </PropertyListItem>
                                    </Grid>

                                    <Grid xs={12} md={6}>
                                        <Card sx={{width: "30%", margin: "0% 5%"}}>
                                            <CardMedia
                                            />
                                        </Card>
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

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
