import { Component } from 'react';
import moment from 'moment';

export class MovesList extends Component {
    render() {
        const { title, movesList } = this.props;
        return (
            <section className="moves-list-container">
                <h3>{title}</h3>
                <ul className="moves-list">
                    {movesList.map((move) => (
                        <li key={move.at}>
                            <p>
                                <span>At: </span>
                                {moment(move.at).calendar()}
                            </p>
                            <p>
                                <span>Amount: </span>
                                {`${move.amount}💰`}
                            </p>
                            <hr />
                        </li>
                    ))}
                </ul>
            </section>
        );
    }
}
