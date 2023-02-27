import { createReducer, on, ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { Document } from 'src/app/model/document';
import { addMultipleDocIds, removeMultipleDocIds, checkboxStatus } from './document.action';

export const initialDocIdsEntries: Document[] = [];

export interface MultipleDocs{
  documentId: number;
  isChecked: boolean;
}

export const docIdReducer = createReducer(
    initialDocIdsEntries,
    

  on(addMultipleDocIds, (entries, multidoc) => {
    console.log(multidoc)
    let entriesClone: Document[] = JSON.parse(JSON.stringify(entries));
    entriesClone.push();
    console.log(entriesClone)
    entriesClone = [...new Set(entriesClone)]
    return entriesClone;
  }),


  on(removeMultipleDocIds, (entries, docId) => {
    const entriesClone: Document[] = JSON.parse(JSON.stringify(entries));
    const found = entriesClone.find(e => e.id === docId.id)
    if (found) {
      entriesClone.splice(entriesClone.indexOf(found), 1)
    }
    
    return entriesClone;
  }),

)

export const checkedStatus: Boolean = false;

export const checkedStatusReducer = createReducer(
  checkedStatus,
  on(checkboxStatus,(entries, isChecked) => {
    let checkedStatus: Boolean = entries
    checkedStatus = !isChecked
    return checkedStatus;
  })
)


export const metaReducerLocalStorage = (reducer: ActionReducer<any>): ActionReducer<any> => {
    return (state, action) => {
      if (action.type === INIT || action.type == UPDATE) {
        const storageValue = localStorage.getItem("state");
        console.log((storageValue? true: false), "triggered")
        if (storageValue) {
          try {
            return JSON.parse(storageValue);
          } catch {
            localStorage.removeItem("state");
          }
        }
      }
      const nextState = reducer(state, action);
      localStorage.setItem("state", JSON.stringify(nextState));
      return nextState;
    };
  };
