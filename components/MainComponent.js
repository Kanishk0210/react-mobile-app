import React from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import { View, Platform, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchLeaders, fetchPromos} from '../redux/ActionCreators';
import Reservation from './ReservationComponent';
import Favorites from './FavoritesComponent';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        leaders: state.leaders,
        promotions: state.promotions,
        comments: state.comments
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders())
})

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu, 
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name='menu' size={24}
                color='white'
                onPress= {() => navigation.toggleDrawer()}
                />
        })
     },
    DishDetail: { screen: DishDetail }
}, {
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DAB'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
});

const HomeNavigator = createStackNavigator({
    Home: { screen: Home },
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DAB'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
                color='white'
                onPress= {() => navigation.toggleDrawer()}
                />
    })
});

const ReservationNavigator = createStackNavigator({
    Contact: { screen: Reservation },
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DAB'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
                color='white'
                onPress= {() => navigation.toggleDrawer()}
                />
    })
});

const FavoritesNavigator = createStackNavigator({
    Contact: { screen: Favorites },
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DAB'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
                color='white'
                onPress= {() => navigation.toggleDrawer()}
                />
    })
});

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact },
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DAB'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
                color='white'
                onPress= {() => navigation.toggleDrawer()}
                />
    })
});

const AboutNavigator = createStackNavigator({
    About: { screen: About },
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DAB'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
                color='white'
                onPress= {() => navigation.toggleDrawer()}
                />
    })
});

const customDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container}
            forceIncet={{ top: 'always', horizontal: 'never' }} >
            <View style={styles.drawerHeader}>
                <View style={{flex: 1}}>
                    <Image source={require('../images/logo.png')} 
                        style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>
                        Ristorante Con Fusion
                    </Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            draweIcon: ({ tintColor }) => (                
                <Icon name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
            )
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About Us',
            drawerLabel: 'About Us',
            draweIcon: ({ tintColor }) => (
                <Icon name='info-circle'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
            )
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            draweIcon: ({ tintColor }) => (
                <Icon name='list'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
            )
        }
    },    
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact Us',
            drawerLabel: 'Contact Us',
            draweIcon: ({ tintColor }) => (
                <Icon name='address-card'
                    type='font-awesome'
                    size={22}
                    color={tintColor}
                    />
            )
        }
    },
    Reservation: {
        screen: ReservationNavigator,
        navigationOptions: {
            title: 'Reserve Table',
            drawerLabel: 'Reserve Table',
            draweIcon: ({ tintColor }) => (
                <Icon name='cutlery'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
            )
        }
    },
    Favorites: {
        screen: FavoritesNavigator,
        navigationOptions: {
            title: 'My Favorites',
            drawerLabel: 'My Favorites',
            draweIcon: ({ tintColor }) => (
                <Icon name='heart'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
            )
        }
    }
}, {
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: customDrawerContentComponent
});

class Main extends React.Component{

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {
        return(
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }} >
                <MainNavigator />
            </View>                            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
      },
      drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
      },
      drawerImage: {
        margin: 10,
        width: 80,
        height: 60
      }
});

export default connect(mapStateToProps,mapDispatchToProps)(Main);