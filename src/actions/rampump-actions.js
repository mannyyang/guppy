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

// RAMPUMP ACTIONS
export const IMPORT_RAMPUMP_PROJECT_START = 'IMPORT_RAMPUMP_PROJECT_START';
export const IMPORT_RAMPUMP_PROJECT_FINISH = 'IMPORT_RAMPUMP_PROJECT_FINISH';
export const SET_RAMPUMP_PACKAGE_JSON = 'SET_RAMPUMP_PACKAGE_JSON';
export const LAUNCH_RAMPUMP_DEV_SERVER = 'LAUNCH_RAMPUMP_DEV_SERVER';
export const SHOW_RAMPUMP_SIDEBAR = 'SHOW_RAMPUMP_SIDEBAR';

// RamPump Action Creators
export function importRampumpProjectStart(
  rampumpRootPath: string,
  dialog: any,
  history: any
) {
  return (dispatch, getState) => {
    Promise.all([
      loadPackageJson(rampumpRootPath),
      loadPackageJson(path.resolve(rampumpRootPath, 'src')),
    ])
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
        });

        // Set package json info for both rampump root and src root
        // (directory for all vue pages.)
        dispatch(setRamPumpPackageJson(values[0], values[1]));
      })
      .then(() => {
        dispatch(importRamPumpProjectFinish());
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

export const importRamPumpProjectFinish = (
  path?: string,
  project?: Project
) => ({
  type: IMPORT_RAMPUMP_PROJECT_FINISH,
  path,
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
