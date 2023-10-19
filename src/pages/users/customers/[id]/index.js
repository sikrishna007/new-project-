import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import {RouterLink} from "src/components/router-link";

import {Layout as DashboardLayout} from "src/layouts/admin-dashboard";
import {paths} from "src/paths";
import Card from "@mui/material/Card";
import {endpoints} from "@/endpoints";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import User01Icon from "@untitled-ui/icons-react/build/esm/User01";
import {useRouter} from "next/router";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {Block, Email, Pending, Phone} from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import React, {useState} from "react";
import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";
import {SeverityPill} from "@/components/severity-pill";
import VerifiedIcon from "@mui/icons-material/Verified";
import RoleBasedView from "@/contexts/roleAut/RoleBasedView";


const Page = ({customer}) => {

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
                                    href={paths.userManagement.customers.index}

                                    underline="hover"
                                >
                                    <SvgIcon sx={{marginTop: "10px"}}>
                                        <ArrowLeftIcon/>
                                    </SvgIcon>
                                </Link>
                                <Typography variant="h4">User Information</Typography>
                            </div>
                            <Stack direction="row" spacing={2} >
                                {customer.isBusinessCustomer ? (customer?.isVerified ? (
                                        <SeverityPill color="success"><VerifiedIcon/> VERIFIED</SeverityPill>) :
                                    (customer?.isRejected ? (<SeverityPill
                                        color="error"><Block/> REJECTED</SeverityPill>) : (
                                        <SeverityPill
                                            color="warning"><Pending/> PENDING</SeverityPill>))):""}
                                <RoleBasedView permissions={["ADMIN","SALES MANGER"]}>
                                {customer?.isActive ? (
                                    <Button
                                        onClick={() =>
                                            router.push(paths.userManagement.customers.edit + customer.id)
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
                            </Stack>

                        </div>
                        <div style={{marginLeft: '1.8%', marginTop: '0.5%'}}>
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
                                    href={paths.userManagement.customers.index}
                                    variant="subtitle2"
                                >
                                    Customers
                                </Link>
                                <Typography
                                    color="text.primary"
                                    variant="subtitle2"
                                    sx={{marginLeft: '-18%'}}
                                >
                                    Customer Info
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
                                        {customer.user?.firstName}{' '}
                                        {customer.user?.lastName}
                                    </Typography>
                                </Stack>
                                    <Stack>
                                        <Typography
                                            variant="subtitle"> {customer.user?.role.name}</Typography>
                                    </Stack>
                                    <Stack alignItems="center" spacing={1}>
                                        <Typography align="center">
                                            <SvgIcon sx={{
                                                fontSize: "13px",
                                                marginRight: "5px",
                                            }}><Email/></SvgIcon>
                                            {customer.user?.emailId}</Typography>
                                        <Typography variant="subtitle2">
                                            <SvgIcon sx={{
                                                fontSize: "13px",
                                                marginRight: "5px",
                                            }}><Phone/></SvgIcon>
                                            {customer.user?.phoneNumber}
                                        </Typography>
                                    </Stack></Stack>
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
                                                        }}> {customer.user?.addresses[0]?.addressLine1}</Typography>
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
                                                        }}> {customer.user?.addresses[0]?.addressLine2}</Typography>
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
                                                        }}> {customer.user?.addresses[0]?.city}</Typography>
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
                                                        }}> {customer.user?.addresses[0]?.state}</Typography>
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
                                                        }}> {customer.user?.addresses[0]?.country}</Typography>
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
                                                        }}> {customer.user?.addresses[0]?.pincode}</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Container>
                        <Container sx={{mt: 5}}><Card>

                            <CardHeader title="Additional Information"/>
                            <CardContent sx={{marginLeft: "5%"}}>
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
                                            }}>Pan
                                            Number</Typography>
                                        <Typography variant="body2"
                                                    sx={{marginLeft: "2%"}}> {customer?.panNumber}</Typography>

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
                                            }}>Aadhaar
                                            Number</Typography>
                                        <Typography variant="body2"
                                                    sx={{marginLeft: "2%"}}> {customer?.gstNumber}</Typography>
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
        endpoints.userManagement.customers.index +
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
                customer: {},

            },
        };
    }
    const {data} = await res.json();
    return {
        props: {
            customer: data[0],
        },
    };
};

Page.getLayout = (page) =>
    <DashboardLayout>{page}</DashboardLayout>
;

