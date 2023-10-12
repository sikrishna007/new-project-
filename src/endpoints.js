export const endpoints = {
  auth: {
    requestOtp: "/auth/generateOtp",
    verifyOtp: "/auth/verifyOtp"
  },
  userManagement: {
    employees: {
      index: "/employees",
    },
    customers: {
      index: "/customers",
    },
    vendors: {
      index: "/vendors",
    },
  },
  category: {
    index: "/offering_categories"
  },
  subCategory: {
    index: "/offering_sub_categories"
  },
  product: {
    index: "/offerings",
  },
  eventCategories: {
    index: "/event_categories",
    search:"/event_categories/search"
  },
  hsnSac: {
    index: "/hsn_sac_codes"
  }

};
