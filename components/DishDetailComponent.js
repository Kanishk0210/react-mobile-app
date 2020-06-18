import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView } from "react-native";
import { Card, Icon } from "react-native-elements";
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
});

function RenderDish(props) {

    const dish = props.dishes;

        if(dish!=null) {
            return(
                <Card
                    featuredTitle={dish.name}
                    image={{uri: baseUrl + dish.image}}
                    >
                    <Text> {dish.description} </Text>
                    <Icon 
                        raised
                        reverse
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already') : props.onPress()}
                        />
                </Card>
            );        
        }
        else {
            return(
                <View></View>
            );
        }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        );
    } 

    return(
        <Card title='Comments'>
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
                />
        </Card>
    );
}

class DishDetail extends Component {

    static navigationOptions = {
        title: 'Dish Detail'
    };

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    render() {

        const dishId = this.props.navigation.getParam('dishId','');

        return(            
            <ScrollView>
                <RenderDish dishes={this.props.dishes.dishes[+dishId]} favorite={this.props.favorites.some(el => el===dishId)} 
                    onPress={() => this.markFavorite(dishId)} />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId===dishId)} />
            </ScrollView>            
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);