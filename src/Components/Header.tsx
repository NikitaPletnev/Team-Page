import React from 'react';
import {TeamIcon} from "../Icons/TeamIcon";
import '../Styles/header.css'

const Header = () => {
    return (
        <div className='header'>
            <span>YOUR TEAM FOR THIS TEST</span>
            <div>
                <span>TEAM PAGE</span>
                <TeamIcon/>
            </div>
        </div>
    )
}

export default Header;
