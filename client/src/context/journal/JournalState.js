import React, { useReducer } from 'react';
import axios from 'axios';
import JournalContext from './journalContext';
import journalReducer from './journalReducer';
import {
  GET_JOURNALS,
  ADD_JOURNAL,
  DELETE_JOURNAL,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_JOURNAL,
  FILTER_JOURNALS,
  CLEAR_JOURNALS,
  CLEAR_FILTER,
  JOURNAL_ERROR
} from '../types';

const JournalState = props => {
  const initialState = {
    journals: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(journalReducer, initialState);

  // Get Journals
  const getJournals = async () => {
    try {
      const res = await axios.get('/api/journals');

      dispatch({
        type: GET_JOURNALS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: JOURNAL_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Journal
  const addJournal = async journal => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/journals', journal, config);

      dispatch({
        type: ADD_JOURNAL,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: JOURNAL_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Journal
  const deleteJournal = async id => {
    try {
      await axios.delete(`/api/journals/${id}`);

      dispatch({
        type: DELETE_JOURNAL,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: JOURNAL_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Journal
  const updateJournal = async journal => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/journals/${journal._id}`,
        journal,
        config
      );

      dispatch({
        type: UPDATE_JOURNAL,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: JOURNAL_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear Journals
  const clearJournals = () => {
    dispatch({ type: CLEAR_JOURNALS });
  };

  // Set Current Journal
  const setCurrent = journal => {
    dispatch({ type: SET_CURRENT, payload: journal });
  };

  // Clear Current Journal
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Journals
  const filterJournals = text => {
    dispatch({ type: FILTER_JOURNALS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <JournalContext.Provider
      value={{
        journals: state.journals,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addJournal,
        deleteJournal,
        setCurrent,
        clearCurrent,
        updateJournal,
        filterJournals,
        clearFilter,
        getJournals,
        clearJournals
      }}
    >
      {props.children}
    </JournalContext.Provider>
  );
};

export default JournalState;
