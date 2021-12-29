import { Component, createRef } from 'react';
import { ContactService } from '../services/ContactService';
import Button from '@mui/material/Button';

export class ContactEdit extends Component {
    state = {
        contact: null,
    };

    nameInputRef = createRef();

    async componentDidMount() {
        const contactId = this.props.match.params.id;
        const contact = contactId
            ? await ContactService.getContactById(contactId)
            : ContactService.getEmptyContact();
        this.setState({ contact }, () => this.nameInputRef.current.focus());
    }

    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.type === 'number' ? +target.value : target.value;
        this.setState((prevState) => ({ contact: { ...prevState.contact, [field]: value } }));
    };

    onSaveContact = async (ev) => {
        ev.preventDefault();
        const { contact } = this.state;
        await ContactService.saveContact({ ...contact });
        this.backToContacts();
    };

    onDeleteContact = async () => {
        const { _id } = this.state.contact;
        await ContactService.deleteContact(_id);
        this.backToContacts();
    };

    backToContacts = () => {
        this.props.history.push('/contact');
    };

    render() {
        const { contact } = this.state;

        if (!contact) return <img src={require(`../img/loading.gif`)} className="loading-gif" />;
        return (
            <div className="contact-edit-container">
                <h1>{`${contact._id ? 'Edit Contact' : 'Add Contact'}`}</h1>

                {contact._id ? <img src={`https://i.pravatar.cc/150?u=${contact.imgNum}`} /> : null}

                <form onSubmit={this.onSaveContact}>
                    <label htmlFor="name">Name</label>
                    <input
                        ref={this.nameInputRef}
                        onChange={this.handleChange}
                        value={contact.name}
                        type="text"
                        name="name"
                        id="name"
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        onChange={this.handleChange}
                        value={contact.email}
                        type="email"
                        name="email"
                        id="email"
                    />

                    <label htmlFor="phone">Phone</label>
                    <input
                        onChange={this.handleChange}
                        value={contact.phone}
                        type="number"
                        name="phone"
                        id="phone"
                    />

                    <button>SAVE</button>
                </form>

                <div>
                    <Button onClick={this.backToContacts} color="secondary">
                        Cancel
                    </Button>
                    {contact._id ? (
                        <Button onClick={this.onDeleteContact} variant="outlined" color="error">
                            Delete Contact
                        </Button>
                    ) : null}
                </div>
            </div>
        );
    }
}
