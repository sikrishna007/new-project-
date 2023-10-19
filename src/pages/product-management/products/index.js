import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {Seo} from 'src/components/seo';
import {useSelection} from 'src/hooks/use-selection';
import {Layout as DashboardLayout} from 'src/layouts/admin-dashboard';
import Grid from "@mui/material/Unstable_Grid2";
import {ItemSearch} from "@/custom-components/items/item-search";
import {ProductTable} from "@/custom-components/productTable";
import {useCustomersIds} from "@/utils/userDataFilters";
import {useItemsStore} from "@/utils/item-filters";
import {RouterLink} from "@/components/router-link";
import {paths} from "@/paths";
import Button from "@mui/material/Button";
import {Link} from "@mui/material";
import Cookies from "js-cookie";
import RoleBasedView from "@/contexts/roleAut/RoleBasedView";


const Page = () => {
    let location = window.location.href.split("/")[4];
    let role = Cookies.get("role");
    const customersStore = useItemsStore(location);
    const customersIds = useCustomersIds(customersStore.customers);
    const customersSelection = useSelection(customersIds);

    return (
        <>
            <Seo title="Product Management: Products List"/>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
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
                                <Typography variant="h4">
                                    Products
                                </Typography>
                                {/*<Breadcrumbs separator={<BreadcrumbsSeparator />}>*/}
                                {/*  <Link*/}
                                {/*      style={{ color: '#4338CA', textDecoration: 'none' }}*/}
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
                                {/*    Product List*/}
                                {/*  </Typography>*/}
                                {/*</Breadcrumbs>*/}
                                {/* <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    size="small"
                    startIcon={(
                      <SvgIcon>
                        <Upload01Icon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    size="small"
                    startIcon={(
                      <SvgIcon>
                        <Download01Icon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack> */}
                            </Stack>
                            <Stack
                                alignItems="center"
                                direction="row"
                                spacing={3}
                            >
                                <RoleBasedView permissions={["ADMIN","VENDOR MANAGER"]}>
                                    <Link
                                    component={RouterLink}
                                    href={paths.productManagement.products.index + "/add"}
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
                                />
                            </Stack>
                        </Grid>

                        <Card>
                            <ProductTable
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
                                    // console.log(e.target.value);
                                    customersStore.setRowsPerPage(+e.target.value);
                                    // customersStore.handleCustomersGet(
                                    //   customersStore.page,
                                    //   +e.target.value
                                    // );
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

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
