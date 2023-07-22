import { ReactNode } from "react";
import { isAdmin, isBusiness, verifyToken } from "./TokenManager";
import { Navigate } from "react-router-dom";

interface Props {
    children: ReactNode
}
function RouteBusiness({ children }: Props) {
    return isBusiness() ? (
        <>{children}</>
    ) : (
        <Navigate
            to="/"
            replace={true}
        />
    )
}

export default RouteBusiness;