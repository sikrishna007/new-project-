import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import {RouterLink} from "src/components/router-link";

import {Layout as DashboardLayout} from "src/layouts/admin-dashboard";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import User01Icon from "@untitled-ui/icons-react/build/esm/User01";
import {paths} from "@/paths";
import {Email, Phone} from "@mui/icons-material";
import {endpoints} from "@/endpoints";
import {useRouter} from "next/router";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {BreadcrumbsSeparator} from "../../../../components/breadcrumbs-separator";
import Divider from "@mui/material/Divider";
import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";
import React from "react";
import RoleBasedView from "@/contexts/roleAut/RoleBasedView";

const statusOptions = ["Canceled", "Complete", "Rejected"];


const Page = ({employee}) => {
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
                                        href={paths.userManagement.employees.index}

                                        underline="hover"
                                    >
                                        <SvgIcon sx={{marginTop: "10px"}}>
                                            <ArrowLeftIcon/>
                                        </SvgIcon>
                                    </Link>
                                    <Typography variant="h4">User Information</Typography>
                                </div>
                                <RoleBasedView permissions={["ADMIN"]}>
                                {employee?.isActive ? (
                                    <Button
                                        onClick={() =>
                                            router.push(paths.userManagement.employees.edit + employee.id)
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
                            <div style={{marginLeft: '2.5%', marginTop: '0.5%'}}>
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
                                        href={paths.userManagement.employees.index}
                                        variant="subtitle2"
                                    >
                                        Employees
                                    </Link>
                                    <Typography
                                        color="text.primary"
                                        variant="subtitle2"
                                        sx={{marginLeft: '-18%'}}
                                    >
                                        Employee Info
                                    </Typography>
                                </Breadcrumbs>

                            </div>
                        </Container>

                        <Container sx={{display: "flex", mt: 5}}>

                            <Card sx={{width: "40%"}}>
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
                                            {employee.user?.firstName} {" "}
                                            {employee.user?.lastName}
                                        </Typography>
                                    </Stack>
                                        <Stack>
                                            <Typography
                                                variant="subtitle"> {employee.user?.role.name}</Typography>
                                        </Stack>
                                        <Stack alignItems="center" spacing={1}>
                                            <Typography align="center">
                                                <SvgIcon sx={{
                                                    fontSize: "13px",
                                                    marginRight: "5px",
                                                }}><Email/></SvgIcon>
                                                {employee.user?.emailId}</Typography>
                                            <Typography variant="subtitle2">
                                                <SvgIcon sx={{
                                                    fontSize: "13px",
                                                    marginRight: "5px",
                                                }}><Phone/></SvgIcon>
                                                {employee.user?.phoneNumber}
                                            </Typography>
                                        </Stack>
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
                                                        }}> {employee.user?.addresses[0]?.addressLine1}</Typography>
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
                                                        }}>{employee.user?.addresses[0]?.addressLine2}</Typography>
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
                                                        }}>{employee.user?.addresses[0]?.city}</Typography>
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
                                                        }}>{employee.user?.addresses[0]?.state}</Typography>
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
                                                        }}> {employee.user?.addresses[0]?.country}</Typography>
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
                                                        }}> {employee.user?.addresses[0]?.pincode}</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Container>
                        <Container sx={{mt: 5}}>
                            <Card>
                            <CardHeader title="Additional Information"/>
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
                                        }}>Employee
                                            ID </Typography>
                                        <Typography variant="body2"
                                                    sx={{
                                                        color: "#111927",
                                                        fontSize: "16px",
                                                        fontWeight: "400",
                                                        lineHeight: "22px"
                                                    }}>{employee?.empId}</Typography>

                                    </Grid>
                                    <Grid xs={12} md={4}>
                                        <Typography variant="title" sx={{
                                            display: "flex",
                                            direction: "row",
                                            color: "#6C737F",
                                            fontSize: "15px",
                                            fontWeight: "500",
                                            lineHeight: "22px",
                                            textTransform: "Uppercase"
                                        }}>
                                            PAN Number </Typography>
                                        <Typography variant="body2"
                                                    sx={{
                                                        color: "#111927",
                                                        fontSize: "16px",
                                                        fontWeight: "400",
                                                        lineHeight: "22px"
                                                    }}> {employee?.panNumber}</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>

                        </Card></Container>
                    </Stack></Container></Box>
        </>
    );
};

export const getServerSideProps = async (context) => {
    const id = context.req.cookies.id;
    const token = context.req.cookies.accessToken;
    const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
        endpoints.userManagement.employees.index +
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
                employee: {},
                address: {}
            },
        };
    }
    const {data} = await res.json();
    // console.log(res, data)
    return {
        props: {
            employee: data[0],
        },
    };
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
