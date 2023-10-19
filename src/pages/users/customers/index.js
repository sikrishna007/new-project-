import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {Seo} from "src/components/seo";

import {useSelection} from "src/hooks/use-selection";
import {Layout as DashboardLayout} from "src/layouts/admin-dashboard";
import {CustomerTable} from "@/custom-components/users/CustomerTable";
import {Link} from "@mui/material";
import {RouterLink} from "src/components/router-link";
import {paths} from "src/paths";
import {CustomerListSearch} from "@/custom-components/users/customer-list-search";
import {useCustomersIds, useCustomersStore} from "@/utils/userDataFilters";
import RoleBasedView from "@/contexts/roleAut/RoleBasedView";


const Page = () => {
    let location = window.location.href.split("/")[4];
    const customersStore = useCustomersStore(location);
    const customersIds = useCustomersIds(customersStore.customers);
    const customersSelection = useSelection(customersIds);


    return (
        <>
            <Seo title="Event Mart: Customers"/>
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
                                <Typography variant="h4">Customer Management</Typography>
                                {/*<Breadcrumbs separator={<BreadcrumbsSeparator />}>*/}
                                {/*  <Link*/}
                                {/*      color='#4338CA'*/}
                                {/*      component={RouterLink}*/}
                                {/*      href={paths.dashboard.index}*/}
                                {/*      variant="subtitle2"*/}
                                {/*  >*/}
                                {/*    Dashboard*/}
                                {/*  </Link>*/}
                                {/*  <Typography*/}
                                {/*      color="text.primary"*/}
                                {/*      variant="subtitle2"*/}
                                {/*  >*/}
                                {/*    Customer List*/}
                                {/*  </Typography>*/}
                                {/*</Breadcrumbs>*/}
                            </Stack>
                            <Stack alignitems="center" direction="row" spacing={3}>
                                <RoleBasedView permissions={["ADMIN","SALES MANGER"]}>
                                <Link
                                    component={RouterLink}
                                    href={paths.userManagement.customers.index + "/add"}
                                >
                                    <Button
                                        // startIcon={
                                        //     <SvgIcon>
                                        //         <PlusIcon/>
                                        //     </SvgIcon>
                                        // }
                                        variant="contained"
                                    >
                                        Create New
                                    </Button>
                                </Link>
                                </RoleBasedView>
                            </Stack>
                        </Stack>
                        <Card>
                            <CustomerListSearch
                                onChangeActive={customersStore.onChangeActive}
                                isActive={customersStore.isActive}
                                onChangeRole={customersStore.onChangeRole}
                                role={customersStore.role}
                            />
                            <CustomerTable
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
