import React from "react";
import './menu-item.styles.scss' 

import { withRouter } from "react-router";

const MenuItem = ({ title, imageUrl,size,linkUrl,history,match }) => {
    console.log('Dentro de MenuItem..');
    console.log("Param match",match);
    return (

        <div 
            className={`${size} menu-item`}
            onClick={()=>history.push(`${match.url}${linkUrl}`)}
        >
            
            <div  style={{
                backgroundImage: `url(${imageUrl})`,
            }}  className="background-image"></div>

            <div className="content">
                <div className="title">{title.toUpperCase()}</div>
                <span className="subtitle">SHOP NOW</span>
            </div>
        </div>
    );
};

export default withRouter(MenuItem);
