import {useState} from "react";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import {RouterLink} from "src/components/router-link";
import {Seo} from "src/components/seo";
import {paths} from "src/paths";
import {Layout as DashboardLayout} from "src/layouts/admin-dashboard";
import {endpoints} from "@/endpoints";
import {EditForm} from "@/custom-components/users/EditForm";


const Page = ({vendor}) => {
    const [open, setOpen] = useState(false);


    return (
        <>
            <Seo title="User Management: Edit User"/>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="lg">
                    <Stack spacing={4}>
                        <Stack spacing={4}>
                            <div
                                style={{
                                    alignItems: "center",
                                    display: "flex",
                                }}
                            >
                                <Link
                                    color="text.primary"
                                    component={RouterLink}
                                    href={paths.userManagement.vendors.index}

                                    underline="hover"
                                >
                                    <SvgIcon sx={{mr: 1}}>
                                        <ArrowLeftIcon/>
                                    </SvgIcon>
                                </Link>
                                <Typography variant="h4">Edit Vendor</Typography>

                            </div>
                            {/*<div style={{marginLeft:'2.7%', marginTop:0}}> */}
                            {/*  <Breadcrumbs separator={<BreadcrumbsSeparator/>} >*/}
                            {/*  <Link*/}
                            {/*      color='#4338CA'*/}
                            {/*      component={RouterLink}*/}
                            {/*      href={paths.dashboard.index}*/}
                            {/*      variant="subtitle2"*/}
                            {/*  >*/}
                            {/*    Dashboard*/}
                            {/*  </Link>*/}
                            {/*  <Link*/}
                            {/*      color='#4338CA'*/}
                            {/*      component={RouterLink}*/}
                            {/*      href={paths.userManagement.vendors.index}*/}
                            {/*      variant="subtitle2"*/}
                            {/*  >*/}
                            {/*    Vendor List*/}
                            {/*  </Link>*/}
                            {/*  <Typography*/}
                            {/*      color="text.primary"*/}
                            {/*      variant="subtitle2"*/}
                            {/*  >*/}
                            {/*    Edit*/}
                            {/*  </Typography>*/}
                            {/*</Breadcrumbs>*/}
                            {/*</div>*/}      </Stack>
                        <EditForm customer={vendor} setOpen={setOpen}/>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps = async (context) => {
    const token = context.req.cookies.accessToken;
    // console.log(token);
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
    // console.log(data);
    return {
        props: {
            vendor: data[0],
        },
    };
};

export default Page;
