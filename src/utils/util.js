import Cookies from "js-cookie";
import {endpoints} from "@/endpoints";
import {paths} from "@/paths";
import toast from "react-hot-toast";

let token = Cookies.get("accessToken");

export const fileUpload = async(file)=>{
    try {
        const formData = new FormData();
        formData.append('file', file);
        const requestOptions = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
                body: formData
        };
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/files", requestOptions);
        const data = await response.json();
        return data.data[0];
    } catch (err) {
        console.error(err);
    }
}

export const multiFileUpload = async(files)=>{
    try {
        const filesArray = Array.isArray(files) ? files : [files];
        const formData = new FormData();

        for (const file of filesArray){

            formData.append('file', file);

        }
        const requestOptions = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        };
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/files", requestOptions);
        const data = await response.json();
        let uploadFiles= await data.data
        return uploadFiles;

    } catch (err) {
        console.error(err);
        return [];
    }

}

// Multiple fileUpload for products
// export const multiFileUpload = async(files)=>{
//     try {
//         const uploadFiles = []
//         const filesArray = Array.isArray(files) ? files : [files];
//
//         for (const file of filesArray){
//             const formData = new FormData();
//             formData.append('file', file);
//
//             const requestOptions = {
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 },
//                 body: formData
//             };
//             const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/files", requestOptions);
//             const data = await response.json();
//             // Save the filePath as "purpose" in the files object
//             // const updatedFile = { ...file, purpose: data.data[0].filePath };
//
//             uploadFiles.push(data.data[0]);
//             // uploadFiles.push(updatedFile);
//         }
//
//         return uploadFiles;
//
//     } catch (err) {
//         console.error(err);
//         return [];
//     }
//
// }
//
// export const multiFileUploadPatch = async(files)=>{
//     try {
//         const uploadFiles = []
//         const filesArray = Array.isArray(files) ? files : [files];
//
//         for (const file of filesArray){
//             const formData = new FormData();
//             formData.append('file', file);
//
//             const requestOptions = {
//                 method: "POST",
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 },
//                 body: formData
//             };
//             const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/files", requestOptions);
//             const data = await response.json();
//
//             // Save the filePath as "purpose" in the files object
//             // const updatedFile = { ...file, purpose: data.data[0].filePath };
//
//             uploadFiles.push(data.data[0]);
//             // uploadFiles.push(updatedFile);
//         }
//
//         return uploadFiles;
//
//     } catch (err) {
//         console.error(err);
//         return [];
//     }
//
// }

export const handleGetById = async (id,path) => {
      try {
        const response = await fetch(
            process.env.NEXT_PUBLIC_BASE_URL +
            path + "/" + id,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        );
        const data = await response.json();
        return data.data
      } catch (err) {
        console.error(err);
      }
    };
export const patchMethod = async (id, body, path) => {
    try {

        const requestOptions = {
            method: "PATCH", // Or 'PUT', 'GET', etc. depending on the type of request you want to make
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                // Set the Content-Type to indicate that the request body is in JSON format
            },
            body: body, // Replace this with the data you want to send in the request body
        };
        const response = await fetch(
            process.env.NEXT_PUBLIC_BASE_URL +path+
            "/" +
            id,
            requestOptions
        );
        if (!response.ok) {
            throw new Error(response);
        }
       return   await response.json();

    } catch (error) {
        console.error("Error sending data:", error);
    }
};

