import { Component, createRef } from 'react';
import { UserService } from '../services/UserService';
import { connect } from 'react-redux';
import { setUser } from '../store/actions/userActions';

class _SignUp extends Component {
    state = {
        username: '',
        inputRef: createRef(),
    };

    componentDidMount = () => {
        this.state.inputRef.current.focus();
    };

    handleChange = ({ target }) => {
        this.setState({ username: target.value });
    };

    onSignUp = async (ev) => {
        ev.preventDefault();
        var { username } = this.state;
        if (!username) return;
        this.props.setUser(username);
        this.props.history.push('/homepage');
    };

    render() {
        const { username, inputRef } = this.state;
        return (
            <div>
                <section className="signup-container">
                    <img src={require(`../img/bitcoins.png`)} alt="bitcoins" />
                    <h1>JOIN US</h1>
                    <form onSubmit={this.onSignUp} className="signup-form">
                        <section className="input-container">
                            <label htmlFor="username"></label>
                            <input
                                onChange={this.handleChange}
                                value={username}
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter your name..."
                                ref={inputRef}
                            />
                        </section>
                        <button>Sign Up</button>
                    </form>
                </section>
            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         user: state.userModule.user,
//     };
// };

const mapDispatchToProps = {
    setUser,
};

export const SignUp = connect(undefined, mapDispatchToProps)(_SignUp);
