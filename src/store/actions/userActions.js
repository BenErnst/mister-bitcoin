import { UserService } from "../../services/UserService";

export function setUser(username) {
    return async (dispatch) => {
        const signedUser = UserService.signUp(username);
        dispatch({ type: 'SET_USER', user: signedUser });
    }
}

export function addMove(move) {
    return async (dispatch) => {
        const savedUser = UserService.addMove(move);
        dispatch({ type: 'SET_USER', user: savedUser });
    }
}

export function reduceBalance(amount) {
    return async (dispatch) => {
        const savedUser = UserService.reduceBalance(amount);
        dispatch({ type: 'SET_USER', user: savedUser });
    }
}