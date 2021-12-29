import { ContactService } from "../../services/ContactService";

export function loadContacts() {
    return async (dispatch, getState) => {
        const { filterBy } = getState().contactModule;
        try {
            const contacts = await ContactService.getContacts(filterBy);
            dispatch({ type: 'SET_CONTACTS', contacts });
        } catch (err) {
            console.log('Error in loadContacts (contactActions)', err);
        }
    }
}

export function removeContact(contactId) {
    return async (dispatch) => {
        try {
            await ContactService.deleteContact(contactId);
            dispatch({ type: 'REMOVE_CONTACT', contactId });
        } catch (err) {
            console.log('Error in removeContact (contactActions)', err);
        }
    }
}

export function setFilterBy(filterBy) {
    return async (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY', filterBy });
    }
}

export function getContactById(contactId) {
    return async () => {
        return await ContactService.getContactById(contactId);
    }
}