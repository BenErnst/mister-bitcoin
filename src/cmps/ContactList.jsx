import { ContactPreview } from './ContactPreview';

export function ContactList({ contacts }) {
    return (
        <div className="contact-list-container">
            <ul>
                {contacts.map((contact) => (
                    <li key={contact._id}>
                        <ContactPreview contact={contact} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
