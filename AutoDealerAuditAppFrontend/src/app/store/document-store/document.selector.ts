import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import { state } from '@angular/animations';
import { Document } from 'src/app/model/document';

export interface DocumentGroup {
    document: Document;
    count: number;
  }



export const selectedDocIds = createSelector(
    createFeatureSelector('docIdEntries'),
    (state: Document[]) => {
        console.log(state)
        return state
      }
)

// export const multipleDocuments = createSelector(
//   createFeatureSelector('docIdEntries'),
//   (state: MultipleDocs[]) => {
    
//   }
// )



export const selectGroupedDocIdEntries = createSelector(
    createFeatureSelector('docIdEntries'),
    (state: Document[]) => {
      var map: Map<number, DocumentGroup> = new Map;
  
      state.forEach(d => {
        if (map.get(d.id)) {
          (map.get(d.id) as DocumentGroup).count++;
        } else {
          map.set(d.id, { document: d, count: 1 });
        }
      })
  
      const sortedMap = new Map([...map.entries()].sort());
      return Array.from(sortedMap.values());
    }
  )


