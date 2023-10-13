import HsnSacCreate from "@/custom-components/setup/hsnSacCreate";
import {Layout as DashboardLayout} from "@/layouts/admin-dashboard";

const Page = () => {
  return (
      <HsnSacCreate
          CodeName="SAC"
          codePath="sac"
          isHsn="false"
      />
  )
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Page;