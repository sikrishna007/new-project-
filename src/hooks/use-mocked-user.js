import {useEffect, useState} from "react";
import {endpoints} from "../endpoints";
import Cookies from "js-cookie";
export const useMockedUser = () => {
  const [userData, setUserData] = useState(null);

  const handleCustomersGet = async () => {
    try {
      let token = Cookies.get("accessToken");
      const id = Cookies.get("id")
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
      // console.log(data);

      // Set the received data in state
      setUserData(data.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleCustomersGet();
  }, []); // Call the function when the component loads

  return {
    id: userData?.id ,
    avatar: userData?.avatar ,
    name: userData?.user.firstName ,
    email: userData?.user.emailId ,
    role: userData?.user.role?.name
  };
};
