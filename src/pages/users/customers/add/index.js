import {useCallback, useEffect, useState} from 'react';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import {RouterLink} from 'src/components/router-link';
import {Seo} from 'src/components/seo';
import {Layout as DashboardLayout} from 'src/layouts/admin-dashboard';
import {paths} from 'src/paths';
import {AddForm} from "@/custom-components/users/AddForm";

const Page = () => {
    const [open, setopen] = useState(false);
    return (
        <>
            <Seo title="Dashboard: Customer Edit"/>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
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
                                    href={paths.userManagement.customers.index}
                                    sx={{
                                        alignItems: 'center',
                                        display: 'inline-flex'
                                    }}
                                    underline="hover"
                                >
                                    <SvgIcon sx={{mr: 1}}>
                                        <ArrowLeftIcon/>
                                    </SvgIcon>
                                </Link>
                                <Typography variant="h4">Create Customer</Typography>
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
                            {/*      href={paths.userManagement.customers.index}*/}
                            {/*      variant="subtitle2"*/}
                            {/*  >*/}
                            {/*    Customer List*/}
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
                        <AddForm  setOpen={setopen}/>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};
Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);
export default Page;