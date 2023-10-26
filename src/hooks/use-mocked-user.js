import {useEffect, useState} from "react";
import {endpoints} from "../endpoints";
import Cookies from "js-cookie";
export const useMockedUser = () => {
  const [userData, setUserData] = useState(null);
  let token = Cookies.get("accessToken");
  const id = Cookies.get("id")
  const handleEmployeeGet = async () => {
    try {
      const response = await fetch(
          process.env.NEXT_PUBLIC_BASE_URL +
          endpoints.userManagement.employees.index + "/" + id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      const data = await response.json();

      setUserData(data.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVendorGet = async () => {
    try {
      const response = await fetch(
          process.env.NEXT_PUBLIC_BASE_URL +
          endpoints.userManagement.vendors.index + "/" + id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );
      const data = await response.json();

      // Set the received data in state
      setUserData(data.data[0]);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    let role =Cookies.get("role")
    if(role !== "VENDOR") {
      handleEmployeeGet();
    }
    else {
      handleVendorGet()
    }
  }, []); // Call the function when the component loads

  return {
    id: userData?.id ,
    avatar: userData?.user?.profilePic?.filePath ,
    name: userData?.user?.firstName ,
    email: userData?.user?.emailId ,
    role: userData?.user.role?.name
  };
};
