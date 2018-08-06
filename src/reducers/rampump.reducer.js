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

const BASE_URL = 'http://localhost:3031';
const PROJECT_ROOT = '/Users/myang/git/RamPump/src';
// const PROJECT_PATH = path.resolve(PROJECT_ROOT);

/**
 * Get list of all directories in a directory
 * @param {String} p Absolute path of directory
 */
function getDirectories(p) {
  return fs
    .readdirSync(p)
    .filter(f => fs.statSync(path.join(p, f)).isDirectory());
}

function mapDirs(dirs) {
  let excludes = ['node_modules', 'tests'];

  return dirs
    .filter(dir => excludes.indexOf(dir) === -1 && dir[0] !== '_')
    .map(dir => {
      return {
        name: dir,
        dirname: dir,
        path: `/rampump/src/${dir}`,
        thumbnail: '',
        port: 3031,
        url: `${BASE_URL}/${dir}`,
      };
    });
}

const initialState = {
  rootDir: '',
  rootSrcDir: '',
  dependencies: [],
  srcPackageJson: {},
  rootPackageJson: {},
  pages: mapDirs(getDirectories(PROJECT_ROOT)),
};

export default (state: State = initialState, action: Action) => {
  switch (action.type) {
    case IMPORT_RAMPUMP_PROJECT_START: {
      const { path: rampumpRootPath } = action;
      const vueSrcPath = path.resolve(rampumpRootPath, 'src');

      state.rootDir = rampumpRootPath;
      state.rootSrcDir = vueSrcPath;

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
