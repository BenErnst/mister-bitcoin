import { NavLink, withRouter } from 'react-router-dom';
import { UserService } from '../services/UserService';

function _AppHeader() {
    const user = UserService.getUser();
    return (
        <div>
            <header className="app-header-container">
                <h1 className="main-logo">Mister BitCoin</h1>
                {user ? (
                    <nav>
                        <NavLink activeClassName="my-active" exact to="/homepage">
                            Home
                        </NavLink>
                        <NavLink activeClassName="my-active" to="/contact">
                            Contacts
                        </NavLink>
                        <NavLink activeClassName="my-active" to="/statistic">
                            Statistics
                        </NavLink>
                    </nav>
                ) : null}
            </header>
        </div>
    );
}

export const AppHeader = withRouter(_AppHeader);
