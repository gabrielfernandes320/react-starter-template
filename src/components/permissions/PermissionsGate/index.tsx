import { flatten, removeDuplicates } from "../../../utils/array";

import React, { cloneElement } from "react";
import { ReactNode } from "react";
import { useAuth } from "../../../hooks/use-auth";
import { IPermission } from "../../../interfaces/permission/permission";

interface Props {
    userPermissions?: { reference: string }[];
    allowedPermissions: string[];
    renderNoAccess?: ReactNode;
    noAccessProps?: object;
    children: ReactNode;
}

const hasPermission = (
    userPermissions: IPermission[] | { reference: string }[],
    allowedPermissions: string[]
) => {
    if (allowedPermissions.length === 0) {
        return true;
    }

    if (userPermissions.length === 0) {
        return false;
    }

    return userPermissions.some((permission) =>
        allowedPermissions.includes(permission.reference)
    );
};

const PermissionsGate: React.FC<Props> = ({
    allowedPermissions,
    renderNoAccess,
    userPermissions,
    noAccessProps,
    children,
}: Props) => {
    const { user } = useAuth();
    const permissions: IPermission[] = removeDuplicates(
        flatten(user?.roles?.map((role) => role?.permissions))
    );

    const permissionGranted = hasPermission(
        userPermissions ? userPermissions : permissions ?? [],
        allowedPermissions
    );

    if (!permissionGranted && renderNoAccess) {
        return <>{renderNoAccess}</>;
    }

    if (!permissionGranted && !renderNoAccess && noAccessProps) {
        return cloneElement(children as any, { ...noAccessProps });
    }

    return permissionGranted ? <>{children}</> : <> </>;
};

export default PermissionsGate;
