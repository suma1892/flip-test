// Imports: Dependencies
import { combineReducers } from 'redux';
// Imports: Reducers

import transactionList from './transactions-list.reducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  transactionList: transactionList
});

// Exports
export default rootReducer;