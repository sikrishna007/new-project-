import {Layout as DashboardLayout} from "../../../../layouts/admin-dashboard";
import React from "react";
import {endpoints} from "../../../../endpoints";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import {RouterLink} from "../../../../components/router-link";
import {paths} from "../../../../paths";
import SvgIcon from "@mui/material/SvgIcon";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import Typography from "@mui/material/Typography";
import FilePresentIcon from '@mui/icons-material/FilePresent';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import {SeverityPill} from "../../../../components/severity-pill";
import Stack from "@mui/material/Stack";

const Page = ({customer}) => {
    return (
        <>
            <Box sx={{ p: 2}}  >
                <Container spacing={3}>
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
                                    href={paths.kycVerification.businessCustomer.index}

                                    underline="hover"
                                >
                                    <SvgIcon sx={{marginTop: "10px"}}>
                                        <ArrowLeftIcon/>
                                    </SvgIcon>
                                </Link>
                                <Typography variant="h4">KYC Information</Typography>
                            </div>
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
                                    href={paths.kycVerification.businessCustomer.index}
                                    variant="subtitle2"
                                >
                                    customers
                                </Link>
                                <Typography
                                    color="text.primary"
                                    variant="subtitle2"
                                    sx={{marginLeft: '-18%'}}
                                >
                                    customer KYC Info
                                </Typography>
                            </Breadcrumbs>

                        </div>
                    </Container>
                    <Container sx={{mt: 5}}><Card>

                        <CardHeader title="Business Customer"/>
                        <CardContent sx={{marginLeft:"5%"}}>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="title" sx={{color: "#6C737F",
                                            fontSize: "15px",
                                            fontWeight: "500",}}>
                                            BUSINESS NAME
                                        </Typography>
                                        <Typography variant="body2"  sx={{ color: "#111927",
                                            fontSize: "16px",
                                            fontWeight: "400",lineHeight: "22px"}}>
                                            {customer?.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="title" sx={{color: "#6C737F",
                                            fontSize: "15px",
                                            fontWeight: "500",}}>
                                            Email
                                        </Typography>
                                        <Typography variant="body2"  sx={{ color: "#111927",
                                            fontSize: "16px",
                                            fontWeight: "400",lineHeight: "22px"}}>
                                            {customer.user?.emailId}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="title" sx={{color: "#6C737F",
                                            fontSize: "15px",
                                            fontWeight: "500",}}>
                                            Status
                                        </Typography>
                                        <Typography variant="body2"  sx={{ color: "#111927",
                                            fontSize: "16px",
                                            fontWeight: "400",lineHeight: "22px"}}>
                                            {customer?.user.kycStatus.status === "verified" ? (
                                                    <SeverityPill color="success">VERIFIED</SeverityPill>) :
                                                (customer?.user.kycStatus.status === "rejected"  ? (<SeverityPill
                                                    color="error">REJECTED</SeverityPill>) : (
                                                    <SeverityPill
                                                        color="warning">PENDING</SeverityPill>))}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="title" sx={{color: "#6C737F",
                                            fontSize: "15px",
                                            fontWeight: "500",}}>
                                            NAME
                                        </Typography>
                                        <Typography variant="body2"  sx={{ color: "#111927",
                                            fontSize: "16px",
                                            fontWeight: "400",lineHeight: "22px"}}>
                                            {customer.user?.firstName+" "+customer.user?.lastName}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="title" sx={{color: "#6C737F",
                                            fontSize: "15px",
                                            fontWeight: "500",}}>
                                            PAN NUMBER
                                        </Typography>
                                        <Typography variant="body2"  sx={{ color: "#111927",
                                            fontSize: "16px",
                                            fontWeight: "400",lineHeight: "22px"}}>
                                            {customer?.panNumber}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Typography variant="title" sx={{color: "#6C737F",
                                            fontSize: "15px",
                                            fontWeight: "500",}}>
                                            PHONE
                                        </Typography>
                                        <Typography variant="body2"  sx={{ color: "#111927",
                                            fontSize: "16px",
                                            fontWeight: "400",lineHeight: "22px"}}>
                                            {customer.user?.phoneNumber}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>

                    </Card></Container>
                    <Container sx={{mt: 5}}>
                        <Card>
                            <CardHeader title="GST Details"/>
                            <CardContent sx={{marginLeft:"5%"}}>
                                <Stack direction="row" justifyContent="space-between"sx={{
                                    "@media (max-width:700px)": { flexDirection: 'column' },
                                    '& > *:not(:last-child)': {
                                        marginBottom: 3, // Adjust the value as needed
                                    },
                                }}
                                >
                                    <Stack>
                                        <Typography variant="title" sx={{color: "#6C737F",
                                            fontSize: "15px",
                                            fontWeight: "500",}}>
                                            GST NUMBER
                                        </Typography>
                                        <Typography variant="body2"  sx={{ color: "#111927",
                                            fontSize: "16px",
                                            fontWeight: "400",lineHeight: "22px"}}>
                                            {customer?.gstNumber}
                                        </Typography>
                                    </Stack>
                                    <Stack>
                                        <div
                                            style={{
                                                display:"flex",
                                                border: '1px solid #ccc',
                                                borderRadius:"5px",
                                                backgroundColor: "#cfcfcf",
                                                padding: '10px',
                                                cursor: 'pointer',
                                                width: '250px',
                                                margin: '10px',
                                                textAlign: 'center',
                                            }}
                                        >

                                            <div>
                                                <FilePresentIcon style={{ marginRight: '10px' }} /></div>
                                            <div style={{display:"flex",flexDirection: 'column'}}>
                                                <u style={{  color:"#4338CA",}}>GST Document.pdf</u>{/*<span sx={{float:"left"}}>1.5Mb</span>*/}</div>
                                        </div>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Container>
                    <Container sx={{mt: 5}}>
                        <Card>
                            <CardHeader title="PAN Details"/>
                            <CardContent sx={{marginLeft:"5%"}}>
                                <Stack direction="row" justifyContent="space-between"sx={{
                                    "@media (max-width:700px)": { flexDirection: 'column' },
                                    '& > *:not(:last-child)': {
                                        marginBottom: 3, // Adjust the value as needed
                                    },
                                }}
                                >
                                    <Stack>
                                        <Typography variant="title" sx={{color: "#6C737F",
                                            fontSize: "15px",
                                            fontWeight: "500",}}>
                                            PAN NUMBER
                                        </Typography>
                                        <Typography variant="body2"  sx={{ color: "#111927",
                                            fontSize: "16px",
                                            fontWeight: "400",lineHeight: "22px"}}>
                                            {customer?.panNumber}
                                        </Typography>
                                    </Stack>
                                    <Stack>
                                        <div
                                            style={{
                                                display:"flex",
                                                border: '1px solid #ccc',
                                                borderRadius:"5px",
                                                backgroundColor: "#cfcfcf",
                                                padding: '10px',
                                                cursor: 'pointer',
                                                width: '250px',
                                                margin: '10px',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <input
                                                type="file"
                                                style={{ display: 'none' }}
                                                disabled={true}

                                            />
                                            <div>
                                                <FilePresentIcon style={{ marginRight: '10px' }} /></div>
                                            <div style={{display:"flex",flexDirection: 'column'}}>
                                                <u style={{ color:"#4338CA",}}>PAN Document.pdf</u>{/*<span sx={{float:"left"}}>1.5Mb</span>*/}</div>
                                        </div>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Container>
                </Container>
            </Box>
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

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

