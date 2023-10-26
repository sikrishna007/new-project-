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
import Grid from "@mui/material/Unstable_Grid2";
import {Layout as DashboardLayout} from "src/layouts/admin-dashboard";
import {HsnSacTable} from "@/custom-components/setup/hsnSacTable";
import {ItemSearch} from "@/custom-components/items/item-search";
import {useItemsIds, useItemsStore} from "@/utils/item-filters";

const Page = () => {
    const [view, setView] = useState('grid');
    let location = window.location.href.split("/")[4];
    const customersStore = useItemsStore(location);
    const customersIds = useItemsIds(customersStore.customers);
    const customersSelection = useSelection(customersIds);

    return (
        <>
            <Seo title="Event Mart: Employees"/>
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
                               direction="row"
                               justifyContent="space-between"
                               spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">HSN Codes</Typography>
                            </Stack>
                            <Stack
                                alignItems="center"
                                direction="row"
                                spacing={3}
                            >
                                <Link
                                    component={RouterLink}
                                    href={paths.setup.hsn.index + "/add"}
                                >
                                    <Button
                                        variant="contained"
                                    >
                                        Create New
                                    </Button>
                                </Link>
                            </Stack>
                        </Stack>
                        <Grid
                            xs={12}
                            md={8}
                        >
                            <Stack
                                spacing={{
                                    xs: 3,
                                    lg: 4
                                }}
                            >
                                <ItemSearch
                                    onChangeActive={customersStore.onChangeActive}
                                    isActive={customersStore.isActive}
                                    onViewChange={setView}
                                    view={view}
                                    isStatusShow={false}
                                    searchCustomers={customersStore.handleCustomerSearch}
                                />
                            </Stack>
                        </Grid>
                        <Card>
                            <HsnSacTable
                                CodeName= "HSN"
                                codePath="hsn"
                                hasMore={customersStore.hasMore}
                                count={customersStore.customersCount}
                                items={customersStore.customers.filter(customer =>{
                                    return customer.isHsn === true
                                })}
                                page={customersStore.page}
                                rowsPerPage={customersStore.rowsPerPage}
                                selected={customersSelection.selected}
                                onDeselectAll={customersSelection.handleDeselectAll}
                                getCustomers={customersStore.handleCustomersGet}
                                onDeselectOne={customersSelection.handleDeselectOne}
                                onPageChange={customersStore.handlePageChange}
                                onRowsPerPageChange={(e) =>
                                    customersStore.setRowsPerPage(+e.target.value)
                                }
                                onSelectAll={customersSelection.handleSelectAll}
                                onSelectOne={customersSelection.handleSelectOne}
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
