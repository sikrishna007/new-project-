import {Seo} from 'src/components/seo';
import {Layout as DashboardLayout} from 'src/layouts/admin-dashboard';
import Typography from "@mui/material/Typography";


const Page = () => {


    return (
        <>
            <Seo title="Dashboard: Overview"/>
            <div
                style={{
                    width: '100%',
                    height: "100%",
                    textAlign: 'center',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundImage: 'linear-gradient(180deg, #6366F1 0%, #D8E6FA 100%)' /* Linear gradient background */
                }}>
                <div style={{
                    textAlign: 'center',
                    fontStyle: "normal",
                    position: 'absolute',
                    width: "40%",
                    lineHeight: "normal",
                }}>
                    <h1 style={{
                        fontSize: "2.5rem",
                        fontWeight: "800",
                        letterSpacing: "5.46px",
                        textTransform: "uppercase",
                    }}><span style={{color: "#0B0080",}}>Coming </span>Soon</h1>
                    <h4>Stay Tuned!</h4>
                    <Typography>Closely on the horizon: A dashboard to elevate your analysis with efficiency and precision. Stay
                        tuned</Typography>

                </div>

            </div>
        </>
    );
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
