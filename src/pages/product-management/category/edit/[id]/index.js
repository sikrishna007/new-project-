import ItemsEdit from "@/custom-components/items/itemsEdit";
import {paths} from "@/paths";
import {endpoints} from "@/endpoints";
import {Layout as DashboardLayout} from "@/layouts/admin-dashboard";
import * as React from "react";

const Page = ({category}) => {
  return (
      <ItemsEdit
          title="Product Category"
          pathUrl={paths.productManagement.category.index}
          category={category}
      />
  )
}

export const getServerSideProps = async (context) => {
  const token = context.req.cookies.accessToken;
  const res = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
      endpoints.category.index +
      "/" +
      context.params.id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
  );
  if (!res.ok) {
    return {
      props: {
        category: {},
      },
    };
  }
  const { data } = await res.json();
  return {
    props: {
      category: data[0],
    },
  };
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;