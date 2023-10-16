import {useRouter} from "next/router";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import SvgIcon from "@mui/material/SvgIcon";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Edit02Icon from "@untitled-ui/icons-react/build/esm/Edit02";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import ArrowRightSharpIcon from "@mui/icons-material/ArrowRightSharp";
import React from "react";
import {RouterLink} from "@/components/router-link";
import {endpoints} from "@/endpoints";
import {paths} from "src/paths";

const HsnSacId = ({CodeName, codePath, customer}) => {


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
                    <Stack >
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
                                        href={`/setup/${codePath}`}
                                        underline="hover"
                                    >
                                        <SvgIcon sx={{marginTop: "10px"}}>
                                            <ArrowLeftIcon/>
                                        </SvgIcon>
                                    </Link>
                                    <Typography variant="h4">{CodeName} Code Information</Typography>
                                </div>
                                <Button
                                    onClick={() =>
                                        router.push(`/setup/${codePath}/edit/${customer.id}`)
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
                            </div>
                            <div style={{marginLeft: '2.4%', marginTop: '0.5%'}}>
                                <Breadcrumbs separator={<ArrowRightSharpIcon style={{marginLeft: '-40%'}}/>} sx={{color:"#4338CA"}}>
                                    <Link
                                        color='#4338CA'
                                        component={RouterLink}
                                        href={`/setup/${codePath}`}
                                        variant="subtitle2"
                                    >
                                        {CodeName} Codes
                                    </Link>
                                    <Typography
                                        color="text.primary"
                                        variant="subtitle2"
                                        sx={{marginLeft:'-19%'}}
                                    >
                                        {CodeName} Code Info
                                    </Typography>

                                </Breadcrumbs>

                            </div>
                        </Container>
                        <Container sx={{mt:5}}>
                            <Card>
                                <CardHeader sx={{marginLeft:"2.7%"}} title={`${CodeName} Code : ${customer?.code}`}/>
                                <CardContent sx={{marginLeft:"5%", marginTop: "1.5%"}}>
                                    <Grid container spacing={3}>
                                        <Grid xs={12} md={4} sx={{display:"flex"}} >
                                            <Typography variant="title" sx={{ fontWeight: 'medium' }} >SGST: </Typography>
                                            <Typography variant="body1" sx={{marginLeft:"2%"}}> {customer?.sgstPercentage}%</Typography>
                                        </Grid>
                                        <Grid xs={12} md={4} sx={{display:"flex"}} >
                                            <Typography variant="title" sx={{ fontWeight: 'medium' }} >CGST: </Typography>
                                            <Typography variant="body1" sx={{marginLeft:"2%"}}> {customer?.cgstPercentage}%</Typography>
                                        </Grid>
                                        <Grid xs={12} md={4} sx={{display:"flex"}} >
                                            <Typography variant="title" sx={{ fontWeight: 'medium' }} >IGST: </Typography>
                                            <Typography variant="body1" sx={{marginLeft:"2%"}}> {customer?.igstPercentage}%</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={3} sx={{marginTop:"4%"}}>
                                        <Typography variant="title" sx={{display:"flex",direction:"row",fontWeight: 'medium'}}  >DESCRIPTION : </Typography>
                                        <Typography variant="body1" sx={{marginLeft:"2%"}}> {customer?.description}</Typography>
                                    </Grid>
                                </CardContent>

                            </Card></Container>
                    </Stack></Container></Box>
        </>
    );
};


export default HsnSacId;