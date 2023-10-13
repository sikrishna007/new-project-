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
import Grid from "@mui/material/Grid";
import {ItemSearch} from "@/custom-components/product-management/item-search";
import {Layout as DashboardLayout} from "src/layouts/admin-dashboard";
import {HsnSacTable} from "@/custom-components/setup/hsnSacTable";

const useCustomersSearch = () => {
    const [state, setState] = useState({
        filters: {
            query: undefined,
            hasAcceptedMarketing: undefined,
            isProspect: undefined,
            isReturning: undefined,
        },
        page: 0,
        rowsPerPage: 10,
        sortBy: "updatedAt",
        sortDir: "desc",
    });
    const handleFiltersChange = useCallback((filters) => {
        setState((prevState) => ({
            ...prevState,
            filters,
        }));
    }, []);
    const handleSortChange = useCallback((sort) => {
        setState((prevState) => ({
            ...prevState,
            sortBy: sort.sortBy,
            sortDir: sort.sortDir,
        }));
    }, []);
    const handlePageChange = useCallback((event, page) => {
        setState((prevState) => ({
            ...prevState,
            page,
        }));
    }, []);
    const handleRowsPerPageChange = useCallback((event) => {
        setState((prevState) => ({
            ...prevState,
            rowsPerPage: parseInt(event.target.value, 10),
        }));
    }, []);
    return {
        handleFiltersChange,
        handleSortChange,
        handlePageChange,
        handleRowsPerPageChange,
        state,
    };
};
const useCustomersStore = () => {
    const [page, setPage] = useState(0);
    const [isActive, setIsActive] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortOn, setSortOn] = useState("UpdatedAt");
    const [sortOrder, setSortOrder] = useState("desc")
    const [state, setState] = useState({
        customers: [],
        customersCount: 5,
    });
    const handleCustomersGet = useCallback(async (page = 0, limit = 10, isActive = "", sorton = "updatedAt", sortOrder = "desc") => {
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL +
                endpoints.hsnSac.index +
                `?pageNo=${page}&pageSize=${limit}&isHsn=false&isActive=true&sortOn=${sorton}&sortOrder=${sortOrder}`,
                {headers: {Authorization: `Bearer ${Cookies.get("accessToken")}`}}
            );
            const data = await response.json();
            setState({
                customers: data.data,
                customersCount: data.totalElements,
                hasMore: data.hasMore,
                isActive: isActive
            });
        } catch (err) {
            console.error(err);
        }
    }, []);
    const onChangeActive = (e, v) => {
        if (e.target.value === "Active") return setIsActive("");
        setIsActive(e.target.value);
    };
    const handlePageChange = (event, page) => {
        setPage(page);
    };
    const handleRowsPerPageChange = (e) => setRowsPerPage(+e.target.value);

    useEffect(
        () => {
            handleCustomersGet(page, rowsPerPage, isActive);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [rowsPerPage, page, isActive]
    );
    return {
        ...state,
        page,
        rowsPerPage,
        handleCustomersGet,
        handlePageChange,
        handleRowsPerPageChange,
        setRowsPerPage,
        onChangeActive,
    };
};
const useCustomersIds = (customers = []) => {
    return useMemo(() => {
        return customers.map((customer) => customer.id);
    }, [customers]);
};
const Page = () => {
    const itemsSearch = useCustomersSearch();
    const [view, setView] = useState('grid');
    const customersStore = useCustomersStore();
    const customersIds = useCustomersIds(customersStore.customers);
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
                                <Typography variant="h4">
                                    SAC Codes
                                </Typography>
                            </Stack>
                            <Stack
                                alignItems="center"
                                direction="row"
                                spacing={3}
                            >
                                <Link
                                    component={RouterLink}
                                    href={paths.setup.sac.index + "/add"}
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
                                    onFiltersChange={itemsSearch.handleFiltersChange}
                                    onSortChange={itemsSearch.handleSortChange}
                                    onViewChange={setView}
                                    sortBy={itemsSearch.state.sortBy}
                                    sortDir={itemsSearch.state.sortDir}
                                    view={view}
                                    isStatusShow={false}
                                />
                            </Stack>
                        </Grid>
                        <Card>
                            <HsnSacTable
                                CodeName= "SAC"
                                codePath="sac"
                                onChangeActive={customersStore.onChangeActive}
                                isActive={customersStore.isActive}
                                hasMore={customersStore.hasMore}
                                count={customersStore.customersCount}
                                items={customersStore.customers}
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