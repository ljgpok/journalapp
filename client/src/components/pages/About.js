import React from 'react';
import Journals from '../journals/Journals';
import JournalForm from '../journals/JournalForm';
import JournalFilter from '../journals/JournalFilter';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <JournalForm />
      </div>
      <div>
        <JournalFilter />
        <Journals />
      </div>
    </div>
  );
};

export default Home;
