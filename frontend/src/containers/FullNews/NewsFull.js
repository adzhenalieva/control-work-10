import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {NotificationContainer} from 'react-notifications';
import {openOneItem, dataDelete, commentDelete, createComment, fetchComments} from "../../store/actions";
import {Card, CardBody, CardTitle, CardText, Button} from "reactstrap";

import FullNewsItem from "../../components/FullNewsItem/FullNewsItem";
import CommentForm from "../../components/CommentForm/CommentForm";


class NewsFull extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.openFull(id);
        this.props.fetchComments(id);
    }

    delete = id => {
        const history = this.props.history;
        this.props.delete(id, history);
    };
    deleteComment = id => {
        const history = this.props.history;
        this.props.deleteComment(id, history);
    };

    createComment = data => {
        const id = this.props.match.params.id;
        console.log(id);
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
            comments = <h4>Leave your comment here</h4>;
        } else {
            comments = this.props.comments.map(comment => (
                <Card body outline color="warning" key={comment.id} style={{marginBottom: '10px'}}>
                    <CardBody>
                        <CardTitle className="mb-4">
                            <strong>{comment.author}</strong>
                        </CardTitle>
                        <CardText>
                            {comment.comment}
                        </CardText>
                        <Button color="warning"  onClick={() => this.deleteComment(comment.id)}>Delete</Button>
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
                <CommentForm onSubmit={this.createComment}/>
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
        onCommentCreated: data => dispatch(createComment(data)),
        fetchComments: id => dispatch(fetchComments(id)),
        deleteComment: (id, history) => dispatch(commentDelete(id, history)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsFull);