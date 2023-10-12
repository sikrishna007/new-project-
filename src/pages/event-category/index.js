import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {Seo} from "src/components/seo";
import {useSelection} from "src/hooks/use-selection";
import {Layout as DashboardLayout} from "src/layouts/admin-dashboard";
import {useRouter} from "next/router";
import {paths} from "src/paths";
import {ItemsTable} from "@/custom-components/items/ItemsTable";
import {ItemSearch} from "@/custom-components/items/item-search";
import {useItemsIds, useItemsStore} from "@/utils/item-filters";

const Page = () => {
    const customersStore = useItemsStore();
    const customersIds = useItemsIds(customersStore.customers);
    const customersSelection = useSelection(customersIds);
    const router = useRouter();



    return (
        <>
            <Seo title="Event Mart | Event Categories"/>
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
                                <Typography variant="h4">Event Categories</Typography>
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
                                {/*    Event Category List*/}
                                {/*  </Typography>*/}
                                {/*</Breadcrumbs>*/}
                                {/* <Stack*/}
                                {/*  alignItems="center"*/}
                                {/*  direction="row"*/}
                                {/*  spacing={1}*/}
                                {/*>*/}
                                {/*  <Button*/}
                                {/*    color="inherit"*/}
                                {/*    size="small"*/}
                                {/*    startIcon={(*/}
                                {/*      <SvgIcon>*/}
                                {/*        <Upload01Icon />*/}
                                {/*      </SvgIcon>*/}
                                {/*    )}*/}
                                {/*  >*/}
                                {/*    Import*/}
                                {/*  </Button>*/}
                                {/*  <Button*/}
                                {/*    color="inherit"*/}
                                {/*    size="small"*/}
                                {/*    startIcon={(*/}
                                {/*      <SvgIcon>*/}
                                {/*        <Download01Icon />*/}
                                {/*      </SvgIcon>*/}
                                {/*    )}*/}
                                {/*  >*/}
                                {/*    Export*/}
                                {/*  </Button>*/}
                                {/*</Stack>*/}
                            </Stack>
                            <Stack alignItems="center" direction="row" spacing={3}>
                                <Button
                                    onClick={() => router.push(paths.eventCategory.add)}
                                    // startIcon={
                                    //   <SvgIcon>
                                    //     <PlusIcon />
                                    //   </SvgIcon>
                                    // }
                                    variant="contained"
                                >
                                    Create New
                                </Button>
                            </Stack>
                        </Stack>
                        <Card>
                            <ItemSearch
                                onChangeActive={customersStore.onChangeActive}
                                isActive={customersStore.isActive}
                            />
                            <ItemsTable
                                isActive={customersStore.isActive}
                                hasMore={customersStore.hasMore}
                                getCustomers={customersStore.handleCustomersGet}
                                sortOn={customersStore.sortOn}
                                onChangeSort={customersStore.onChangeSort}
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

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
