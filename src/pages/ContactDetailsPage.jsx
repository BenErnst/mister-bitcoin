import { Component } from 'react';
import { ContactService } from '../services/ContactService';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { TransferFund } from '../cmps/TransferFund';
import { connect } from 'react-redux';
import { addMove, reduceBalance } from '../store/actions/userActions';
import { MovesList } from '../cmps/MovesList';

class _ContactDetailsPage extends Component {
    state = {
        contact: null,
        movesList: [],
    };

    componentDidMount() {
        this.loadContact();
        this.setMovesList();
    }

    async loadContact() {
        const { id } = this.props.match.params;
        const { contacts } = this.props;
        const contact = contacts
            ? contacts.find((c) => c._id === id)
            : await ContactService.getContactById(id);
        this.setState({ contact });
    }

    onBackToContacts = () => {
        this.props.history.push('/contact');
    };

    transferCoins = async (amount) => {
        const { contact } = this.state;
        const move = {
            toId: contact._id,
            to: contact.name,
            at: Date.now(),
            amount,
        };
        await this.props.addMove(move);
        await this.props.reduceBalance(amount);
        this.setMovesList();
    };

    setMovesList = () => {
        const { contact } = this.state;
        const { user } = this.props;
        if (!contact || !user) return;
        const movesList = user.moves.filter((move) => move.toId === contact._id);
        this.setState({ movesList }, () => window.scrollTo(0, 1000));
    };

    render() {
        const { contact, movesList } = this.state;
        const { user } = this.props;

        if (!contact || !user)
            return <img src={require(`../img/loading.gif`)} className="loading-gif" />;
        return (
            <div className="contact-details-container">
                <img src={`https://i.pravatar.cc/150?u=${contact.imgNum}`} />
                <p>
                    <strong>Name: </strong>
                    {contact.name}
                </p>
                <p>
                    <strong>Email: </strong>
                    {contact.email}
                </p>
                <p>
                    <strong>Phone: </strong>
                    {contact.phone}
                </p>

                <Link to={`/contact/edit/${contact._id}`} className="edit-link">
                    Edit Contact
                </Link>

                <Button onClick={this.onBackToContacts} variant="outlined">
                    Back
                </Button>

                <TransferFund
                    contact={contact}
                    maxCoins={user.coins}
                    transferCoins={this.transferCoins}
                />

                <MovesList title={'Your Moves'} movesList={movesList} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userModule.user,
        contacts: state.contactModule.contacts,
    };
};

const mapDispatchToProps = {
    addMove,
    reduceBalance,
};

export const ContactDetailsPage = connect(mapStateToProps, mapDispatchToProps)(_ContactDetailsPage);
