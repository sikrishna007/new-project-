import {Layout as DashboardLayout} from "../../../../layouts/admin-dashboard";
import React, {useState} from "react";
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
import Button from "@mui/material/Button";
import CommonDialog from "../../../../custom-components/CommonDialog";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import {useRouter} from "next/router";
import {patchMethod} from "@/utils/util";

const Page = ({vendor}) => {
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const[create,setCreate]=useState(false)
    let router = useRouter();
    const handleCreateDialogOpen = (value) => {
        setCreate(value)
        setCreateDialogOpen(true);
    };

    const handleCreateDialogClose = () => {
        setCreateDialogOpen(false);
    };
    const verify_reject = async (id, temp) => {
        const path =endpoints.userManagement.vendors.index;
        let jsonString;
        if(temp === "reject"){
            const body={
                user:{
                    kycStatus:{
                        id:"7123313635396419583"
                    }
                }
            }
            jsonString= JSON.stringify(body);
        }
        else{
            const body={
                user:{
                    kycStatus:{
                        id:"7123313635396419582"
                    }
                }
            }
            jsonString= JSON.stringify(body);
        }
        const json = await patchMethod(id,jsonString,path)
        if (json.status === "Success") {
            if(temp=== "reject"){
                toast.success("Rejected");
                router.push(paths.kycVerification.vendor)
            }
            else {
                toast.success("Verified")
                router.push(paths.kycVerification.vendor)
            }
        }
    };

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
                                  href={paths.kycVerification.vendor.index}

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
                                  href={paths.kycVerification.vendor.index}
                                  variant="subtitle2"
                              >
                                  vendors
                              </Link>
                              <Typography
                                  color="text.primary"
                                  variant="subtitle2"
                                  sx={{marginLeft: '-18%'}}
                              >
                                  vendor KYC Info
                              </Typography>
                          </Breadcrumbs>

                      </div>
                  </Container>
                  <Container sx={{mt: 5}}><Card>

                      <CardHeader title="Vendor Details"/>
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
                                          {vendor?.name}
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
                                          {vendor.user?.emailId}
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
                                          {vendor?.user.kycStatus.status === "verified" ? (
                                                  <SeverityPill color="success">VERIFIED</SeverityPill>) :
                                              (vendor?.user.kycStatus.status === "rejected"  ? (<SeverityPill
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
                                          {vendor.user?.firstName+" "+vendor.user?.lastName}
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
                                          {vendor?.panNumber}
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
                                          {vendor.user?.phoneNumber}
                                      </Typography>
                                  </Grid>
                              </Grid>
                          </Box>
                      </CardContent>

                  </Card></Container>
                  <Container sx={{mt: 5}}>
                      <Card>
                          <CardHeader title="Document Details"/>
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
                                          {vendor?.gstNumber}
                                      </Typography>
                                  </Stack>
                                  <Stack>
                                      <div
                                          style={{
                                              display:"flex",
                                              border: '1px solid #ccc',
                                              borderRadius:"5px",
                                              paddingTop:"1%",
                                              justifyContent:"center",
                                              cursor: 'pointer',
                                              width: '250px',
                                              textAlign: 'center',
                                          }}
                                      >
                                          <a
                                              href={vendor.user.gstFile?.filePath}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              style={{ textDecoration: 'none', color: 'inherit' }}
                                          >
                                              <Grid container alignItems="center" spacing={1}>
                                                  <Grid item>
                                                      <img src='/assets/icons/icon-pdf.svg' alt="GST Icon" style={{ height: '50%'}} />
                                                  </Grid>
                                                  <Grid item>
                                                      <Typography variant="body1" style={{ color: '#4338CA' }}>Gst Document</Typography>
                                                  </Grid>
                                              </Grid>
                                          </a>
                                      </div>

                                  </Stack>
                              </Stack>
                          </CardContent>
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
                                          {vendor?.panNumber}
                                      </Typography>
                                  </Stack>
                                  <Stack>
                                      <div
                                          style={{
                                              display:"flex",
                                              border: '1px solid #ccc',
                                              borderRadius:"5px",
                                              paddingTop:"1%",
                                              justifyContent:"center",
                                              cursor: 'pointer',
                                              width: '250px',
                                              textAlign: 'center',
                                          }}
                                      >
                                          <a
                                              href={vendor.user.panFile?.filePath}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              style={{ textDecoration: 'none', color: 'inherit' }}
                                          >
                                              <Grid container alignItems="center" spacing={1}>
                                                  <Grid item>
                                                      <img src='/assets/icons/icon-pdf.svg' alt="Pan Icon" style={{ height: '50%'}} />
                                                  </Grid>
                                                  <Grid item>
                                                      <Typography variant="body1" style={{ color: '#4338CA' }}>Pan Document</Typography>
                                                  </Grid>
                                              </Grid>
                                          </a>
                                      </div>

                                  </Stack>
                              </Stack>
                          </CardContent>
                      </Card>
                  </Container>
                  {vendor.user.kycStatus.status === "verified"?"":<Container sx={{mt: 5}}>
                      <CardContent>
                          <Grid><Stack
                              alignItems="center"
                              direction="row"
                              justifyContent="flex-end"
                              spacing={1}
                              sx={{marginLeft: "1%"}}
                          >
                              <Button
                                  // onClick={() => router.push(paths.userManagement.vendors.index)}
                                  onClick={() => handleCreateDialogOpen(false)}
                                  color="error" size="small" variant="outlined">
                                  REJECT
                              </Button>
                              <Button onClick={() => handleCreateDialogOpen(true)}
                                      variant="contained">
                                  ACCEPT
                              </Button>
                              <CommonDialog
                                  onConfirm={() => {
                                      if (create) {
                                          handleCreateDialogClose();
                                          verify_reject(vendor.id, "Verify")
                                      } else {
                                          handleCreateDialogClose();
                                          verify_reject(vendor.id, "reject")

                                      }
                                  }}
                                  onClose={handleCreateDialogClose}
                                  open={createDialogOpen}
                                  description={create ? "Are you sure you want to ACCEPT ?" : "Are you sure you want to REJECT ?"}
                              />
                          </Stack></Grid>
                      </CardContent>
                  </Container>}
              </Container>

           </Box>
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

