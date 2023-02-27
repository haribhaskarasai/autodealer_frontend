import { createAction, props } from "@ngrx/store";
import { PersistComponents } from "src/app/model/persist";
import { UserDetails } from "src/app/model/userDetails";
import { Dealer } from "src/Objects";


export const addDealer=createAction('Add Dealer',props<Dealer>());

export const persistComps=createAction('Persist Comps',props<PersistComponents>())

export const user=createAction('User',props<UserDetails>());