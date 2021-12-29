import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

export function ContactPreview({ contact }) {
    return (
        <div className="contact-preview-container">
            <Link to={`/contact/${contact._id}`} className="details-link">
                <Avatar
                    src={`https://i.pravatar.cc/150?u=${contact.imgNum}`}
                    sx={{ width: 150, height: 150 }}
                    className="contact-avatar"
                />
                <strong>{contact.name}</strong>
            </Link>
            <Link to={`/contact/edit/${contact._id}`} className="edit-link">
                Edit
            </Link>
        </div>
    );
}
