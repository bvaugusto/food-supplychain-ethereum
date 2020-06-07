import React from "react";
import { Link } from "react-router-dom";

const links = [
    { 'link': '/', 'icon': 'home', 'name': 'Início' },
    { 'link': '/users', 'icon': 'home', 'name': 'Usuários' },
];

export default props => {

    return (
        <>
            {links.map((option, index) => {
                let icon = `fa fa-${option.icon}`;
                return (
                    <Link to={option.link} key={index}> <i className={icon}></i> {option.name} </Link>
                )
            })}
        </>
    )
}