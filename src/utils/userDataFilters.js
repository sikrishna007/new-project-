import {useCallback, useEffect, useMemo, useState} from "react";
import Cookies from "js-cookie";
import {endpoints} from "@/endpoints";
import {getList, search} from "@/utils/util";

 export const useCustomersStore = ( location ) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isActive, setIsActive] = useState("");
    const [role, setRole] = useState("")
    const [sortOn, setSortOn] = useState("");
    const [sortOrder, setSortOrder] = useState("")
    const [state, setState] = useState({
        customers: [],
        customersCount: 0,
    });

     const handleCustomerSearch = useCallback(async(query="")=>{
         if(query===""){
             handleCustomersGet()
         }
         else{
             const getEndpoint=(location)=> {
                 let endpoint;
                  switch (location) {

                     case 'employees':
                             endpoint = `${endpoints.userManagement.employees.index}`;
                         break;

                     case 'customers':
                         endpoint = `${endpoints.userManagement.customers.index}`;
                         break;
                     default: // Assuming 'vendors' as the default case
                         endpoint = `${endpoints.userManagement.vendors.index}`;
                 }
                 return endpoint
             }
             let params = getEndpoint(location);
             let data = await search(query, params)
             setState({
                 customers: data.data,
                 // customersCount: data.data.length(),
             });
         }

     },[])



     const handleCustomersGet = useCallback(async (page = 0, limit = 10, isActive = "", role = "", sortOn = "updatedAt", sortOrder = "desc") => {
         let value=""
         if(sortOn ===""){sortOn="updatedAt";sortOrder="desc"}
         if(role === "RETAIL CUSTOMER") {value=false}
         if(role === "BUSINESS CUSTOMER") {value=true}
         const getEndpoint=(location)=> {
             let endpoint;
             if(location === "vendor kyc" || location === "business-customer kyc"){ isActive = isActive === ""  ? "7123313635396419584": isActive}
             switch (location) {

                 case 'employees':
                     if (role) {
                         endpoint = `${endpoints.userManagement.employees.index}?pageNo=${page}&pageSize=${limit}&isActive=${isActive}&roleName=${role}&sortOn=${sortOn}&sortOrder=${sortOrder}`;
                     } else {
                         endpoint = `${endpoints.userManagement.employees.index}?pageNo=${page}&pageSize=${limit}&isActive=${isActive}&sortOn=${sortOn}&sortOrder=${sortOrder}`;
                     }
                     break;

                 case 'customers':
                     endpoint = `${endpoints.userManagement.customers.index}?pageNo=${page}&pageSize=${limit}&sortOn=${sortOn}&isActive=${isActive}&isBusinessCustomer=${value}&sortOrder=${sortOrder}`;
                     break;
                 case 'vendor kyc':
                     endpoint = `${endpoints.userManagement.vendors.index}?pageNo=${page}&pageSize=${limit}&sortOn=${sortOn}&status=${isActive}&sortOrder=${sortOrder}`;
                     break;
                 case 'business-customer kyc':
                     endpoint = `${endpoints.userManagement.customers.index}?pageNo=${page}&pageSize=${limit}&sortOn=${sortOn}&isBusinessCustomer=true&status=${isActive}&sortOrder=${sortOrder}`;
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
            sortOn:sortOn,
            sortOrder:sortOrder,
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
        handleCustomerSearch,
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
