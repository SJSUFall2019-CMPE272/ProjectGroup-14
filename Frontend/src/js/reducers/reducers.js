import {combineReducers} from 'redux';
import AccountReducer from './accountReducer';
import ProfileReducer from './profileReducer';
import RestaurantReducer from './restaurantReducer';
import OwnerReducer from './ownerReducer';
import messageReducer from './messageReducer';
import OwnerChatReducer from './ownerChatReducer';

const rootReducer = combineReducers({
    account: AccountReducer,
    profile: ProfileReducer,
    restaurant: RestaurantReducer,
    owner: OwnerReducer,
    msg: messageReducer,
    ownerChat: OwnerChatReducer
});

export default rootReducer;