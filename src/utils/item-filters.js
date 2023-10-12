import {useCallback, useEffect, useMemo, useState} from "react";
import {endpoints} from "@/endpoints";
import Cookies from "js-cookie";
import {getList} from "@/utils/util";

export const useItemsStore = () => {
    const [page, setPage] = useState(0);
    const [isActive, setIsActive] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [state, setState] = useState({
        customers: [],
        customersCount: 5,
    });
    const handleCustomersGet = useCallback(async (page = 0, limit = 10, isActive = "", sortOrder = "desc", sortOn = "updatedAt") => {
        // console.log(page)
        // console.log(limit);
        // try {
        //     let token = Cookies.get("accessToken");
        //     const response = await fetch(
        //         process.env.NEXT_PUBLIC_BASE_URL +
        //         endpoints.eventCategories.index +
        //         `?pageNo=${page}&pageSize=${limit}&sortOrder=${sortOrder}&isActive=${isActive}&sortOn=${sortOn}`,
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //             },
        //         }
        //     );
        let params= endpoints.eventCategories.index + `?pageNo=${page}&pageSize=${limit}&sortOrder=${sortOrder}&isActive=${isActive}&sortOn=${sortOn}`
        const data = await getList(params);
            setState({
                customers: data.data,
                customersCount: data.totalElements,
                hasMore: data.hasMore,
                isActive: isActive,
            });

    }, []);

    const onChangeActive = (e, v) => {
        if (e.target.value === "Active") return setIsActive("");
        setIsActive(e.target.value);
    };

    const handlePageChange = useCallback((event, page) => {
        setPage(page);
    }, []);

    useEffect(
        () => {
            handleCustomersGet(page, rowsPerPage, isActive);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [page, rowsPerPage, isActive]
    );

    return {
        ...state,
        page,
        rowsPerPage,
        handleCustomersGet,
        onChangeActive,
        handlePageChange,
        setRowsPerPage,
    };
};

export const useItemsIds = (customers = []) => {
    return useMemo(() => {
        return customers.map((customer) => customer.id);
    }, [customers]);
};
