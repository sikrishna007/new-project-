import {useCallback, useEffect, useMemo, useState} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {Seo} from "src/components/seo";
import {useSelection} from "src/hooks/use-selection";
import {Link} from "@mui/material";
import {RouterLink} from "src/components/router-link";
import {paths} from "src/paths";
import {endpoints} from "src/endpoints";
import Cookies from "js-cookie";
import {Layout as DashboardLayout} from "src/layouts/admin-dashboard";
import {ItemsTable} from "@/custom-components/items/ItemsTable";
import {ItemSearch} from "@/custom-components/items/item-search";
import {useItemsIds, useItemsStore} from "@/utils/item-filters";
import RoleBasedView from "@/contexts/roleAut/RoleBasedView";


const Page = () => {
    let location = window.location.href.split("/")[4];
    const customersStore = useItemsStore(location);
    const customersIds = useItemsIds(customersStore.customers);
    const customersSelection = useSelection(customersIds);

    return (
        <>
            <Seo title="Product Categories"/>
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
                                <Typography variant="h4">Product Categories</Typography>
                            </Stack>
                            <Stack alignItems="center" direction="row" spacing={3}>
                                <RoleBasedView permissions={["ADMIN"]}>
                                <Link
                                    component={RouterLink}
                                    href={paths.productManagement.category.index + "/add"}
                                >
                                    <Button
                                        variant="contained"
                                    >
                                        Create New
                                    </Button>
                                </Link>
                                </RoleBasedView>
                            </Stack>
                        </Stack>
                        <Card>
                            <ItemSearch
                                onChangeActive={customersStore.onChangeActive}
                                isActive={customersStore.isActive}
                                searchCustomers={customersStore.handleCustomerSearch}
                            />
                            <ItemsTable
                                location={location}
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
                                }} onSelectAll={customersSelection.handleSelectAll}
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
