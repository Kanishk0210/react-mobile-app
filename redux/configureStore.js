import {createStore, combineReducers, applyMiddleware} from 'redux';
import {dishes} from './dishes';
import {comments} from './comments';
import {promotions} from './promotions';
import {leaders} from './leaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const configureStore = () => {
    const store = createStore(
        combineReducers({            
            dishes: dishes,
            comments: comments,
            promotions: promotions,
            leaders: leaders,
            
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};