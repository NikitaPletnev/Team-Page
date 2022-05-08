import React from 'react';
import '../Styles/container.css'
import Header from "./Header";
import TeamList from "./TeamList";

const Container = () => {
    return (
        <div className='container'>
           <Header/>
           <TeamList/>
        </div>
    )
}

export default Container;
