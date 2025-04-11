import { createFeature, createReducer, on } from "@ngrx/store";
import * as sidebarActions from "./sidebar.actions";

export interface State {
  isOpen: boolean;
}

const initialState: State = {
  isOpen: false,
};

export const sidebarReducer = createFeature({
  name: "sidebar",
  reducer: createReducer(
    initialState,
    on(sidebarActions.toggleSideBar, (state) => ({
      ...state,
      isOpen: !state.isOpen,
    }))
  ),
});

export const {
  name,
  selectIsOpen
} = sidebarReducer;
