
import { storageService } from './storageService.js';
// import { makeId } from './utilService.js';

export const UserService = {
    getUser,
    signUp,
    addMove,
    reduceBalance
}

const USER_KEY = 'loggedInUser';

function getUser() {
    return storageService.load(USER_KEY);
}

function signUp(username) {
    const newUser = _getNewUser(username);
    return _saveUser(newUser);
}

function addMove(move) {
    const user = getUser();
    user.moves.push(move);
    return _saveUser(user);
}

function reduceBalance(amount) {
    const user = getUser();
    user.coins -= amount;
    return _saveUser(user);
}

function _saveUser(user) {
    return storageService.store(USER_KEY, user);
}

function _getNewUser(name) {
    return { 
        name,
        coins: 100,
        moves: [],
    };
}