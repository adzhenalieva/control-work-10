import React from 'react';
import NewsThumbnail from "../NewsThumbnail/NewsThumbnail";
import {Button} from "reactstrap";

const FullNewsItem = props =>{
    return (
        <div>
            <h2>{props.title} </h2>
            <p>{props.date}</p>
            <NewsThumbnail image={props.image}/>
            <p>{props.description}</p>
            <Button color="warning"  onClick={props.delete}>Delete</Button>
        </div>
    );
};

export default FullNewsItem;