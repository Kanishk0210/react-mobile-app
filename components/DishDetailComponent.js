import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, Modal, Button, Alert, PanResponder, Share } from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import { postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
};

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});

function RenderDish(props) {

    const dish = props.dishes;

    handleViewRef = ref => view = ref;

    const recognizeDrag = ({moveX, moveY, dx, dy}) => {
        if(dx<-100)
            return true;
        else 
            return false;
    };

    const recognizeComment = ({moveX, moveY, dx, dy}) => {
        if(dx>100)
            return true;
        else 
            return false;
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        
        onPanResponderGrant: () => {
            view.rubberBand(1000)
                .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
        },

        onPanResponderEnd: (e, gestureState) => {
            console.log('pan responder end', gestureState);
            if(recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to your favorites?',
                    [
                        {
                            text: 'Cancel',
                            onPress: console.log('Cancelled'),
                            style: 'cancel'                            
                        },
                        {
                            text: 'Ok',
                            onPress: () => props.favorite ? console.log('Already') : props.onPress(),
                            style: 'default'
                        },                        
                    ],
                    {cancelable: false}
                );} 
            if(recognizeComment(gestureState))
                {props.toggleModal();}     

            return true;
        }
        
    });

    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: message,
            url: url
        }, {
            dialogTitle: 'share ' + dish.name
        });
    }

        if(dish!=null) {
            return(
                <View>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
                        ref={handleViewRef}
                        {...panResponder.panHandlers} 
                        >
                        <Card
                            featuredTitle={dish.name}
                            image={{uri: baseUrl + dish.image}}
                            >
                            <Text> {dish.description} </Text>
                            <View style={styles.formRow}>
                            <Icon                     
                                raised
                                reverse
                                name={props.favorite ? 'heart' : 'heart-o'}
                                type='font-awesome'
                                color='#f50'
                                onPress={() => props.favorite ? console.log('Already') : props.onPress()}
                                />
                            <Icon 
                                raised
                                reverse
                                name='pencil'
                                type='font-awesome'
                                color='#512DA8'
                                onPress={() => props.toggleModal()}
                                /> 
                            <Icon 
                                raised
                                reverse
                                name='share'
                                type='font-awesome'
                                color='#512DA8'
                                onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)}
                                />
                            </View>                                                               
                        </Card> 
                    </Animatable.View>                   
                </View>
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
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title='Comments'>
                <FlatList 
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                    />
            </Card>
        </Animatable.View>
    );
}

class DishDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: '',
            rating: '',
            comment: '',
            showModal: false
        }
    }

    static navigationOptions = {
        title: 'Dish Detail'
    };

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    setAuthor(author) {
        this.setState({author: author});
    }

    setRating(rating) {
        this.setState({rating: rating});
    }
    setComment(comment) {
        this.setState({comment: comment});
    }

    handleSubmitComment(dishId) {
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
    }

    resetState() {
        this.setState({
            author: '',
            rating: '',
            comment: '',
            showModal: false
        });
    }
    RenderDish
    render() {

        const dishId = this.props.navigation.getParam('dishId','');

        return(            
            <ScrollView>
                <RenderDish dishes={this.props.dishes.dishes[+dishId]} favorite={this.props.favorites.some(el => el===dishId)} 
                    onPress={() => this.markFavorite(dishId)} toggleModal={() => this.toggleModal()} />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId===dishId)} />  
                <Modal
                        animationType='slide'
                        transparent={false}
                        visible={this.state.showModal}
                        onDismiss={() => this.toggleModal()} 
                        onRequestClose={() => this.toggleModal()} 
                        >                   
                        <View style={styles.modal}>
                            <Rating
                                showRating
                                style={{margin: 10}}
                                onFinishRating={(rating) => this.setRating(rating)}
                                />
                            <Input 
                                placeholder='  Author'
                                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                                style={{margin: 10}}
                                onChangeText={(author) => this.setAuthor(author)}
                                />
                            <Input 
                                placeholder='  Comment'
                                leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                                style={{margin: 10}}
                                onChangeText={(comment) => this.setComment(comment)}
                                />  
                            <View margin={10}>
                                <Button                                      
                                    color='#512DA8'
                                    title='Submit'                 
                                    onPress={() => {this.handleSubmitComment(dishId); this.toggleModal()}}               
                                    />
                            </View>     
                            <View margin={10}>
                                <Button  
                                    color='#7f7f7f'
                                    title='Cancel'   
                                    onPress={() => {this.toggleModal(); this.resetState();}}                             
                                    />
                            </View>                         
                                
                        </View>
                    </Modal>              
            </ScrollView>            
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex:1
    },
    modal: {
        justifyContent: 'center',
        margin: 20        
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);