// @flow
// import produce from 'immer';
import {
  IMPORT_RAMPUMP_PROJECT_START,
  SET_RAMPUMP_PACKAGE_JSON,
} from '../actions/rampump-actions';

import type { Action } from 'redux';

const path = window.require('path');
const fs = window.require('fs');

type State = Array<string>;

const initialState = {
  rootDir: '',
  rootSrcDir: '',
  dependencies: [],
  srcPackageJson: {},
  rootPackageJson: {},
  pages: [],
};

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case IMPORT_RAMPUMP_PROJECT_START: {
      const { path: rampumpRootPath, pages } = action;
      const vueSrcPath = path.resolve(rampumpRootPath, 'src');

      state.rootDir = rampumpRootPath;
      state.rootSrcDir = vueSrcPath;
      state.pages = pages;

      return state;
    }
    case SET_RAMPUMP_PACKAGE_JSON: {
      state.rootPackageJson = action.rootPackageJson;
      state.srcPackageJson = action.srcPackageJson;

      return state;
    }
    default:
      return state;
  }
};
