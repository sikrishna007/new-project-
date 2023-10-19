import {useAuth} from "@/hooks/use-auth";
import Cookies from "js-cookie";

const RoleBasedView = (props) => {
    const { children, permissions } = props;
    const { user } = useAuth(); // Assuming there is a custom hook 'useAuth' that provides user information

    let role = Cookies.get("role")
    // Here check the user permissions
    const canView = permissions.includes(role); // Placeholder value, the actual permission check logic is missing

    if (!canView) {
        return "" // If the user doesn't have the required permission, render nothing
    }

    return <>{children}</>; // Render the protected content
};

export default RoleBasedView;