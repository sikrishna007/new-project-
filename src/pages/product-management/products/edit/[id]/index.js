import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {RouterLink} from 'src/components/router-link';
import {Seo} from 'src/components/seo';
import {usePageView} from 'src/hooks/use-page-view';
import {Layout as DashboardLayout} from 'src/layouts/admin-dashboard';
import {paths} from 'src/paths';
import SvgIcon from "@mui/material/SvgIcon";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import {endpoints} from "../../../../../endpoints";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import {ToastError} from "../../../../../icons/ToastError";
import * as React from "react";
import {useEffect, useState} from "react";
import {ProductEditForm} from "@/custom-components/product-edit-form";

const Page = ({product}) => {
    usePageView();
    return (
        <>
            <Seo title="Dashboard: Product Create"/>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack spacing={1}>
                            <div
                                style={{
                                    alignItems: "center",
                                    display: "flex",
                                }}
                            >
                                <Link
                                    color="text.primary"
                                    component={RouterLink}
                                    href={paths.productManagement.products.index}

                                    underline="hover"
                                >
                                    <SvgIcon sx={{mr: 1}}>
                                        <ArrowLeftIcon/>
                                    </SvgIcon>
                                </Link>
                                <Typography variant="h4">
                                    Edit product
                                </Typography>

                            </div>
                            {/*<div style={{marginLeft: '2.7%', marginTop: '0.5%'}}>*/}
                            {/*    <Breadcrumbs*/}
                            {/*    separator={<BreadcrumbsSeparator/>}>*/}
                            {/*    <Link*/}
                            {/*        color='#4338CA'*/}
                            {/*        component={RouterLink}*/}
                            {/*        href={paths.dashboard.index}*/}
                            {/*        variant="subtitle2"*/}
                            {/*    >*/}
                            {/*        Dashboard*/}
                            {/*    </Link>*/}
                            {/*    <Link*/}
                            {/*        color='#4338CA'*/}
                            {/*        component={RouterLink}*/}
                            {/*        href={paths.productListing.products.index}*/}
                            {/*        variant="subtitle2"*/}
                            {/*    >*/}
                            {/*        Product List*/}
                            {/*    </Link>*/}
                            {/*    <Typography*/}
                            {/*        color="text.primary"*/}
                            {/*        variant="subtitle2"*/}
                            {/*    >*/}
                            {/*        Create*/}
                            {/*    </Typography>*/}
                            {/*</Breadcrumbs>*/}
                            {/*</div>*/}
                        </Stack>
                        <ProductEditForm product={product} vendor={product.vendor}/>
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

export const getServerSideProps = async (context) => {

    const token = context.req.cookies.accessToken;
    const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
        endpoints.product.index +
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
                product: {},
            },
        };
    }
    const {data} = await res.json();
    return {
        props: {
            product: data[0],
        },
    };
};

export default Page;
