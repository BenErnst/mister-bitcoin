import { Component } from 'react';

export class ContactFilter extends Component {
    state = {
        term: '',
    };

    handleChange = ({ target }) => {
        const { onFilter } = this.props;
        const field = target.name;
        const value = target.value;
        this.setState({ [field]: value }, () => {
            onFilter(this.state);
        });
    };

    render() {
        const { term } = this.state;
        return (
            <form className="contact-filter-form">
                <section className="input-container">
                    <label htmlFor="term">Search Contact </label>
                    <input
                        onChange={this.handleChange}
                        value={term}
                        type="text"
                        name="term"
                        id="term"
                        placeholder="Type here..."
                    />
                </section>
            </form>
        );
    }
}
