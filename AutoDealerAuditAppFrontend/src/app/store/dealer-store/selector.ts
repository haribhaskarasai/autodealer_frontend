import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PersistComponents } from "src/app/model/persist";
import { User } from "src/app/model/user";
import { Dealer } from "src/Objects";



export const selectDealer=createSelector(
    createFeatureSelector('dealerEntry'),
    (state:Dealer)=>{
      return state;
    }
  )

  export const persistCompsState=createSelector(
    createFeatureSelector('pesistSelector'),
    (state:PersistComponents)=>{
      return state;
    }
  )

  export const userState=createSelector(
    createFeatureSelector('userSelector'),
    (state:User)=>{
      return state;
    }
  )