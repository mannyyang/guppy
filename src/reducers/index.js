import { combineReducers } from 'redux';

import projects from './projects.reducer';
import pages from './pages.reducer';
import tasks from './tasks.reducer';
import dependencies from './dependencies.reducer';
import modal from './modal.reducer';
import onboardingStatus from './onboarding-status.reducer';
import packageJsonLocked from './package-json-locked.reducer';
import paths from './paths.reducer';

export default combineReducers({
  projects,
  pages,
  tasks,
  dependencies,
  modal,
  onboardingStatus,
  packageJsonLocked,
  paths,
});
