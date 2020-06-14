import React, { Component } from 'react';
import { View, Text } from "react-native";
import { Card } from "react-native-elements";
import { DISHES } from '../shared/dishes';

function RenderDish(props) {

    const dish = props.dish;

        if(dish!=null) {
            return(
                <Card
                    featuredTitle={dish.name}
                    image={require('../images/uthappizza.png')}
                    >
                    <Text> {dish.description} </Text>
                </Card>
            );        
        }
        else {
            return(
                <View></View>
            );
        }
}

class DishDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        }
    }

    static navigationOptions = {
        title: 'Dish Detail'
    };

    render() {

        const dishId = this.props.navigation.getParam('dishId','');

        return(                        
            <RenderDish dish={this.state.dishes[+dishId]} />
        );
    }
}

export default DishDetail;