import React from 'react';
import Button from '../../../UI/Button/Button';
import classes from './BuildContol.css'

const BuildControl = (props) => {
    return(
        

        <div className = {classes.BuildControl}>
        <div className = {classes.Label}>{props.label}</div>
            <button 
            className = {classes.Less}
            onClick = {props.removed}
             >Less</button>
            <button 
            className = {classes.More}
            onClick = {props.added}
             >More</button>
        </div>
    );
};
export default BuildControl;