export const getList = async (params)=>{

    try {
        const response = await fetch(
            process.env.NEXT_PUBLIC_BASE_URL +
            params,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return await response.json();

        // }
    } catch (err) {
        console.error(err);
    }

};

export const search = async (query,path)=>{
    try {
        const response = await fetch(
            process.env.NEXT_PUBLIC_BASE_URL +`${path}/search?search=${query}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return await response.json();

    } catch (err) {
        console.error(err);
    }
};


export const getSubmitHandler = (router, method = "POST") => {
    const onSubmitCustomer = async (values, helpers) => {
        try {
            const {
                name,
                panNumber,
                gstNumber,
                role,
                isBusinessCustomer = role === "RETAIL CUSTOMER"? "false":"true",
                termsAndConditions,
                firstName,
                lastName,
                phoneNumber,
                whatsappNumber,
                email,
                dateOfBirth,
                shortDescription,
                longDescription,
                addressLine1,
                addressLine2,
                city,
                state,
                country,
                latitudes,
                longitudes,
                pincode,
                facebookLink,
                instagramLink,
                youtubeLink,
            } = values;
            // console.log(values);
            // props.setState(true);
            // NOTE: Make API request
            const body = {
                name,
                panNumber:values.panNumber ===""? null:values.panNumber,
                gstNumber:values.gstNumber === ""? null : values.gstNumber,
                isBusinessCustomer,
                adhaarNumber: values.adhaarNumber,
                user: {
                    firstName: firstName.toLowerCase()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' '),
                    lastName: lastName.toLowerCase()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' '),
                    phoneNumber,
                    whatsappNumber,
                    emailId: email,
                    role: { name: role },
                    dateOfBirth:dateOfBirth,
                    addresses:[{
                        addressLine1,
                        addressLine2,
                        city,
                        state,
                        country,
                        latitudes,
                        longitudes,
                        pincode,

                    }]
                },
            };
            // console.log(JSON.stringify(body));
            const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL +
                endpoints.userManagement.customers.index,
                {
                    method,
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error(response);
            }
            const data = await response.json();
            // console.log(data);
            router.push(paths.userManagement.customers.index);
            helpers.setStatus({ success: true });
            helpers.setSubmitting(false);
            toast.success("Customer created successfully",{
                position: 'top-right', // Set the position to top-right
                autoClose: 10000,
            });
        } catch (err) {
            // console.error(err);
            toast.error("Something went wrong!",{
                position: 'top-right', // Set the position to top-right
                autoClose: 10000,
            });
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: err.message });
            helpers.setSubmitting(false);
        }
    };
    const onSubmitEmployee = async (values, helpers) => {
        try {
            const {
                name,
                panNumber,
                gstNumber,
                termsAndConditions,
                firstName,
                lastName,
                phoneNumber,
                whatsappNumber,
                email,
                role,
                dateOfBirth,
                addressLine1,
                addressLine2,
                city,
                state,
                country,
                latitudes,
                longitudes,
                pincode,
                empId,
            } = values;
            // console.log(values);
            // props.setState(true);
            // NOTE: Make API request
            const body = {
                // name: firstName + " " + lastName,
                empId,
                panNumber:values.panNumber ===""? null:values.panNumber,
                adhaarNumber: values.adhaarNumber,
                termsAndConditions,
                user: {
                    firstName: firstName.toLowerCase()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' '),
                    lastName: lastName.toLowerCase()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' '),
                    phoneNumber,
                    whatsappNumber,
                    emailId: email,
                    role: { name: role },
                    dateOfBirth:dateOfBirth,
                    addresses:[{
                        addressLine1,
                        addressLine2,
                        city,
                        state,
                        country,
                        latitudes,
                        longitudes,
                        pincode,

                    }]
                }
            };
            // console.log(body);
            const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL +
                endpoints.userManagement.employees.index,
                {
                    method,
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("accessToken")}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error(response);
            }
            const data = await response.json();
            // console.log(data);
            router.push(paths.userManagement.employees.index);
            helpers.setStatus({ success: true });
            helpers.setSubmitting(false);
            toast.success("Employee created successfully",{
                position: 'top-right', // Set the position to top-right
                autoClose: 10000,
            });
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!",{
                position: 'top-right', // Set the position to top-right
                autoClose: 10000,
            });
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: err.message });
            helpers.setSubmitting(false);
        }
    };
    const onSubmitVendor = async (values, helpers) => {
        try {

            const {
                name,
                panNumber,
                gstNumber,
                termsAndConditions,
                firstName,
                lastName,
                phoneNumber,
                whatsappNumber,
                email,
                dateOfBirth,
                shortDescription,
                longDescription,
                addressLine1,
                addressLine2,
                city,
                state,
                country,
                latitudes,
                longitudes,
                role,
                pincode,
                facebookLink,
                instagramLink,
                youtubeLink,
            } = values;
            // console.log(values);
            // props.setState(true);
            // NOTE: Make API request
            const body = {
                name,
                panNumber:values.panNumber ===""? null:values.panNumber,
                gstNumber:values.gstNumber === ""? null : values.gstNumber,
                termsAndConditions,
                user: {
                    firstName: firstName.toLowerCase()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' '),
                    lastName: lastName.toLowerCase()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' '),
                    phoneNumber,
                    whatsappNumber,
                    emailId: email,
                    role: { name: role },
                    dateOfBirth:dateOfBirth,
                    addresses:[{
                        addressLine1,
                        addressLine2,
                        city,
                        state,
                        country,
                        latitudes,
                        longitudes,
                        pincode,

                    }]
                },
                shortDescription,
                longDescription,
                facebookLink,
                instagramLink,
                youtubeLink,
            };
            // console.log(JSON.stringify(body));
            const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL +
                endpoints.userManagement.vendors.index ,
                {
                    method,
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("accessToken")}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error(response);
            }
            const data = await response.json();
            // console.log(data);
            router.push(paths.userManagement.vendors.index);
            helpers.setStatus({ success: true });
            helpers.setSubmitting(false);
            toast.success("Vendor saved successfully");
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!",{
                position: 'top-right', // Set the position to top-right
                autoClose: 10000,
            });
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: err.message });
            helpers.setSubmitting(false);
        }
    };
    let location = window.location.href.split("/")[4];
    if (location === "customers") return onSubmitCustomer;
    else if (location === "employees") return onSubmitEmployee;
    else if (location === "vendors") return onSubmitVendor;
};


export const getSubmitHandlerEdit = (router, method = "PATCH") => {
    const onSubmitCustomer = async (values, helpers) => {
        try {
            const {
                name,
                panNumber,
                gstNumber,
                isBusinessCustomer = role === "RETAIL CUSTOMER"? "false":"true",
                termsAndConditions,
                firstName,
                lastName,
                phoneNumber,
                whatsappNumber,
                email,
                role,
                dateOfBirth,
                shortDescription,
                longDescription,
                addressLine1,
                addressLine2,
                city,
                state,
                country,
                latitudes,
                longitudes,
                pincode,
                facebookLink,
                instagramLink,
                youtubeLink,
            } = values;
            const body = {
                name,
                panNumber:values.panNumber ===""? null:values.panNumber,
                gstNumber:values.gstNumber === ""? null : values.gstNumber,
                isBusinessCustomer: values.role === "RETAIL CUSTOMER"? "false":"true",
                adhaarNumber: values.adhaarNumber === ""? null : values.adhaarNumber,
                user: {
                    firstName: firstName.toLowerCase()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' '),
                    lastName: lastName.toLowerCase()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' '),
                    phoneNumber,
                    whatsappNumber,
                    emailId: email,
                    role: { name: role },
                    dateOfBirth:dateOfBirth,
                    addresses:[{
                        addressLine1,
                        addressLine2,
                        city,
                        state,
                        country,
                        latitudes,
                        longitudes,
                        pincode,

                    }]
                },
            };
            // console.log(JSON.stringify(body));
            const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL +
                endpoints.userManagement.customers.index + `/${router.query.id}` ,
                {
                    method,
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("accessToken")}`,
                    },
                }
            );
            if (!response.ok) {

                throw new Error(response);
            }
            const data = await response.json();
            // console.log(data);
            router.push(paths.userManagement.customers.index);
            helpers.setStatus({ success: true });
            helpers.setSubmitting(false);
            toast.success("Customer edited successfully",{
                position: 'top-right', // Set the position to top-right
                autoClose: 10000,
            });
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!",{
                position: 'top-right', // Set the position to top-right
                autoClose: 10000,
            });
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: err.message });
            helpers.setSubmitting(false);
        }
    };
    const onSubmitEmployee = async (values, helpers) => {
        try {
            const {
                panNumber,
                firstName,
                lastName,
                phoneNumber,
                whatsappNumber,
                email,
                role,
                dateOfBirth,
                addressLine1,
                addressLine2,
                city,
                state,
                country,
                latitudes,
                longitudes,
                pincode,
                empId,
            } = values;
            // console.log(values);
            // props.setState(true);
            // NOTE: Make API request
            const body = {
                // name: firstName + " " + lastName,
                empId,
                panNumber:values.panNumber ===""? null:values.panNumber,
                user: {
                    firstName: firstName.toLowerCase()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' '),
                    lastName: lastName.toLowerCase()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' '),
                    phoneNumber,
                    whatsappNumber,
                    emailId: email,
                    role: { name: role },
                    dateOfBirth: dateOfBirth,
                    addresses:[{
                        addressLine1,
                        addressLine2,
                        city,
                        state,
                        country,
                        latitudes,
                        longitudes,
                        pincode,

                    }]
                }
            };
            // console.log(JSON.stringify(body));
            const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL +
                endpoints.userManagement.employees.index + `/${router.query.id}`,
                {
                    method,
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("accessToken")}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error(response);
            }
            const data = await response.json();
            // console.log(data);
            router.push(paths.userManagement.employees.index);
            helpers.setStatus({ success: true });
            helpers.setSubmitting(false);
            toast.success("Employee edited successfully",{
                position: 'top-right', // Set the position to top-right
                autoClose: 10000,
            });
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!",{
                position: 'top-right', // Set the position to top-right
                autoClose: 10000,
            });
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: err.message });
            helpers.setSubmitting(false);
        }
    };
    const onSubmitVendor = async (values, helpers) => {
        try {

            const {
                name,
                panNumber,
                gstNumber,
                termsAndConditions,
                firstName,
                lastName,
                phoneNumber,
                whatsappNumber,
                email,
                dateOfBirth,
                shortDescription,
                longDescription,
                addressLine1,
                addressLine2,
                city,
                state,
                country,
                role,
                pincode,
                facebookLink,
                instagramLink,
                youtubeLink,
                latitudes,
                longitudes,
            } = values;
            // console.log(values);
            // props.setState(true);
            // NOTE: Make API request
            const body = {
                name,
                panNumber:values.panNumber ===""? null:values.panNumber,
                gstNumber:values.gstNumber === ""? null : values.gstNumber,
                termsAndConditions,
                user: {
                    firstName: firstName.toLowerCase()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' '),
                    lastName: lastName.toLowerCase()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' '),
                    phoneNumber,
                    whatsappNumber,
                    emailId: email,
                    role: { name: role },
                    dateOfBirth: dateOfBirth,
                    addresses:[{
                        addressLine1,
                        addressLine2,
                        city,
                        state,
                        country,
                        latitudes,
                        longitudes,
                        pincode,

                    }]
                },
                shortDescription,
                longDescription,
                facebookLink,
                instagramLink,
                youtubeLink,
            };
            // console.log(JSON.stringify(body));
            const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL +
                endpoints.userManagement.vendors.index + "/" + router.query.id,
                {
                    method,
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("accessToken")}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error(response);
            }
            const data = await response.json();
            // console.log(data);
            router.push(paths.userManagement.vendors.index);
            helpers.setStatus({ success: true });
            helpers.setSubmitting(false);
            toast.success("Vendor saved successfully",{
                position: 'top-right', // Set the position to top-right
                autoClose: 10000,
            });
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!",{
                position: 'top-right', // Set the position to top-right
                autoClose: 10000,
            });
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: err.message });
            helpers.setSubmitting(false);
        }
    };
    let location = window.location.href.split("/")[4];
    if (location === "customers") return onSubmitCustomer;
    else if (location === "employees") return onSubmitEmployee;
    else if (location === "vendors") return onSubmitVendor;
    else if(location === "edit")return onSubmitEmployee;
};
