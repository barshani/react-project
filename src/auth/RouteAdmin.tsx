import { ReactNode } from "react";
import { isAdmin, isBusiness, verifyToken } from "./TokenManager";
import { Navigate } from "react-router-dom";

interface Props {
    children: ReactNode
}

function RouteAdmin({ children }: Props) {
    return isAdmin() ? (
        <>{children}</>
    ) : (
        <Navigate
            to="/"
            replace={true}
        />
    )
}

export default RouteAdmin;