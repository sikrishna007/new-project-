import {useCallback, useEffect, useMemo, useState} from "react";
import Cookies from "js-cookie";
import {endpoints} from "@/endpoints";
import {getList} from "@/utils/util";

 export const useCustomersStore = ( location ) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isActive, setIsActive] = useState("");
    const [role, setRole] = useState("")
    const [sortOn, setSortOn] = useState("UpdatedAt");
    const [sortOrder, setSortOrder] = useState("desc")
    const [state, setState] = useState({
        customers: [],
        customersCount: 0,
    });



     const handleCustomersGet = useCallback(async (page = 0, limit = 10, isActive = "", role = "", sorton = "updatedAt", sortOrder = "desc") => {
         const getEndpoint=(location)=> {
             let endpoint;

             switch (location) {

                 case 'employees':
                     if (role) {
                         endpoint = `${endpoints.userManagement.employees.index}?pageNo=${page}&pageSize=${limit}&isActive=${isActive}&roleName=${role}&sortOn=updatedAt&sortOrder=desc`;
                     } else {
                         endpoint = `${endpoints.userManagement.employees.index}?pageNo=${page}&pageSize=${limit}&isActive=${isActive}&sortOn=updatedAt&sortOrder=desc`;
                     }
                     break;

                 case 'customers':
                     endpoint = `${endpoints.userManagement.customers.index}?pageNo=${page}&pageSize=${limit}&sortOn=${sorton}&isActive=${isActive}&isBusinessCustomer=${role}&sortOrder=${sortOrder}`;
                     break;

                 default: // Assuming 'vendors' as the default case
                     endpoint = `${endpoints.userManagement.vendors.index}?pageNo=${page}&pageSize=${limit}&isActive=${isActive}&sortOn=${sortOn}&sortOrder=${sortOrder}`;
             }
             return endpoint
         }

         let params= getEndpoint(location);
        const data = await getList(params);
        setState({
            customers: data.data,
            customersCount: data.totalElements,
            hasMore: data.hasMore,
            isActive: isActive,
            role: role
        });

    }, []);
    const onChangeActive = (e, v) => {
        // console.log(e.target.value);
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
    const onChangeRole = (e, v) => {
        // console.log(e.target.value);

        if (e.target.value === "All") return setRole("");
        if (e.target.value === "RETAIL CUSTOMER") return setRole(false);
        if (e.target.value === "BUSINESS CUSTOMER") return setRole(true);
        setRole(e.target.value);
    };
    const handlePageChange = useCallback((event, page) => {

        setPage(page);
    }, []);

    useEffect(
        () => {
            handleCustomersGet(page, rowsPerPage, isActive, role,sortOn,sortOrder);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [page, rowsPerPage, isActive, role,sortOn,sortOrder]
    );
    useEffect(()=>{

    },[state]);

    return {
        ...state,
        page,
        rowsPerPage,
        handleCustomersGet,
        onChangeActive,
        onChangeRole,
        handleSort,
        handlePageChange,
        setRowsPerPage,
    };
};

 export const useCustomersIds = (customers = []) => {
    return useMemo(() => {
        return customers.map((customer) => customer.id);
    }, [customers]);
};
