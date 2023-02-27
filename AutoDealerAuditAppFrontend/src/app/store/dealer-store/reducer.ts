import { ActionReducer, createReducer, INIT, on, UPDATE } from "@ngrx/store";
import { PersistComponents } from "src/app/model/persist";
import { UserDetails } from "src/app/model/userDetails";
import { Dealer } from "src/Objects";
import { addDealer, persistComps, user } from "./action";


export const initialDealer:Dealer=new Dealer();

export const intialPersistComps=new PersistComponents();

export const initialUser=new UserDetails();


export const dealerReducer=createReducer(
    initialDealer,
    on(addDealer,(entries,dealer)=>{
        entries=dealer
        return entries;
    })
)

export const persistReducer=createReducer(
  intialPersistComps,
  on(persistComps,(entry,persistComp)=>{
    entry=persistComp
    return entry;
  })
)

export const userReducer=createReducer(
  initialUser,
  on(user,(entry,userInfo)=>{
    entry=userInfo
    return entry;
  })
)

export const metaReducerLocalStorage = (reducer: ActionReducer<any>): ActionReducer<any> => {
    return (state, action) => {
      if (action.type === INIT || action.type == UPDATE) {
        const storageValue = localStorage.getItem("state");
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