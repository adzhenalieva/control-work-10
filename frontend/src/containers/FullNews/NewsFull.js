import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {NotificationContainer} from 'react-notifications';
import {openOneItem, dataDelete} from "../../store/actions";

import FullNewsItem from "../../components/FullNewsItem/FullNewsItem";



class News extends Component {

    componentDidMount() {
       const id = this.props.match.params.id;
        this.props.openFull(id);
    }

    delete = (id) => {
        const history = this.props.history;
        this.props.delete(id, history);
    };

    render() {
        return (
            <Fragment>
                    {this.props.oneItem ?
                        <FullNewsItem
                            title = {this.props.oneItem.title}
                            image={this.props.oneItem.image}
                            description={this.props.oneItem.description}
                            date={this.props.oneItem.date}
                            delete={() => this.delete(this.props.oneItem.id)}
                        />
                        : null
                    }
                <NotificationContainer/>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        oneItem: state.oneItem
    }
};

const mapDispatchToProps = dispatch => {
    return {
        openFull: id => dispatch(openOneItem(id)),
        delete: (id, history) => dispatch(dataDelete(id, history))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(News);