import { Component } from 'react';
import { UserService } from '../services/UserService';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { BitcoinService } from '../services/BitcoinService';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { MovesList } from '../cmps/MovesList';

export class HomePage extends Component {
    state = {
        user: null,
        rate: null,
        movesList: [],
    };

    componentDidMount() {
        this.loadUser();
    }

    loadUser() {
        const user = UserService.getUser();
        this.setState({ user }, this.loadRate);
    }

    loadRate = async () => {
        const { user } = this.state;
        const rate = await BitcoinService.getRate(user.coins);
        this.setState({ rate }, this.setMovesList);
    };

    setMovesList = () => {
        const { user } = this.state;
        if (!user) return;
        const movesList = user.moves.slice(-3);
        this.setState({ movesList });
    };

    render() {
        const { user, rate, movesList } = this.state;

        return !user || !rate ? (
            <img src={require(`../img/loading.gif`)} className="loading-gif" />
        ) : (
            <div>
                <section className="user-container">
                    <div>
                        <h3>{`Hello ${user.name}!`}</h3>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar
                                src={require(`../img/Ben Ernst.jpeg`)}
                                className="user-avatar"
                            />
                        </StyledBadge>
                    </div>
                    <main>
                        <p>{`Coins: ${user.coins} 💰`}</p>
                        <p>{`BTC: ${rate} ₿`}</p>
                    </main>
                </section>

                {movesList.length ? (
                    <MovesList title={'Your Last Moves'} movesList={movesList} />
                ) : null}
            </div>
        );
    }
}

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: -1,
            left: -1,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));
