import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {NotificationContainer} from 'react-notifications';
import {openOneItem, dataDelete, commentDelete, fetchComments, sendComment} from "../../store/actions";
import {Card, CardBody, Button, Col, Form, FormGroup, Input, Label} from "reactstrap"


import FullNewsItem from "../../components/FullNewsItem/FullNewsItem";




class NewsFull extends Component {

    state = {
        author: '',
        comment: ''
    };


    submitForm = event => {
        const id = this.props.match.params.id;

        event.preventDefault();
        const formData = {
            news_id: id,
            author: this.state.author,
            comment: this.state.comment
        };
        this.props.onCreated(formData).then(()=> {
            this.props.fetchComments(id);
            this.setState({author: '', comment: ''})
        });
    };

    inputChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value})
    };


    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.openFull(id);
        this.props.fetchComments(id);
    }

    delete = id => {
        let history = this.props.history;
        this.props.delete(id, history);

    };

    deleteComment = id => {
        const history = this.props.history;
        this.props.deleteComment(id, history);
    };

    dateFormat = date => {
        let datetime1 = date;
        let date1 = datetime1.split('T')[0];
        let minutes = datetime1.split('T')[1];
        minutes = minutes[0] + minutes[1] + minutes[2] + minutes[3] + minutes[4];
        return date1 + ' ' + minutes;
    };

    render() {
        let comments = this.props.comments;
        if (comments.length === 0) {
            comments = <h4>No comments yet</h4>;
        } else {
            comments = this.props.comments.map(comment => (
                <Card body outline color="warning" key={comment.id} style={{marginBottom: '10px'}}>
                    <CardBody>
                        <span className="mr-4">
                            <strong>{comment.author}</strong>
                        </span>
                        <span className="mr-4" >
                            {comment.comment}
                        </span>
                        <Button color="warning" className="float-right" onClick={() => this.deleteComment(comment.id)}>X</Button>
                    </CardBody>
                </Card>
            ));
        }
        return (
            <Fragment>
                {this.props.oneItem ?
                    <FullNewsItem
                        title={this.props.oneItem.title}
                        image={this.props.oneItem.image}
                        description={this.props.oneItem.description}
                        date={this.dateFormat(this.props.oneItem.date)}
                        delete={() => this.delete(this.props.oneItem.id)}
                    />
                    : null}
                {comments}
                <h4 className="my-4">Leave your comment</h4>
                <Form onSubmit={this.submitForm}>
                    <FormGroup row>
                        <Label sm={2} for="comment">Comment</Label>
                        <Col sm={10}>
                            <Input required
                                   type="textarea"
                                   name="comment" id="comment"
                                   placeholder="Enter comment"
                                   value={this.state.comment}
                                   onChange={this.inputChangeHandler}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2} for="author">Author</Label>
                        <Col sm={10}>
                            <Input required
                                   type="textarea"
                                   name="author" id="author"
                                   placeholder="Enter name"
                                   value={this.state.author}
                                   onChange={this.inputChangeHandler}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}>
                            <Button type="submit" color="warning">Save</Button>
                        </Col>
                    </FormGroup>
                </Form>
                <NotificationContainer/>
            </Fragment>
        );
    }
}


const mapStateToProps = state => {
    return {
        oneItem: state.oneItem,
        comments: state.comments
    }
};

const mapDispatchToProps = dispatch => {
    return {
        openFull: id => dispatch(openOneItem(id)),
        delete: (id, history) => dispatch(dataDelete(id, history)),
        fetchComments: id => dispatch(fetchComments(id)),
        deleteComment: (id, history) => dispatch(commentDelete(id, history)),
        onCreated: data => dispatch(sendComment(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsFull);