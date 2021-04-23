import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import JournalContext from '../../context/journal/journalContext';

const JournalItem = ({ journal }) => {
  const journalContext = useContext(JournalContext);
  const { deleteJournal, setCurrent, clearCurrent } = journalContext;

  const { _id, name, email, phone, type } = journal;

  const onDelete = () => {
    deleteJournal(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open' /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone' /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(journal)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

JournalItem.propTypes = {
  journal: PropTypes.object.isRequired
};

export default JournalItem;
