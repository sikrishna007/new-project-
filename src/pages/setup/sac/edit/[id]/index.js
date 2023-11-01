import {endpoints} from "@/endpoints";
import HsnSacEdit from "@/custom-components/setup/hsnSacEdit";
import {Layout as DashboardLayout} from "@/layouts/admin-dashboard";
const Page = ({code}) => {
    return(
        <HsnSacEdit
            CodeName="SAC"
            codePath="sac"
            code={code}
        />
    )
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
                code: {},
            },
        };
    }
    const { data } = await res.json();
    return {
        props: {
            code: data[0],
        },
    };
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;