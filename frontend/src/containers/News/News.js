import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Card, CardBody, CardTitle, CardText, CardColumns} from "reactstrap";
import {NotificationContainer} from 'react-notifications';
import {fetchData} from "../../store/actions";
import NewsThumbnail from "../../components/NewsThumbnail/NewsThumbnail";



class News extends Component {

    componentDidMount() {
        this.props.onFetchData();
    }

    goToFull = (id) => {
        this.props.history.push({
            pathname: '/news/' + id
        })
    };

    dateFormat = date => {
        let datetime1 = date;
        let date1 = datetime1.split('T')[0];
        let minutes = datetime1.split('T')[1];
        minutes = minutes[0] + minutes[1] + minutes[2] + minutes[3] + minutes[4];
        return date1 + ' ' + minutes;
    };
    render() {
        let news = this.props.news;
        if (news.length === 0) {
            news = <h2>Add new piece of news</h2>;
        } else {
            news = this.props.news.map(news => (
                <Card body outline color="warning" key={news.id} style={{marginBottom: '10px'}} onClick={() => this.goToFull(news.id)}>

                    <CardBody>
                        <CardTitle className="mb-4">
                            <strong>{news.title}</strong>
                        </CardTitle>
                        <CardText>
                            {this.dateFormat(news.date)}
                        </CardText>
                        <NewsThumbnail image={news.image}/>
                    </CardBody>
                </Card>
            ));
        }
        return (
            <Fragment>
                <h1>
                   News
                </h1>
                <CardColumns>
                    {news}
                </CardColumns>
                <NotificationContainer/>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        news: state.news,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: () => dispatch(fetchData())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(News);