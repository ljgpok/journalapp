import {
  GET_JOURNALS,
  ADD_JOURNAL,
  DELETE_JOURNAL,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_JOURNAL,
  FILTER_JOURNALS,
  CLEAR_FILTER,
  JOURNAL_ERROR,
  CLEAR_JOURNALS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_JOURNALS:
      return {
        ...state,
        journals: action.payload,
        loading: false
      };
    case ADD_JOURNAL:
      return {
        ...state,
        journals: [action.payload, ...state.journals],
        loading: false
      };
    case UPDATE_JOURNAL:
      return {
        ...state,
        journals: state.journals.map(journal =>
          journal._id === action.payload._id ? action.payload : journal
        ),
        loading: false
      };
    case DELETE_JOURNAL:
      return {
        ...state,
        journals: state.journals.filter(
          journal => journal._id !== action.payload
        ),
        loading: false
      };
    case CLEAR_JOURNALS:
      return {
        ...state,
        journals: null,
        filtered: null,
        error: null,
        current: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_JOURNALS:
      return {
        ...state,
        filtered: state.journals.filter(journal => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return journal.name.match(regex) || journal.email.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case JOURNAL_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
