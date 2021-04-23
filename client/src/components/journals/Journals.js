import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import JournalItem from './JournalItem';
import Spinner from '../layout/Spinner';
import JournalContext from '../../context/journal/journalContext';

const Journals = () => {
  const journalContext = useContext(JournalContext);

  const { journals, filtered, getJournals, loading } = journalContext;

  useEffect(() => {
    getJournals();
    // eslint-disable-next-line
  }, []);

  if (journals !== null && journals.length === 0 && !loading) {
    return <h4>Please add a journal</h4>;
  }

  return (
    <Fragment>
      {journals !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(journal => (
                <CSSTransition
                  key={journal._id}
                  timeout={500}
                  classNames='item'
                >
                  <JournalItem journal={journal} />
                </CSSTransition>
              ))
            : journals.map(journal => (
                <CSSTransition
                  key={journal._id}
                  timeout={500}
                  classNames='item'
                >
                  <JournalItem journal={journal} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Journals;
