import React, { useContext, useRef, useEffect } from 'react';
import JournalContext from '../../context/journal/journalContext';

const JournalFilter = () => {
  const journalContext = useContext(JournalContext);
  const text = useRef('');

  const { filterJournals, clearFilter, filtered } = journalContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterJournals(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Note...'
        onChange={onChange}
      />
    </form>
  );
};

export default JournalFilter;