export default Page;
//
//
//     <Stack sx={{
//     alignItems: 'center',
//
// }} spacing={4}>
//     <div>
//         <Grid
//             sx={{
//                 alignItems: 'center',
//             }}
//             container
//             spacing={4}
//         >
//             <Grid
//                 sx={{
//                     alignItems: 'center', textAlign: 'center'
//                 }}
//                 xs={12}
//                 lg={4}
//                 spacing={4}
//             >
//                 <Stack
//
//                     spacing={8}>
//                     <Card
//                     >
//                         <CardContent
//
//                         >
//                             <Grid
//
//                             >
//                                 <Grid>
//                                     <Stack
//                                     >
//                                         <Stack
//                                             sx={{
//                                                 margin: "0 auto"
//                                             }}
//                                             alignItems="center"
//                                             direction="row"
//                                             spacing={1}
//                                         >
//                                             <Box
//                                                 sx={{
//                                                     borderColor: 'neutral.300',
//                                                     borderRadius: '50%',
//                                                     borderStyle: 'dashed',
//                                                     borderWidth: 1,
//                                                     p: '4px'
//                                                 }}
//                                             >
//                                                 <Box
//                                                     sx={{
//                                                         borderRadius: '50%',
//                                                         height: '100%',
//                                                         width: '100%',
//                                                         position: 'relative'
//                                                     }}
//                                                 >
//                                                     <Box
//                                                         sx={{
//                                                             alignItems: 'center',
//                                                             backgroundColor: (theme) => alpha(theme.palette.neutral[700], 0.5),
//                                                             borderRadius: '50%',
//                                                             color: 'common.white',
//                                                             cursor: 'pointer',
//                                                             display: 'flex',
//                                                             height: '100%',
//                                                             justifyContent: 'center',
//                                                             left: 0,
//                                                             opacity: 0,
//                                                             position: 'absolute',
//                                                             top: 0,
//                                                             width: '100%',
//                                                             zIndex: 1,
//                                                             '&:hover': {
//                                                                 opacity: 1
//                                                             }
//                                                         }}
//                                                     >
//                                                         <Stack
//                                                             alignItems="center"
//                                                             direction="row"
//                                                             spacing={1}
//                                                         >
//                                                             <SvgIcon color="inherit">
//                                                                 <Camera01Icon/>
//                                                             </SvgIcon>
//                                                             <Typography
//                                                                 color="inherit"
//                                                                 variant="subtitle2"
//                                                                 sx={{fontWeight: 700}}
//                                                             >
//                                                                 Select
//                                                             </Typography>
//                                                         </Stack>
//                                                     </Box>
//                                                     <Avatar
//
//                                                         sx={{
//                                                             height: 100,
//                                                             width: 100
//                                                         }}
//                                                     >
//                                                         <SvgIcon>
//                                                             <User01Icon/>
//                                                         </SvgIcon>
//                                                     </Avatar>
//                                                 </Box>
//                                             </Box>
//
//                                         </Stack>
//                                         <Stack
//
//                                         >
//                                             <Typography spacing={3}
//                                                         variant="h6"> {customer.user?.firstName +
//                                                 " " +
//                                                 customer.user?.lastName}</Typography>
//                                         </Stack>
//                                         <Stack
//                                         >
//                                             <Typography>
//                                                 <SvgIcon sx={{
//                                                     fontSize: "13px",
//                                                     marginRight: "5px",
//                                                 }}><Email/></SvgIcon>
//                                                 {customer.user?.emailId}</Typography>
//                                             <Typography variant="subtitle2">
//                                                 <SvgIcon sx={{
//                                                     fontSize: "13px",
//                                                     marginRight: "5px",
//                                                 }}><Phone/></SvgIcon>
//                                                 {customer.user?.phoneNumber}
//                                             </Typography>
//                                         </Stack>
//                                         <Stack
//
//                                             alignItems="center" direction="row" spacing={2}>
//                                             <Button sx={{
//                                                 margin: "0 auto"
//                                             }}
//                                                     variant="contained"
//                                                     endIcon={
//                                                         <SvgIcon>
//                                                             <Edit02Icon/>
//                                                         </SvgIcon>
//                                                     }
//                                             >
//                                                 Update Picture
//                                             </Button>
//
//                                         </Stack>
//
//                                     </Stack>
//                                 </Grid>
//                             </Grid>
//                         </CardContent>
//                     </Card>
//
//                 </Stack>
//             </Grid>
//             <Grid
//                 xs={12}
//                 lg={8}
//             >
//                 <Stack spacing={3}>
//                     <Card sx={{paddingBottom: "1%", paddingLeft: "8%"}}>
//                         <CardHeader title="addresses"/>
//                         <PropertyList>
//                             <Grid container spacing={2}>
//
//                                 <Grid xs={12} md={5}>
//                                     <PropertyListItem
//                                         label="addresses Line 1"
//                                         value={customer.user?.addresses[0]?.addressLine1}
//                                     />
//                                 </Grid>
//                                 <Grid xs={12} md={5}>
//                                     <PropertyListItem
//                                         label="addresses Line 2"
//                                         value={customer.user?.addresses[0]?.addressLine2}
//                                     />
//                                 </Grid> <Grid xs={12} md={5}>
//                                 <PropertyListItem label="Country" value={customer.user?.addresses[0]?.country}/>
//                             </Grid>
//                                 <Grid xs={12} md={5}>
//                                     <PropertyListItem label="State" value={customer.user?.addresses[0]?.state}/>
//                                 </Grid>
//                                 <Grid xs={12} md={5}>
//                                     <PropertyListItem label="City" value={customer.user?.addresses[0]?.city}/>
//                                 </Grid>
//                                 <Grid xs={12} md={5}>
//                                     <PropertyListItem label="Pin Code"
//                                                       value={customer.user?.addresses[0]?.pincode}/>
//                                 </Grid>
//                             </Grid>
//                         </PropertyList>
//                         {/* <CardActions>
//         <Button
//           color="inherit"
//           size="small"
//         >
//           Reset Password
//         </Button>
//       </CardActions> */}
//                     </Card>
//                 </Stack>
//             </Grid>
//
//
//         </Grid>
//         <Grid
//             sx={{mt: 4,}}
//         >
//             <Card sx={{paddingBottom: "1%"}}>
//                 <CardHeader title="Additional Information"/>
//                 <PropertyList>
//                     <Grid container spacing={3}>
//                         <Grid xs={12} md={4}>
//                             <PropertyListItem
//                                 label="GSTIN"
//                                 value={customer?.gstNumber}
//                             />
//                         </Grid>
//                         <Grid xs={12} md={4}>
//                             <PropertyListItem
//                                 label="Pan Number"
//                                 value={customer?.panNumber}
//                             /></Grid>
//                     </Grid>
//                 </PropertyList>
//                 {/* <CardActions>
//         <Button
//           color="inherit"
//           size="small"
//         >
//           Reset Password
//         </Button>
//       </CardActions> */}
//             </Card>
//         </Grid>
//     </div>
// </Stack>
//