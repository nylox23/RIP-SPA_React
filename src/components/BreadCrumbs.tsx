import { Link } from "react-router-dom";
import type { FC } from "react";
import { Fragment } from "react";
import { ROUTES, ROUTE_LABELS } from "../Routes";
import "./BreadCrumbs.css";

interface ICrumb {
    label: string;
    path?: string;
}

interface BreadCrumbsProps {
    crumbs: ICrumb[];
}

export const BreadCrumbs: FC<BreadCrumbsProps> = ({ crumbs }) => {
    return (
        <ul className="breadcrumbs">
            <li>
                <Link to={ROUTES.HOME}>{ROUTE_LABELS.HOME}</Link>
            </li>
            {crumbs.map((crumb, index) => (
                <Fragment key={index}>
                    <li className="slash">/</li>
                    {crumb.path ? (
                        <li><Link to={crumb.path}>{crumb.label}</Link></li>
                    ) : (
                        <li className="active">{crumb.label}</li>
                    )}
                </Fragment>
            ))}
        </ul>
    );
};