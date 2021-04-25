import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import JournalContext from '../../context/journal/journalContext';

const JournalItem = ({ journal }) => {
  const journalContext = useContext(JournalContext);
  const { deleteJournal, setCurrent, clearCurrent } = journalContext;

  const { _id, name, title, body } = journal;

  const onDelete = () => {
    deleteJournal(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {title}{' '}

      </h3>
      <ul className='list'>
        {name && (
          <li>
            <i className='fas fa-envelope-open' /> {name}
          </li>
        )}
        {body && (
          <li>
            <i className='fas fa-body' /> {body}
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
