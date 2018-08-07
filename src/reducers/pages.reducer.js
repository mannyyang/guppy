// @flow
/**
 * By default, all Guppy projects are stored in ~/guppy-projects.
 * Users can import pre-existing projects from other paths, though.
 * This reducer holds a mapping of project names to their on-disk locations.
 *
 * It's kept separate from the `projects` reducer because that reducer maps
 * very closely to the project's package.json, and we don't want project path
 * to be tied to a specific project (the same project might exist at different
 * paths on different computers!).
 */
import { REFRESH_PAGES } from '../actions';

import type { Action } from 'redux';

const os = window.require('os');

type State = string[];

const initialState = [];

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case REFRESH_PAGES: {
      state = action.pages;
      return state;
    }

    default:
      return state;
  }
};
