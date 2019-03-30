import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {NotificationContainer} from 'react-notifications';


class CommentForm extends Component {

    state = {
        news_id: 4,
        author: '',
        comment: '',
    };


    submitFormHandler = event => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });
        this.props.onSubmit(formData);
    };

    inputChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value})
    };

    render() {
        return (
            <Form onSubmit={this.submitFormHandler}>
                {/*<FormGroup row>*/}
                {/*    <Label sm={2} for="news_id">News_id</Label>*/}
                {/*    <Col sm={10}>*/}
                {/*        <Input required*/}
                {/*               type="text"*/}
                {/*               name="news_id" id="news_id"*/}
                {/*               placeholder="Enter news_id"*/}
                {/*               value={this.state.news_id}*/}
                {/*               onChange={this.inputChangeHandler}*/}
                {/*        />*/}
                {/*    </Col>*/}
                {/*</FormGroup>*/}
                <FormGroup row>
                    <Label sm={2} for="author">Your name</Label>
                    <Col sm={10}>
                        <Input
                               type="text"
                               name="author" id="author"
                               placeholder="Enter your name"
                               value={this.state.author}
                               onChange={this.inputChangeHandler}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} for="comment">Comment</Label>
                    <Col sm={10}>
                        <Input required
                               type="textarea"
                               name="comment" id="comment"
                               placeholder="Enter your comment"
                               value={this.state.comment}
                               onChange={this.inputChangeHandler}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col sm={{offset: 2, size: 10}}>
                        <Button type="submit" color="warning">Save</Button>
                    </Col>
                </FormGroup>
                <NotificationContainer/>
            </Form>
        );
    }
}

export default CommentForm;