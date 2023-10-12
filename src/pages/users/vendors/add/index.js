import {useCallback, useEffect, useState} from "react";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import {RouterLink} from "src/components/router-link";
import {Seo} from "src/components/seo";
import {useMounted} from "src/hooks/use-mounted";
import {Layout as DashboardLayout} from "src/layouts/admin-dashboard";
import {paths} from "src/paths";
import {AddForm} from "@/custom-components/users/AddForm";

const Page = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Seo title="User Management: Create Vendor"/>
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
                                    sx={{
                                        alignItems: "center",
                                        display: "inline-flex",
                                    }}
                                    underline="hover"
                                >
                                    <SvgIcon sx={{mr: 1}}>
                                        <ArrowLeftIcon/>
                                    </SvgIcon>
                                </Link>
                                <Typography variant="h4">Create Vendor</Typography>
                            </div>
                            {/*<div style={{marginLeft: '3%', marginTop: '0.5%'}}>*/}
                            {/*    <Breadcrumbs*/}
                            {/*    separator={<BreadcrumbsSeparator/>}>*/}
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
                            {/*    Create*/}
                            {/*  </Typography>*/}
                            {/*</Breadcrumbs>*/}
                            {/*</div>*/}
                        </Stack>
                        <AddForm setState={setOpen}/>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
// export const getServerSideProps = async (context) => {
//   // console.log(context.req.cookies.username)
//   const token = context.req.cookies.accessToken;
//   const res = await fetch(
//     process.env.NEXT_PUBLIC_BASE_URL + endpoints.countries.index,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   if (!res.ok) {
//     return {
//       props: {
//         category: {},
//       },
//     };
//   }
//   const { data } = await res.json();
//   console.log(data);
//   return {
//     props: {
//       countries: data,
//     },
//   };
// };
export default Page;