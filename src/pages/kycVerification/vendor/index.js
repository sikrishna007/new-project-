import React, {useCallback, useEffect, useState} from 'react';
import {Box, Tab, Tabs} from '@mui/material';
import {Seo} from "@/components/seo";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import {Layout as DashboardLayout} from "../../../layouts/admin-dashboard";
import Cookies from "js-cookie";
import {endpoints} from "@/endpoints";
import {SeverityPill} from "@/components/severity-pill";
import Grid from "@mui/material/Unstable_Grid2";
import {PropertyList} from "../../../components/property-list";
import {PropertyListItem} from "@/components/property-list-item-custom";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import {paths} from "../../../paths";
import {useRouter} from "next/router";
import {RouterLink} from "../../../components/router-link";

const TabPanel = (props) => {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
};


const Page = () => {
    const router = useRouter();
    const [value, setValue] = useState(0);
    const [vendor, setVendor] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [count, setCount] = useState(0)
    const [activeTab, setActiveTab] = useState(0);


    const handlevendorsGet = useCallback(async (page = 0, limit = 10) => {
        // console.log(page)
        // console.log(limit);
        try {
            let token = Cookies.get("accessToken");
            const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL +
                endpoints.userManagement.vendors.index + `?pageNo=${page}&pageSize=${limit}&isActive=true&sortOn=updatedAt&sortOrder=Desc`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            setVendor(data.data)
            setCount(data.totalElements)
        } catch (err) {
            console.error(err);
        }
    }, [page, rowsPerPage]);

    const handlevendorsGetVerified = useCallback(async (page = 0, limit = 10) => {
        // console.log(page)
        // console.log(limit);
        try {
            let token = Cookies.get("accessToken");
            const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL +
                endpoints.userManagement.vendors.index + `?pageNo=${page}&pageSize=${limit}&isActive=true&sortOn=updatedAt&sortOrder=Desc&isVerified=true`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            setVendor(data.data)
            setCount(data.totalElements)


        } catch (err) {
            console.error(err);
        }
    }, [page, rowsPerPage]);

    const handlevendorsGetPending = useCallback(async (page = 0, limit = 10) => {
        // console.log(page)
        // console.log(limit);
        try {
            let token = Cookies.get("accessToken");
            const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL +
                endpoints.userManagement.vendors.index + `?pageNo=${page}&pageSize=${limit}&isActive=true&sortOn=updatedAt&sortOrder=Desc&isVerified=false`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            setVendor(data.data)
            setCount(data.totalElements)


        } catch (err) {
            console.error(err);
        }
    }, [page, rowsPerPage]);
    const handlevendorsGetRejected = useCallback(async (page = 0, limit = 10) => {
        // console.log(page)
        // console.log(limit);
        try {
            let token = Cookies.get("accessToken");
            const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL +
                endpoints.userManagement.vendors.index + `?pageNo=${page}&pageSize=${limit}&isActive=true&sortOn=updatedAt&sortOrder=Desc&isRejected=true`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            setVendor(data.data)
            setCount(data.totalElements)


        } catch (err) {
            console.error(err);
        }
    }, [page, rowsPerPage]);
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        setActiveTab(newValue)
        switch (newValue) {
            case 0:
                setRowsPerPage(10);
                setPage(0);
                handlevendorsGet(page, rowsPerPage);
                break;
            case 1:
                setRowsPerPage(10);
                setPage(0);
                handlevendorsGetVerified(page, rowsPerPage);
                break;
            case 2:
                setRowsPerPage(10);
                setPage(0);
                handlevendorsGetPending(page, rowsPerPage);
                break;
            case 3:
                setRowsPerPage(10);
                setPage(0);
                handlevendorsGetRejected(page, rowsPerPage);
                break;
            default:
                break;
        }
    };

    useEffect(
        () => {
            handlevendorsGet(page, rowsPerPage);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [page, rowsPerPage]
    );

    const handlePageChange = useCallback((event, page) => {
        // console.log(page);
        if (value === 0) {
            handlevendorsGet(page, rowsPerPage);
            setPage(page);
        }
        if (value === 1) {
            handlevendorsGetVerified(page, rowsPerPage);
            setPage(page);
        }
        if (value === 2) {
            handlevendorsGetPending(page, rowsPerPage);
            setPage(page);
        }
        if (value === 3) {
            handlevendorsGetRejected(page, rowsPerPage);
            setPage(page);
        }
    }, []);


    return (
        <div>
            <Seo title="Event Mart | KYC verification"/>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={4}>
                        <Stack sx={{marginTop: '-40px'}}
                               direction="row" justifyContent="space-between" spacing={4}>
                            <Stack spacing={1}>
                                <Typography variant="h4">KYC Verification</Typography>
                                {/*<Breadcrumbs separator={<BreadcrumbsSeparator/>}>*/}
                                {/*    <Link*/}
                                {/*        color='#4338CA'*/}
                                {/*        component={RouterLink}*/}
                                {/*        href={paths.dashboard.index}*/}
                                {/*        variant="subtitle2"*/}
                                {/*    >*/}
                                {/*        Dashboard*/}
                                {/*    </Link>*/}
                                {/*    <Typography*/}
                                {/*        color="text.primary"*/}
                                {/*        variant="subtitle2"*/}
                                {/*    >*/}
                                {/*        KYC List*/}
                                {/*    </Typography>*/}
                                {/*</Breadcrumbs>*/}
                            </Stack>
                        </Stack>
                        <Card>
                            <Stack
                                alignItems="center"
                                direction="row"
                                flexWrap="wrap"
                                spacing={3}
                                sx={{p: 3}}
                            >
                                <Tabs value={activeTab} onChange={handleTabChange}>
                                    <Tab label="ALL" onClick={(event) => handleTabChange(event, 0)} style={activeTab === 0 ? { fontWeight: 'bold' } : {}} />
                                    <Tab label="Verified" onClick={(event) => handleTabChange(event, 1)} style={activeTab === 1 ? { fontWeight: 'bold' } : {}} />
                                    <Tab label="Pending" onClick={(event) => handleTabChange(event, 2)} style={activeTab === 2 ? { fontWeight: 'bold' } : {}} />
                                    <Tab label="Reject" onClick={(event) => handleTabChange(event, 3)} style={activeTab === 3 ? { fontWeight: 'bold' } : {}} />
                                </Tabs>
                            </Stack>
                            <TabPanel value={value} index={0}>
                                <Grid
                                    sx={{mt: 4,}}
                                >
                                    {vendor.map((vendor) => {

                                        return (

                                            <Card key={vendor.id} sx={{paddingBottom: "1%", marginBottom: "2%"}}>
                                                <PropertyList>
                                                    <Grid alignItems="center" sx={{py: "4%"}} container spacing={4}>
                                                        <Grid xs={12} md={3}>
                                                            <PropertyListItem
                                                                label="Business Name"
                                                                value={vendor?.name}
                                                            />
                                                        </Grid>
                                                        <Grid xs={12} md={3}>
                                                            <PropertyListItem
                                                                label="Vendor Name"
                                                                value={vendor?.user.firstName + "" + vendor?.user.lastName}
                                                            /></Grid>
                                                        <Grid xs={12} md={2}>
                                                            <PropertyListItem
                                                                label="Phone"
                                                                value={vendor?.user.phoneNumber}
                                                            /></Grid>
                                                        <Grid xs={12} md={2}>
                                                            {vendor?.isVerified ? (
                                                                    <SeverityPill color="success">VERIFIED</SeverityPill>) :
                                                                (vendor?.isRejected ? (<SeverityPill
                                                                    color="error">REJECT</SeverityPill>) : (
                                                                    <SeverityPill
                                                                        color="warning">PENDING</SeverityPill>))}

                                                        </Grid>
                                                        <Grid xs={12} md={2}>
                                                            <Button
                                                                component={RouterLink}
                                                                href={`${paths.kycVerification.vendor.index}/${vendor.id}`}
                                                            >View Details</Button>
                                                        </Grid>
                                                    </Grid>

                                                </PropertyList>
                                            </Card>

                                        );
                                    })}
                                    <TablePagination
                                        component="div"
                                        count={count}
                                        onPageChange={(e, v) => handlePageChange(e, v)}
                                        onRowsPerPageChange={(e) => {
                                            setRowsPerPage(+e.target.value);
                                            setPage(0);
                                        }}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        rowsPerPageOptions={[5, 10, 25, 50]}
                                    />
                                </Grid>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Grid
                                    sx={{mt: 4,}}
                                >
                                    {vendor.filter(vendor => vendor.isVerified)
                                        .map((vendor) => {

                                            return (
                                                <Card key={vendor.id} sx={{paddingBottom: "1%", marginBottom: "2%"}}>
                                                    <PropertyList>
                                                        <Grid alignItems="center" sx={{py: "4%"}} container spacing={4}>
                                                            <Grid xs={12} md={3}>
                                                                <PropertyListItem
                                                                    label="Business Name"
                                                                    value={vendor?.name}
                                                                />
                                                            </Grid>
                                                            <Grid xs={12} md={3}>
                                                                <PropertyListItem
                                                                    label="Vendor Name"
                                                                    value={vendor?.user.firstName + "" + vendor?.user.lastName}
                                                                /></Grid>
                                                            <Grid xs={12} md={2}>
                                                                <PropertyListItem
                                                                    label="Phone"
                                                                    value={vendor?.user.phoneNumber}
                                                                /></Grid>
                                                            <Grid xs={12} md={2}>
                                                                {vendor?.isVerified ? (
                                                                        <SeverityPill sx={{marginTop: "15%}"}}
                                                                                      color="success">VERIFIED</SeverityPill>) :
                                                                    (<SeverityPill sx={{marginTop: "15%}"}}
                                                                                   color="warning">PENDING</SeverityPill>)}

                                                            </Grid>
                                                            <Grid xs={12} md={2}>
                                                                <Button
                                                                    component={RouterLink}
                                                                    href={`${paths.kycVerification.vendor.index}/${vendor.id}`}
                                                                >View Details</Button>
                                                            </Grid>
                                                        </Grid>

                                                    </PropertyList>
                                                    {/* <CardActions>
        <Button
          color="inherit"
          size="small"
        >
          Reset Password
        </Button>
      </CardActions> */}
                                                </Card>

                                            );
                                        })}
                                    <TablePagination
                                        component="div"
                                        count={count}
                                        onPageChange={(e, v) => handlePageChange(e, v)}
                                        onRowsPerPageChange={(e) => {
                                            setRowsPerPage(+e.target.value);
                                            setPage(0);
                                        }}
                                        page={page}
                                        rowsPerPage={rowsPerPage}
                                        rowsPerPageOptions={[5, 10, 25, 50]}
                                    />
                                </Grid>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                {vendor.filter(vendor => !vendor.isVerified && !vendor.isRejected)
                                    .map((vendor) => {

                                        return (
                                            <Card key={vendor.id} sx={{paddingBottom: "1%", marginBottom: "2%"}}>
                                                <PropertyList>
                                                    <Grid alignItems="center" sx={{py: "4%"}} container spacing={4}>
                                                        <Grid xs={12} md={3}>
                                                            <PropertyListItem
                                                                label="Business Name"
                                                                value={vendor?.name}
                                                            />
                                                        </Grid>
                                                        <Grid xs={12} md={3}>
                                                            <PropertyListItem
                                                                label="Vendor Name"
                                                                value={vendor?.user.firstName + "" + vendor?.user.lastName}
                                                            /></Grid>
                                                        <Grid xs={12} md={2}>
                                                            <PropertyListItem
                                                                label="Phone"
                                                                value={vendor?.user.phoneNumber}
                                                            /></Grid>
                                                        <Grid xs={12} md={2}>
                                                            {vendor?.isVerified ? (
                                                                    <SeverityPill sx={{marginTop: "15%}"}}
                                                                                  color="success">VERIFIED</SeverityPill>) :
                                                                (<SeverityPill sx={{marginTop: "15%}"}}
                                                                               color="warning">PENDING</SeverityPill>)}

                                                        </Grid>
                                                        <Grid xs={12} md={2}>
                                                            <Button
                                                                component={RouterLink}
                                                                href={`${paths.kycVerification.vendor.index}/${vendor.id}`}
                                                            >View Details</Button>
                                                        </Grid>
                                                    </Grid>
                                                </PropertyList>
                                            </Card>

                                        );
                                    })}
                                <TablePagination
                                    component="div"
                                    count={count}
                                    onPageChange={(e, v) => handlePageChange(e, v)}
                                    onRowsPerPageChange={(e) => {
                                        setRowsPerPage(+e.target.value);
                                        setPage(0);
                                    }}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    rowsPerPageOptions={[5, 10, 25, 50]}
                                />
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                {vendor.filter(vendor => vendor.isRejected)
                                    .map((vendor) => {

                                        return (
                                            <Card key={vendor.id} sx={{paddingBottom: "1%", marginBottom: "2%"}}>
                                                <PropertyList>
                                                    <Grid alignItems="center" sx={{py: "4%"}} container spacing={4}>
                                                        <Grid xs={12} md={3}>
                                                            <PropertyListItem
                                                                label="Business Name"
                                                                value={vendor?.name}
                                                            />
                                                        </Grid>
                                                        <Grid xs={12} md={3}>
                                                            <PropertyListItem
                                                                label="Vendor Name"
                                                                value={vendor?.user.firstName + "" + vendor?.user.lastName}
                                                            /></Grid>
                                                        <Grid xs={12} md={2}>
                                                            <PropertyListItem
                                                                label="Phone"
                                                                value={vendor?.user.phoneNumber}
                                                            /></Grid>
                                                        <Grid xs={12} md={2}>
                                                            <SeverityPill sx={{marginTop: "15%}"}}
                                                                          color="error">REJECT</SeverityPill>
                                                        </Grid>
                                                        <Grid xs={12} md={2}>
                                                            <Button
                                                                component={RouterLink}
                                                                href={`${paths.kycVerification.vendor.index}/${vendor.id}`}
                                                            >View Details</Button>
                                                        </Grid>
                                                    </Grid>

                                                </PropertyList>
                                                {/* <CardActions>
        <Button
          color="inherit"
          size="small"
        >
          Reset Password
        </Button>
      </CardActions> */}
                                            </Card>

                                        );
                                    })}
                                <TablePagination
                                    component="div"
                                    count={count}
                                    onPageChange={(e, v) => handlePageChange(e, v)}
                                    onRowsPerPageChange={(e) => {
                                        setRowsPerPage(+e.target.value);
                                        setPage(0);
                                    }}
                                    page={page}
                                    rowsPerPage={rowsPerPage}
                                    rowsPerPageOptions={[5, 10, 25, 50]}
                                />
                            </TabPanel>

                        </Card>
                    </Stack>
                </Container>
            </Box>
        </div>
    );
};


Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
