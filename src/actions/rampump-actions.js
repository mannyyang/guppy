// @flow
import uuid from 'uuid/v1';

import {
  loadAllProjectDependencies,
  loadPackageJson,
} from '../services/read-from-disk.service';

import { importExistingProjectError } from './index';

import { getInternalProjectById } from '../reducers/projects.reducer';

import type { Project, Task, Dependency } from '../types';

const path = window.require('path');
const fs = window.require('fs');

const BASE_URL = 'http://localhost:3031';
const PROJECT_ROOT = '/Users/myang/git/RamPump/src';

/**
 * Get list of all directories in a directory
 * @param {String} p Absolute path of directory
 */
function getDirectories(p) {
  return fs
    .readdirSync(p)
    .filter(f => fs.statSync(path.join(p, f)).isDirectory());
}

function mapDirs(dirs, src) {
  let excludes = ['node_modules', 'tests'];

  return dirs
    .filter(dir => excludes.indexOf(dir) === -1 && dir[0] !== '_')
    .map(dir => {
      return {
        name: dir,
        dirname: dir,
        path: path.resolve(src, dir),
        thumbnail: '',
        port: 3031,
        url: `${BASE_URL}/${dir}`,
      };
    });
}

// RAMPUMP ACTIONS
export const IMPORT_RAMPUMP_PROJECT_START = 'IMPORT_RAMPUMP_PROJECT_START';
export const IMPORT_RAMPUMP_PROJECT_FINISH = 'IMPORT_RAMPUMP_PROJECT_FINISH';
export const SET_RAMPUMP_PACKAGE_JSON = 'SET_RAMPUMP_PACKAGE_JSON';
export const LAUNCH_RAMPUMP_DEV_SERVER = 'LAUNCH_RAMPUMP_DEV_SERVER';
export const SHOW_RAMPUMP_SIDEBAR = 'SHOW_RAMPUMP_SIDEBAR';
export const RUN_RAMPUMP_TASK = 'RUN_RAMPUMP_TASK';

// RamPump Action Creators
export function importRampumpProjectStart(
  rampumpRootPath: string,
  dialog: any,
  history: any
) {
  return (dispatch, getState) => {
    const srcPath = path.resolve(rampumpRootPath, 'src');

    Promise.all([loadPackageJson(rampumpRootPath), loadPackageJson(srcPath)])
      .then(values => {
        if (values[0].name !== 'RamPump') {
          throw new Error('invalid-project');
          return;
        }

        history.replace('/rampump');

        // Set root and srcRoot paths to state.
        dispatch({
          type: IMPORT_RAMPUMP_PROJECT_START,
          path: rampumpRootPath,
          pages: mapDirs(getDirectories(srcPath), srcPath),
        });

        // Set package json info for both rampump root and src root
        // (directory for all vue pages.)
        dispatch(setRamPumpPackageJson(values[0], values[1]));

        // return the package.json of the src folder so it can be used
        // to create the tasks lists.
        return values[1];
      })
      .then(srcPackageJson => {
        dispatch(importRamPumpProjectFinish(srcPackageJson));
      })
      .catch(err => {
        if (err.code === 'ENOENT') {
          dialog.showErrorBox(
            'Invalid Project',
            "Looks like the project you're trying to import isn't the RamPump application. Please try again."
          );
        }

        switch (err.message) {
          case 'invalid-project': {
            dialog.showErrorBox(
              'Invalid Project',
              "Looks like the project you're trying to import isn't the RamPump application. Please try again."
            );
            break;
          }

          default: {
            console.error(err);
            break;
          }
        }

        importExistingProjectError();
      });
  };
}

export const setRamPumpPackageJson = (rootPackageJson, srcPackageJson) => ({
  type: SET_RAMPUMP_PACKAGE_JSON,
  rootPackageJson,
  srcPackageJson,
});

export const importRamPumpProjectFinish = (project?: Project) => ({
  type: IMPORT_RAMPUMP_PROJECT_FINISH,
  project,
});

export const launchRamPumpDevServer = (task: Task, timestamp: Date) => ({
  type: LAUNCH_RAMPUMP_DEV_SERVER,
  task,
  timestamp,
});

export const showRamPumpSidebar = () => ({
  type: SHOW_RAMPUMP_SIDEBAR,
});

export const runRamPumpTask = (task: Task, timestamp: Date) => ({
  type: RUN_RAMPUMP_TASK,
  task,
  timestamp,
});
