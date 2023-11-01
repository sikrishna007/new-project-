import {useCallback, useEffect, useMemo, useState} from "react";
import {endpoints} from "@/endpoints";
import Cookies from "js-cookie";
import {getList, search} from "@/utils/util";

export const useItemsStore = (location) => {
    const [page, setPage] = useState(0);
    const [isActive, setIsActive] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortOn, setSortOn] = useState("");
    const [sortOrder, setSortOrder] = useState("")
    const [state, setState] = useState({
        customers: [],
        customersCount: 5,
    });

    const handleCustomerSearch = useCallback(async(query="")=>{
        if(query===""){
            handleCustomersGet()
        }
        else{
            const getEndpoint = (location) => {
                let endpoint;
                let role = Cookies.get("role")
                if (role !== "VENDOR") {
                    switch (location) {

                        case 'category':

                            endpoint = `${endpoints.category.index}`;
                            break;
                        case 'hsn':
                            endpoint = `${endpoints.hsnSac.index}`;
                            break;
                        case 'sac':

                            endpoint = `${endpoints.hsnSac.index}`;
                            break;
                        case 'event-category':
                            endpoint = `${endpoints.eventCategories.index}`;
                            break;
                        case 'subCategory':
                            endpoint = `${endpoints.subCategory.index}`;
                            break;
                        default: // Assuming 'vendors' as the default case
                            endpoint = `${endpoints.product.index}`;
                    }
                } else {
                    let id = Cookies.get("id")
                    endpoint = `/offerings/vendor/${id}`;
                }
                return endpoint
            }
            let params = getEndpoint(location);
            let data = await search(query, params)
            setState({
                customers: data.data,
            });
        }

    },[])

    const handleCustomersGet = useCallback(async (page = 0, limit = 10, isActive = "", sortOn = "updatedAt",sortOrder = "desc") => {
        if(sortOn ===""){sortOn="updatedAt";sortOrder="desc"}

        const getEndpoint=(location)=> {
            console.log(location)

            let endpoint;
            let role = Cookies.get("role")
            if(role !== "VENDOR"){ switch (location) {
                case 'category':

                    endpoint = `${endpoints.category.index}?pageNo=${page}&pageSize=${limit}&isActive=${isActive}&sortOn=${sortOn}&sortOrder=${sortOrder}`;
                    break;
                case 'hsn':
                    endpoint = `${endpoints.hsnSac.index}?pageNo=${page}&pageSize=${limit}&isHsn=true&isActive=true&sortOn=${sortOn}&sortOrder=${sortOrder}`;
                    break;
                case 'sac':

                    endpoint = `${endpoints.hsnSac.index}?pageNo=${page}&pageSize=${limit}&isHsn=false&isActive=true&sortOn=${sortOn}&sortOrder=${sortOrder}`;
                    break;
                case 'event-category':
                    endpoint = `${endpoints.eventCategories.index}?pageNo=${page}&pageSize=${limit}&sortOrder=${sortOrder}&isActive=${isActive}&sortOn=${sortOn}`;
                    break;
                case 'subCategory':
                    endpoint =`${endpoints.subCategory.index}?pageNo=${page}&pageSize=${limit}&sortOrder=${sortOrder}&isActive=${isActive}&sortOn=${sortOn}`;
                    break;
                default: // Assuming 'vendors' as the default case
                    endpoint = `${endpoints.product.index}?pageNo=${page}&pageSize=${limit}&isActive=${isActive}&sortOn=${sortOn}&sortOrder=${sortOrder}`;
            }}
           else{
                let id = Cookies.get("id")
                endpoint = `/offerings/vendor/${id}`;
            }
            return endpoint
        }


        let params= getEndpoint(location);
        const data = await getList(params);
            setState({
                customers: data.data,
                customersCount: data.totalElements,
                hasMore: data.hasMore,
                sortOn:sortOn,
                sortOrder:sortOrder,
                isActive: isActive,
            });

    }, []);

    const getVendorProducts=useCallback(async(vendorId)=>{
        console.log(vendorId)
        if(vendorId === undefined){
            handleCustomersGet()
        }
        else {
            let params = `/offerings/vendor/${vendorId}`;
            const data = await getList(params);
            setState({
                customers: data.data,
                customersCount: data.totalElements,
                hasMore: data.hasMore,
                sortOn:sortOn,
                sortOrder:sortOrder,
                isActive: isActive,
            });
        }
    },[])


    const onChangeActive = (e, v) => {
        if (e.target.value === "Active") return setIsActive("");
        setIsActive(e.target.value);
    };

    const handleSort = (column) => {
        if (column === sortOn) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortOn(column);
            setSortOrder('asc');
        }
    };

    const handlePageChange = useCallback((event, page) => {
        setPage(page);
    }, []);

    useEffect(
        () => {
            handleCustomersGet(page, rowsPerPage, isActive,sortOn,sortOrder);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [page, rowsPerPage, isActive,sortOn,sortOrder]
    );

    return {
        ...state,
        page,
        rowsPerPage,
        handleCustomersGet,
        handleCustomerSearch,
        getVendorProducts,
        onChangeActive,
        handleSort,
        handlePageChange,
        setRowsPerPage,
    };
};

export const useItemsIds = (customers = []) => {
    return useMemo(() => {
        return customers.map((customer) => customer.id);
    }, [customers]);
};
