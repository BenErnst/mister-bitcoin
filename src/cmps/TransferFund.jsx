import { Component, createRef } from 'react';

export class TransferFund extends Component {
    state = {
        amount: '',
    };

    inputRef = createRef();

    handleChange = ({ target }) => {
        this.setState({ amount: +target.value });
    };

    onTransferCoins = async (ev) => {
        ev.preventDefault();
        const { amount } = this.state;
        const { maxCoins } = this.props;
        if (amount > maxCoins || amount <= 0) {
            alert('Over Budget!');
            return;
        }
        await this.props.transferCoins(amount);
        this.inputRef.current.value = '';
    };

    render() {
        const { amount } = this.state;
        const { contact } = this.props;

        return (
            <div className="transfer-fund-container">
                <h3>{`Transfer coins to ${contact.name}`}</h3>

                <form onSubmit={this.onTransferCoins} className="transfer-fund-form">
                    <section className="input-container">
                        <label htmlFor="term">Amount: </label>
                        <input
                            onChange={this.handleChange}
                            value={amount}
                            type="number"
                            name="amount"
                            id="amount"
                            ref={this.inputRef}
                            placeholder="Type..."
                        />
                    </section>
                    <button>Transfer</button>
                </form>
            </div>
        );
    }
}
