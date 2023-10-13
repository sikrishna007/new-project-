import HsnSacCreate from "@/custom-components/setup/hsnSacCreate";
import {Layout as DashboardLayout} from "@/layouts/admin-dashboard";

const Page = () => {
    return (
        <HsnSacCreate
            CodeName="HSN"
            codePath="hsn"
            isHsn="true"
        />
    )
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page;