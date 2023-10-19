// components/RequireAuth.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from "js-cookie";

// const RequireAuth = (WrappedComponent, allowedRoles) => {
//     const AuthCheck = (props) => {
//         const router = useRouter();
//
//         useEffect(() => {
//             const userRole =  Cookies.get("role") /* Get user role from your authentication system */;
//             if (router.pathname === "/") {
//                 return;
//             }
//             if (!allowedRoles.includes(userRole)) {
//                 router.push('/401'); // Redirect to unauthorized page
//             }
//         }, []);
//
//         return <WrappedComponent {...props} />;
//     };
//
//     return AuthCheck;
// };

const Redirect = () => {
    const router = useRouter();
    useEffect(() => {
        router.push("/401")
    }, []);

    return <p></p>
}

const RoleBasedGuard = (props) => {
    const router = useRouter();
    const { children, permissions } = props;
    console.log(router.pathname)
    // let admin = ['/','/dashboard','/product-management/products',''];

    let commanFields = ['/','/dashboard','/product-management/products','/product-management/products/[id]','/product-management/category','/product-management/category/[id]','/product-management/subCategory','/product-management/subCategory/[id]'];

    let vendorManager = ['/product-management/products/edit/[id]',"/product-management/products/add",'/users/vendors','/users/vendors/[id]','/users/vendors/add','/users/vendors/edit/[id]','/event-category','/event-category/[id]'];


    let vendor = ['/','/dashboard','/product-management/products','/product-management/products/[id]','/product-management/category','/product-management/subCategory'];

    let eventManager = ['/users/vendors','/users/vendors/[id]','/event-category','/event-category/[id]'];
    let salesManager = ['/users/vendors','/users/vendors/[id]','/users/vendors/add','/users/vendors/edit/[id]','/users/customers','/users/customers/[id]','/users/customers/add','/users/customers/edit/[id]'];
    let marketing = ['/users/vendors','/users/vendors/[id]'];
    let accountant = ['/users/vendors','/users/vendors/[id]','/users/employees','/users/employees/[id]'];
    let customerSupport =['/users/vendors','/users/vendors/[id]','/event-category','/event-category/[id]']
    let canView;
    let role = Cookies.get("role")
    if (role === "ADMIN") {
         canView = true;// Placeholder value, the actual permission check logic is missing
    }
    else if (role === "VENDOR") {
         canView = vendor.includes(router.pathname);// Placeholder value, the actual permission check logic is missing
    }
    else if (role === "VENDOR MANAGER") {
             canView = vendorManager.includes(router.pathname) || commanFields.includes(router.pathname);// Placeholder value, the actual permission check logic is missing
        }
    else if (role === "SALES MANAGER") {
             canView = salesManager.includes(router.pathname) || commanFields.includes(router.pathname);// Placeholder value, the actual permission check logic is missing
        }
    else if (role === "EVENT MANAGER") {
                 canView = eventManager.includes(router.pathname) || commanFields.includes(router.pathname);// Placeholder value, the actual permission check logic is missing
            }
    else if (role === "MARKETING") {
                 canView = marketing.includes(router.pathname) || commanFields.includes(router.pathname);// Placeholder value, the actual permission check logic is missing
            }
    else if (role === "ACCOUNTANT") {
                 canView = accountant.includes(router.pathname) || commanFields.includes(router.pathname);// Placeholder value, the actual permission check logic is missing
            }
    else if (role === "CUSTOMER SUPPORT") {
                     canView = accountant.includes(router.pathname) || commanFields.includes(router.pathname);// Placeholder value, the actual permission check logic is missing
                }

    if (!canView) {
        return <Redirect/> // If the user doesn't have the required permission, render nothing
    }

    return <>{children}</>; // Render the protected content
};

export default RoleBasedGuard;


