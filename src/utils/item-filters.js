import {useCallback, useEffect, useMemo, useState} from "react";
import {endpoints} from "@/endpoints";
import Cookies from "js-cookie";
import {getList} from "@/utils/util";

export const useItemsStore = ( location) => {
    const [page, setPage] = useState(0);
    const [isActive, setIsActive] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [sortOn, setSortOn] = useState("");
    const [sortOrder, setSortOrder] = useState("")
    const [state, setState] = useState({
        customers: [],
        customersCount: 5,
    });
    const handleCustomersGet = useCallback(async (page = 0, limit = 10, isActive = "", sortOn = "updatedAt",sortOrder = "desc") => {
        if(sortOn ===""){sortOn="updatedAt";sortOrder="desc"}
        const getEndpoint=(location)=> {
            let endpoint;
            console.log(location)
            switch (location) {

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
                    endpoint = `${endpoints.product.index}?pageNo=${page}&pageSize=${limit}&isActive=${isActive}&sortOn=${sortOn}`;
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
