import { createResourceId } from "src/utils/create-resource-id";
import { decode, JWT_EXPIRES_IN, JWT_SECRET, sign } from "src/utils/jwt";
import { wait } from "src/utils/wait";
import jwtDecode from "jwt-decode";
import { users } from "./data";
import { endpoints } from "src/endpoints";
import toast from "react-hot-toast";

const STORAGE_KEY = "users";

// NOTE: We use sessionStorage since memory storage is lost after page reload.
//  This should be replaced with a server call that returns DB persisted data.

const getPersistedUsers = () => {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
};

const persistUser = (user) => {
  try {
    const users = getPersistedUsers();
    const data = JSON.stringify([...users, user]);
    sessionStorage.setItem(STORAGE_KEY, data);
  } catch (err) {
    console.error(err);
  }
};

class AuthApi {
  async signIn(request, code) {
    const { email, phoneNumber } = request;
    const requestBody = email ? { email } : { phoneNumber };
    // console.log({ ...requestBody, otp: code });
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BASE_URL + endpoints.auth.verifyOtp,
          {
            method: "POST",
            body: JSON.stringify({ ...requestBody, otp: code }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          toast.error("invalid OTP", {position: 'top-right', autoClose: 10000 });
          reject(new Error(response));
          return;
        }
        const data = await response.json();
        const decode=jwtDecode(data.token)
        if (decode.Role ==="VENDOR"){
        resolve({ accessToken: data.token, user: data.vendors });}

        else {
          resolve({ accessToken: data.token, user: data.employee })
        }
      } catch (err) {
        reject(new Error("Internal server error"));
      }
    });
  }
  async requestOtp(email, phoneNumber) {
    // console.log(email, phoneNumber);
    const requestBody = email ? { email } : { phoneNumber };

    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BASE_URL + endpoints.auth.requestOtp,
          {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          toast.error("invalid credentials",{
            position: 'top-right', // Set the position to top-right
            autoClose: 10000,
          });
          reject(new Error(response));
          return;
        }
        const data = await response.json();

        resolve({ data });
      } catch (err) {
        console.error("[Auth Api]: ", err);
        reject(new Error("Internal server error"));
      }
    });
  }

  async signUp(request) {
    const { email, name, password } = request;

    await wait(1000);

    return new Promise((resolve, reject) => {
      try {
        // Merge static users (data file) with persisted users (browser storage)
        const mergedUsers = [...users, ...getPersistedUsers()];

        // Check if a user already exists
        let user = mergedUsers.find((user) => user.email === email);

        if (user) {
          reject(new Error("User already exists"));
          return;
        }

        user = {
          id: createResourceId(),
          avatar: undefined,
          email,
          name,
          password,
          plan: "Standard",
        };

        persistUser(user);

        const accessToken = sign({ userId: user.id }, JWT_SECRET, {
          expiresIn: JWT_EXPIRES_IN,
        });

        resolve({ accessToken });
      } catch (err) {
        console.error("[Auth Api]: ", err);
        reject(new Error("Internal server error"));
      }
    });
  }

  me(request) {
    const { accessToken } = request;

    return new Promise((resolve, reject) => {
      try {
        // Decode access token
        const user = jwtDecode(accessToken);

        if (!user) {
          reject(new Error("Invalid authorization token"));
          return;
        }

        resolve({
          sub: user.sub,
        });
      } catch (err) {
        // console.log("hi");
        // console.error("[Auth Api]: ", err);
        reject(new Error("Internal server error"));
      }
    });
  }
}

export const authApi = new AuthApi();
