import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {NotificationContainer} from 'react-notifications';
import NewsForm from "../../components/NewsForm/NewsForm";
import {createNews} from "../../store/actions";

class NewPieceOfNews extends Component {

    createItem = data => {
        this.props.onItemCreated(data).then(()=> {
            this.props.history.push('/news');
        });
    };

    render() {
        return (
            <Fragment>
                <h2>New piece of news</h2>
                <NewsForm onSubmit={this.createItem}/>
                <NotificationContainer/>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onItemCreated: data => dispatch(createNews(data))

});
export default connect(null, mapDispatchToProps)(NewPieceOfNews);