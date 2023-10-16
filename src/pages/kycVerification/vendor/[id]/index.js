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

const Page = ({vendor}) => {
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const handleCreateDialogOpen = () => {
        setCreateDialogOpen(true);
    };

    const handleCreateDialogClose = (formik) => {

        setCreateDialogOpen(false);
    };

    const [commonDialogData, setCommonDialogData] = React.useState({
        vendorIsVerify: false,
        vendorId: '',
        dialogIsOpen: false,
        vendorName: '',
        name:''
    })
    const verify_reject = async (id, temp) => {
       console.log("ok")
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
                                          {vendor?.isVerified ? (
                                                  <SeverityPill color="success">VERIFIED</SeverityPill>) :
                                              (vendor?.isRejected ? (<SeverityPill
                                                  color="error">REJECT</SeverityPill>) : (
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
                                          {vendor?.gstNumber}
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
                                          {vendor?.panNumber}
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
                  <Container sx={{mt:5}}>  <Stack
                      alignItems="center"
                      direction="row"
                      justifyContent="flex-end"
                      spacing={1}
                  >
                      <Button
                          onClick={() => setCommonDialogData({
                              vendorIsVerify: false,
                              dialogIsOpen: true,
                              vendorName: vendor?.name,
                              name:vendor?.user.firstName,
                              vendorId: vendor?.id
                          })}
                          color="error"
                          size="small"
                          variant="outlined"
                      >
                          Reject
                      </Button>
                      <Button  onClick={() => setCommonDialogData({
                          vendorIsVerify: true,
                          dialogIsOpen: true,
                          vendorName: vendor?.name,
                          name:vendor?.user.firstName,
                          vendorId: vendor?.id
                      })} variant="contained">
                          Verify
                      </Button>
                  </Stack>
                      <CommonDialog
                          title={"Save"}
                          onConfirm={() => {
                              if (commonDialogData.vendorIsVerify) {
                                  // console.log("Deactivate", commonDialogData.vendorName, commonDialogData.vendorId)
                                  // Deactivate logic
                                  verify_reject(commonDialogData.vendorId, "false");
                              } else {
                                  // console.log("Activate", commonDialogData.vendorName, commonDialogData.vendorId)
                                  // Activate logic
                                  verify_reject(commonDialogData.vendorId, "true");
                              }
                              setCommonDialogData({
                                  vendorIsActive: false,
                                  dialogIsOpen: false,
                                  vendorName: '',
                                  name:'',
                                  vendorId: ''
                              })

                          }}
                          onClose={handleCreateDialogClose}
                          open={createDialogOpen}
                          description={"Are you sure you want to Change Details ?"}
                      /></Container>
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

