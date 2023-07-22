import { ReactNode } from "react";
import { isAdmin, isBusiness, verifyToken } from "./TokenManager";
import { Navigate } from "react-router-dom";

interface Props {
    children: ReactNode
}

function RouteGuard({ children }: Props) {
    return verifyToken() ? (
        <>{children}</>
    ) : (
        <Navigate
            to="/login"
            replace={true}
        />
    )
}
function business({ children }: Props) {
    return isBusiness() ? (
        <>{children}</>
    ) : (
        <Navigate
            to="/"
            replace={true}
        />
    )
}
function admin({ children }: Props) {
    return isAdmin() ? (
        <>{children}</>
    ) : (
        <Navigate
            to="/"
            replace={true}
        />
    )
}

export default RouteGuard;