// @flow
import uuid from 'uuid/v1';

import {
  loadGuppyProjects,
  loadAllProjectDependencies,
  loadPackageJson,
} from '../services/read-from-disk.service';
import { getInternalProjectById } from '../reducers/projects.reducer';

import type { Project, Task, Dependency } from '../types';

const path = window.require('path');

// RAMPUMP ACTIONS
export const SHOW_RAMPUMP_PROJECT_PROMPT = 'SHOW_RAMPUMP_PROJECT_PROMPT';
export const IMPORT_RAMPUMP_PROJECT_START = 'IMPORT_RAMPUMP_PROJECT_START';
export const IMPORT_RAMPUMP_PROJECT_FINISH = 'IMPORT_RAMPUMP_PROJECT_FINISH';
export const SET_RAMPUMP_PACKAGE_JSON = 'SET_RAMPUMP_PACKAGE_JSON';

// RamPump Action Creators
export const showRamPumpProjectPrompt = history => ({
  type: SHOW_RAMPUMP_PROJECT_PROMPT,
  history,
});

export function importRampumpProjectStart(path: string) {
  return (dispatch, getState) => {
    dispatch({
      type: IMPORT_RAMPUMP_PROJECT_START,
      path,
    });

    loadPackageJson(path)
      .then(json => {
        dispatch(setRamPumpPackageJson(json));
      })
      .catch(err => {
        switch (err.message) {
          default: {
            console.error(err);
            break;
          }
        }

        // next(importExistingProjectError());
      });
  };
}

export const setRamPumpPackageJson = packageJson => ({
  type: SET_RAMPUMP_PACKAGE_JSON,
  packageJson,
});

export const importRamPumpProjectFinish = (path: string, project: Project) => ({
  type: IMPORT_RAMPUMP_PROJECT_FINISH,
  path,
  project,
});
