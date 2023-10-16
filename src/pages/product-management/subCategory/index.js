import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {Seo} from 'src/components/seo';
import {Layout as DashboardLayout} from 'src/layouts/admin-dashboard';
import Grid from "@mui/material/Unstable_Grid2";
import {RouterLink} from "@/components/router-link";
import {paths} from "@/paths";
import Link from "next/link";
import {useItemsIds, useItemsStore} from "@/utils/item-filters";
import {useSelection} from "@/hooks/use-selection";
import {ItemSearch} from "@/custom-components/items/item-search";
import {ItemsTable} from "@/custom-components/items/ItemsTable";


const Page = () => {
    let location = window.location.href.split("/")[4];
    const customersStore = useItemsStore(location);
    const customersIds = useItemsIds(customersStore.customers);
    const customersSelection = useSelection(customersIds);

    return (
        <>
            <Seo title="Settings: Subcategory List"/>
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
                                    Product Sub-Categories
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
                                {/*    Product Sub-Category List*/}
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
                                <Link
                                    component={RouterLink}
                                    href={paths.productManagement.subCategory.index + "/add"}
                                >
                                    <Button
                                        // startIcon={(
                                        //     <SvgIcon>
                                        //         <PlusIcon/>
                                        //     </SvgIcon>
                                        // )}
                                        variant="contained"
                                    >
                                        Create New
                                    </Button>
                                </Link>
                            </Stack>
                        </Stack>

                        <Card>
                            <ItemSearch
                                onChangeActive={customersStore.onChangeActive}
                                isActive={customersStore.isActive}
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

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
