import HsnSacId from "@/custom-components/setup/hsnSacId";
import {Layout as DashboardLayout} from "@/layouts/admin-dashboard";
import {endpoints} from "@/endpoints";

const Page = ({customer}) => {
    return(
        <HsnSacId
            CodeName="HSN"
            codePath="hsn"
            customer={customer}
        />
    );
}


export const getServerSideProps = async (context) => {
    const token = context.req.cookies.accessToken;
    const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
        endpoints.hsnSac.index +
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
                customer: {},

            },
        };
    }
    const {data} = await res.json();
    return {
        props: {
            customer: data[0],
        },
    };
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;