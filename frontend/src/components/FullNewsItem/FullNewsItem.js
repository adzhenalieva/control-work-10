import React from 'react';
import ItemThumbnail from "../ItemThumbnail/ItemThumbnail";
import {Button} from "reactstrap";

const FullNewsItem = props =>{
    return (
        <div>
            <h2>{props.title} </h2>
            <p>{props.date.split('T')[0]}</p>
            <ItemThumbnail image={props.image}/>
            <p>Description: {props.description}</p>
            <Button color="warning"  onClick={props.delete}>Delete</Button>
        </div>
    );
};

export default FullNewsItem;