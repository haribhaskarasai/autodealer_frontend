import { createAction, props } from '@ngrx/store';
import { Document } from 'src/app/model/document';
import { MultipleDocs } from './document.reducer';

export const addMultipleDocIds = createAction("Add Id", props<Document>());
export const removeMultipleDocIds = createAction("Remove Id", props<Document>());
export const checkboxStatus = createAction("Toggle Checkbox", props<Boolean>());