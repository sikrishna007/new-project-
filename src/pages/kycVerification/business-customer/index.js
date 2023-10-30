import React, {useCallback, useEffect, useState} from 'react';
import {Box, Tab, Tabs} from '@mui/material';
import {Seo} from "../../../components/seo";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import {Layout as DashboardLayout} from "../../../layouts/admin-dashboard";
import Cookies from "js-cookie";
import {endpoints} from "../../../endpoints";
import {SeverityPill} from "../../../components/severity-pill";
import Grid from "@mui/material/Unstable_Grid2";
import {PropertyList} from "../../../components/property-list";
import {PropertyListItem} from "../../../components/property-list-item-custom";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import {RouterLink} from "../../../components/router-link";
import {paths} from "../../../paths";
import {useCustomersIds, useCustomersStore} from "@/utils/userDataFilters";
import {useSelection} from "@/hooks/use-selection";
import {useRouter} from "next/router";
import {KycListSearch} from "@/custom-components/kyc/Kyc-list-search";
import {KycTable} from "@/custom-components/kyc/KycTable";

const Page = () => {

    let location = window.location.href.split("/")[4]+[" kyc"];
    const customersStore = useCustomersStore(location);
    const customersIds = useCustomersIds(customersStore.customers);
    const customersSelection = useSelection(customersIds);
    const router = useRouter();

    return (
        <>
            <Seo title="Event Mart: Vendors"/>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={4}>
                        <Stack
                            sx={{marginTop: "-40px"}}
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">Vendor KYC Verification</Typography>
                            </Stack>
                        </Stack>
                        <Card alignitems="center">
                            <KycListSearch
                                onChangeActive={customersStore.onChangeActive}
                                isActive={customersStore.isActive}
                                sortBy={customersStore.isActive}
                            />
                            <KycTable
                                role={customersStore.role}
                                isActive={customersStore.isActive}
                                hasMore={customersStore.hasMore}
                                getCustomers={customersStore.handleCustomersGet}
                                sortOn={customersStore.sortOn}
                                sortOrder={customersStore.sortOrder}
                                handleSort={customersStore.handleSort}
                                count={customersStore.customersCount}
                                items={customersStore.customers}
                                onDeselectAll={customersSelection.handleDeselectAll}
                                onDeselectOne={customersSelection.handleDeselectOne}
                                onRowsPerPageChange={(e) => {
                                    customersStore.setRowsPerPage(+e.target.value);

                                }}
                                onSelectAll={customersSelection.handleSelectAll}
                                onSelectOne={customersSelection.handleSelectOne}
                                page={customersStore.page}
                                rowsPerPage={customersStore.rowsPerPage}
                                selected={customersSelection.selected}
                                handlePageChange={customersStore.handlePageChange}
                            />
                        </Card>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};


Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
