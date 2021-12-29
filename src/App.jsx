import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { Component } from 'react';
import './assets/styles/style.scss';
import { HomePage } from './pages/HomePage';
import { AppHeader } from './cmps/AppHeader';
import { ContactPage } from './pages/ContactPage';
import { ContactDetailsPage } from './pages/ContactDetailsPage';
import { ContactEdit } from './pages/ContactEdit';
import { StatisticPage } from './pages/StatisticPage';
import { SignUp } from './pages/SignUp';

export class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <AppHeader />
                    <main className="container">
                        <Switch>
                            <Route component={ContactEdit} path="/contact/edit/:id?" />
                            <Route component={ContactDetailsPage} path="/contact/:id" />
                            <Route component={ContactPage} path="/contact" />
                            <Route component={StatisticPage} path="/statistic" />
                            <Route component={HomePage} path="/homepage" />
                            <Route component={SignUp} path="/" />
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
}
