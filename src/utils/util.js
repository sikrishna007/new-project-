import Cookies from "js-cookie";
import {endpoints} from "@/endpoints";
import {paths} from "@/paths";
import toast from "react-hot-toast";

let token = Cookies.get("accessToken");

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
export const patchMethod = async (id, temp, path) => {
    try {
        let jsonString = JSON.stringify({isActive: temp});

        const requestOptions = {
            method: "PATCH", // Or 'PUT', 'GET', etc. depending on the type of request you want to make
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                // Set the Content-Type to indicate that the request body is in JSON format
            },
            body: jsonString, // Replace this with the data you want to send in the request body
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



export const getSubmitHandler = (router, method = "POST") => {
    const onSubmitCustomer = async (values, helpers) => {
        try {
            const {
                name,
                panNumber,
                gstNumber,
                role,
                isBusinessCustomer = role === "Retail Customer"? "false":"true",
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
                panNumber,
                isBusinessCustomer,
                gstNumber,
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
                console.log("ok")
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
                gstNumber,
                panNumber,
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
                panNumber,
                gstNumber,
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
                isBusinessCustomer,
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
            // console.log(values);
            // props.setState(true);
            // NOTE: Make API request
            const body = {
                name,
                panNumber,
                isBusinessCustomer,
                gstNumber,
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
                panNumber,
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
                panNumber,
                gstNumber,
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
};
