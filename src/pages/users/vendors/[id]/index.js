import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import {RouterLink} from "src/components/router-link";

import {Layout as DashboardLayout} from "src/layouts/admin-dashboard";
import {paths} from "src/paths";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import {useRouter} from "next/router";
import {endpoints} from "../../../../endpoints";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import User01Icon from "@untitled-ui/icons-react/build/esm/User01";
import {Email, Phone} from "@mui/icons-material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";
import React from "react";


const Page = ({vendor}) => {
    // console.log(address)
    const router = useRouter();
    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lx"
                           sx={{mr: 10,}}>
                    <Stack>

                        <Container sx={{mt: 5}}>
                        <div
                            style={{
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "space-between"
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
                                    href={paths.userManagement.vendors.index}

                                    underline="hover"
                                >
                                    <SvgIcon sx={{marginTop: "10px"}}>
                                        <ArrowLeftIcon/>
                                    </SvgIcon>
                                </Link>
                                <Typography variant="h4">User Information</Typography>
                            </div>
                            {vendor?.isActive ? (
                                <Button
                                    onClick={() =>
                                        router.push(paths.userManagement.vendors.edit + vendor.id)
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
                                    href={paths.userManagement.vendors.index}
                                    variant="subtitle2"
                                >
                                    Vendors
                                </Link>
                                <Typography
                                    color="text.primary"
                                    variant="subtitle2"
                                    sx={{marginLeft: '-24%'}}
                                >
                                    Vendor Info
                                </Typography>
                            </Breadcrumbs>

                        </div>
                        </Container>
                        <Container sx={{display: "flex", mt: 5}}> <Card sx={
                            {width: "40%"}
                        }>
                            <CardContent>
                                <Stack>
                                    <Stack
                                        sx={{
                                            margin: "0 auto"
                                        }}
                                        alignItems="center"
                                        spacing={2}
                                    >
                                        <Box
                                            sx={{
                                                borderColor: 'neutral.300',
                                                borderRadius: '50%',
                                                borderStyle: 'dashed',
                                                borderWidth: 1,
                                                p: '4px'
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    borderRadius: '50%',
                                                    height: '100%',
                                                    width: '100%',
                                                    position: 'relative'
                                                }}
                                            >
                                                <Avatar

                                                    sx={{
                                                        height: 100,
                                                        width: 100
                                                    }}
                                                >
                                                    <SvgIcon>
                                                        <User01Icon/>
                                                    </SvgIcon>
                                                </Avatar>
                                            </Box>
                                        </Box>
                                    </Stack>
                                </Stack>
                                <Stack sx={{
                                    margin: "0 auto",
                                    marginTop: 2,
                                }}
                                       alignItems="center"
                                       spacing={1}
                                ><Stack>
                                    <Typography variant="h6">
                                        {vendor.user?.firstName}{' '}
                                        {vendor.user?.lastName}
                                    </Typography>
                                </Stack>
                                    <Stack>
                                        <Typography
                                            variant="subtitle"> {vendor.user?.role.name}</Typography>
                                    </Stack>
                                    <Stack alignItems="center" spacing={1}>
                                        <Typography align="center">
                                            <SvgIcon sx={{
                                                fontSize: "13px",
                                                marginRight: "5px",
                                            }}><Email/></SvgIcon>
                                            {vendor.user?.emailId}</Typography>
                                        <Typography variant="subtitle2">
                                            <SvgIcon sx={{
                                                fontSize: "13px",
                                                marginRight: "5px",
                                            }}><Phone/></SvgIcon>
                                            {vendor.user?.phoneNumber}
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Divider sx={{mt: 3}}/>
                                <Stack sx={{pt: 2, mt: 1}} alignItems="center">
                                    <Button sx={{
                                        margin: "0 auto"
                                    }}
                                            variant="contained"
                                            endIcon={
                                                <SvgIcon>
                                                    <Edit02Icon/>
                                                </SvgIcon>
                                            }
                                    >
                                        Update Picture
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                            <Card sx={{marginLeft: "3%", width: "100%"}}>
                                <CardHeader title="Address"/>
                                <CardContent sx={{marginLeft: "20%"}}>
                                    <Grid container spacing={3}>
                                        <Grid xs={12} md={7}>
                                            <Typography variant="title" sx={{
                                                display: "flex",
                                                direction: "row",
                                                color: "#6C737F",
                                                fontSize: "15px",
                                                fontWeight: "500",
                                                lineHeight: "22px",
                                                textTransform: "Uppercase"
                                            }}>Address
                                                Line 1 </Typography>
                                            <Typography variant="body2"
                                                        sx={{
                                                            color: "#111927",
                                                            fontSize: "16px",
                                                            fontWeight: "400",
                                                            lineHeight: "22px"
                                                        }}> {vendor.user?.addresses[0]?.addressLine1}</Typography>
                                        </Grid>
                                        <Grid xs={12} md={5}>
                                            <Typography variant="title" sx={{
                                                display: "flex",
                                                direction: "row",
                                                color: "#6C737F",
                                                fontSize: "15px",
                                                fontWeight: "500",
                                                lineHeight: "22px",
                                                textTransform: "Uppercase"
                                            }}>Address
                                                Line 2 </Typography>
                                            <Typography variant="body2"
                                                        sx={{
                                                            color: "#111927",
                                                            fontSize: "16px",
                                                            fontWeight: "400",
                                                            lineHeight: "22px"
                                                        }}> {vendor.user?.addresses[0]?.addressLine2}</Typography>
                                        </Grid>
                                        <Grid xs={12} md={7} mt={5}>
                                            <Typography variant="title" sx={{
                                                display: "flex",
                                                direction: "row",
                                                color: "#6C737F",
                                                fontSize: "15px",
                                                fontWeight: "500",
                                                lineHeight: "22px",
                                                textTransform: "Uppercase"
                                            }}>City </Typography>
                                            <Typography variant="body2"
                                                        sx={{
                                                            color: "#111927",
                                                            fontSize: "16px",
                                                            fontWeight: "400",
                                                            lineHeight: "22px"
                                                        }}> {vendor.user?.addresses[0]?.city}</Typography>
                                        </Grid>
                                        <Grid xs={12} md={5} mt={5}>
                                            <Typography variant="title" sx={{
                                                display: "flex",
                                                direction: "row",
                                                color: "#6C737F",
                                                fontSize: "15px",
                                                fontWeight: "500",
                                                lineHeight: "22px",
                                                textTransform: "Uppercase"
                                            }}>State </Typography>
                                            <Typography variant="body2"
                                                        sx={{
                                                            color: "#111927",
                                                            fontSize: "16px",
                                                            fontWeight: "400",
                                                            lineHeight: "22px"
                                                        }}> {vendor.user?.addresses[0]?.state}</Typography>
                                        </Grid>
                                        <Grid xs={12} md={7} mt={5}>
                                            <Typography variant="title" sx={{
                                                display: "flex",
                                                direction: "row",
                                                color: "#6C737F",
                                                fontSize: "15px",
                                                fontWeight: "500",
                                                lineHeight: "22px",
                                                textTransform: "Uppercase"
                                            }}>Country </Typography>
                                            <Typography variant="body2"
                                                        sx={{
                                                            color: "#111927",
                                                            fontSize: "16px",
                                                            fontWeight: "400",
                                                            lineHeight: "22px"
                                                        }}>{vendor.user?.addresses[0]?.country}</Typography>
                                        </Grid>
                                        <Grid xs={12} md={5} mt={5}>
                                            <Typography variant="title" sx={{
                                                display: "flex",
                                                direction: "row",
                                                color: "#6C737F",
                                                fontSize: "15px",
                                                fontWeight: "500",
                                                lineHeight: "22px",
                                                textTransform: "Uppercase"
                                            }}>Pincode </Typography>
                                            <Typography variant="body2"
                                                        sx={{
                                                            color: "#111927",
                                                            fontSize: "16px",
                                                            fontWeight: "400",
                                                            lineHeight: "22px"
                                                        }}>{vendor.user?.addresses[0]?.pincode}</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Container>
                        <Container sx={{mt: 5}}><Card>

                            <CardHeader title="Business Information"/>
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid xs={12} md={4}>
                                        <Typography variant="title" sx={{
                                            display: "flex",
                                            direction: "row",
                                            color: "#6C737F",
                                            fontSize: "15px",
                                            fontWeight: "500",
                                            lineHeight: "22px",
                                            textTransform: "Uppercase"
                                        }}>Business
                                            Name</Typography>
                                        <Typography variant="body2"
                                                    sx={{
                                                        color: "#111927",
                                                        fontSize: "16px",
                                                        fontWeight: "400",
                                                        lineHeight: "22px"
                                                    }}>
                                            {vendor?.name && vendor.name.charAt(0).toUpperCase() + vendor.name.slice(1)}
                                        </Typography>

                                    </Grid><Grid xs={12} md={8}>
                                    <Typography variant="title" sx={{
                                        display: "flex",
                                        direction: "row",
                                        color: "#6C737F",
                                        fontSize: "15px",
                                        fontWeight: "500",
                                        lineHeight: "22px",
                                        textTransform: "Uppercase"
                                    }}>Pan
                                        Number </Typography>
                                    <Typography variant="body2"
                                                sx={{
                                                    color: "#111927",
                                                    fontSize: "16px",
                                                    fontWeight: "400",
                                                    lineHeight: "22px"
                                                }}> {vendor?.panNumber}</Typography>

                                </Grid><Grid xs={12} md={4}>

                                </Grid><Grid xs={12} md={4}>
                                    <Typography variant="title" sx={{
                                        display: "flex",
                                        direction: "row",
                                        color: "#6C737F",
                                        fontSize: "15px",
                                        fontWeight: "500",
                                        lineHeight: "22px",
                                        textTransform: "Uppercase"
                                    }}>GST
                                        Number</Typography>
                                    <Typography variant="body2"
                                                sx={{
                                                    color: "#111927",
                                                    fontSize: "16px",
                                                    fontWeight: "400",
                                                    lineHeight: "22px"
                                                }}> {vendor?.gstNumber}</Typography>

                                </Grid>
                                </Grid>
                            </CardContent>

                        </Card></Container>
                    </Stack></Container></Box>
        </>
    );
};

export const getServerSideProps = async (context) => {
    const token = context.req.cookies.accessToken;
    const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
        endpoints.userManagement.vendors.index +
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

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
