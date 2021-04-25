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
        title: '',
        body: ''
      });
    }
  }, [journalContext, current]);

  const [journal, setJournal] = useState({
    name: '',
    title: '',
    body: ''
  });

  const { name, title, body } = journal;

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
        {current ? 'Edit Note' : 'Add Note'}
      </h2>

      <input
        type='text'
        placeholder='Title'
        name='title'
        value={title}
        onChange={onChange}
      />
      <textarea
        type='text'
        placeholder='Body'
        name='body'
        value={body}
        onChange={onChange}
      />
      <input
        type='title'
        placeholder='Author Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <div>
        <input
          type='submit'
          value={current ? 'Update Note' : 'Add Note'}
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
