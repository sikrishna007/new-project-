import ItemsAdd from "@/custom-components/items/itemsAdd";
import {paths} from "@/paths";
import {Layout as DashboardLayout} from "@/layouts/admin-dashboard";
import * as React from "react";

const Page = () => {
    return (
        <ItemsAdd
            title="Product Category"
            pathUrl={paths.productManagement.category.index}
        />
    )
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;