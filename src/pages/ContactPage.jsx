import { Component } from 'react';
import { ContactList } from '../cmps/ContactList';
import { ContactFilter } from '../cmps/ContactFilter';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadContacts, removeContact, setFilterBy } from '../store/actions/contactActions';

class _ContactPage extends Component {
    componentDidMount() {
        this.props.loadContacts();
    }

    onFilter = (filterBy) => {
        this.props.setFilterBy(filterBy);
        this.props.loadContacts();
    };

    render() {
        const { contacts } = this.props;
        if (!contacts) return <img src={require(`../img/loading.gif`)} className="loading-gif" />;
        return (
            <div>
                <ContactFilter onFilter={this.onFilter} />
                <Link to="/contact/edit" className="add-contact-link">
                    Add New Contact
                </Link>
                <ContactList contacts={contacts} history={this.props.history} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        contacts: state.contactModule.contacts,
    };
};

const mapDispatchToProps = {
    loadContacts,
    removeContact,
    setFilterBy,
};

export const ContactPage = connect(mapStateToProps, mapDispatchToProps)(_ContactPage);
