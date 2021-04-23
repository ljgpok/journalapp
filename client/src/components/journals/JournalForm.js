import React, { useState, useContext, useEffect } from 'react';
import JournalContext from '../../context/journal/journalContext';

const JournalForm = () => {
  const journalContext = useContext(JournalContext);

  const { addJournal, updateJournal, clearCurrent, current } = journalContext;

  useEffect(() => {
    if (current !== null) {
      setJournal(current);
    } else {
      setJournal({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }, [journalContext, current]);

  const [journal, setJournal] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  const { name, email, phone, type } = journal;

  const onChange = e =>
    setJournal({ ...journal, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addJournal(journal);
    } else {
      updateJournal(journal);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Journal' : 'Add Journal'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Journal Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      Professional
      <div>
        <input
          type='submit'
          value={current ? 'Update Journal' : 'Add Journal'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default JournalForm;
