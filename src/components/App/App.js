// @flow
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { refreshProjects, selectProject } from '../../actions';
import { COLORS } from '../../constants';
import {
  extractProjectIdFromUrl,
  buildUrlForProjectId,
} from '../../services/location.service';
import {
  getProjectsArray,
  getSelectedProject,
} from '../../reducers/projects.reducer';
import { getOnboardingStatus } from '../../reducers/onboarding-status.reducer';

import IntroScreen from '../IntroScreen';
import Sidebar from '../Sidebar';
import Titlebar from '../Titlebar';
import ApplicationMenu from '../ApplicationMenu';
import ProjectPage from '../ProjectPage';
import CreateNewProjectWizard from '../CreateNewProjectWizard';
import RamPumpPage from '../RamPumpPage';

import type { Action } from 'redux';
import type { Project } from '../../types';
import type { State as OnboardingStatus } from '../../reducers/onboarding-status.reducer';

type Props = {
  onboardingStatus: OnboardingStatus,
  selectedProject: ?Project,
  projects: Array<Project>,
  refreshProjects: Action,
  selectProject: Action,
  history: any, // Provided by `withRouter`
};

class App extends Component<Props> {
  componentDidMount() {
    const {
      history,
      selectedProject,
      selectProject,
      refreshProjects,
    } = this.props;

    // refreshProjects();

    // if (selectedProject) {
    //   history.replace(buildUrlForProjectId(selectedProject.id));
    // }

    // history.listen(location => {
    //   const projectId = extractProjectIdFromUrl(location);

    //   if (projectId) {
    //     selectProject(projectId);
    //   }
    // });

    history.listen(location => {});
  }

  render() {
    return (
      <Fragment>
        <Titlebar />
        <ApplicationMenu />

        <Wrapper>
          <Sidebar />

          <MainContent>
            <Switch>
              <Route
                exact
                path="/"
                render={routerProps => (
                  <IntroScreen history={this.props.history} {...routerProps} />
                )}
              />
              <Route
                exact
                path="/rampump"
                render={routerProps => <RamPumpPage {...routerProps} />}
              />
              {/* <Route
                path="/project/:projectId"
                render={routerProps => (
                  <ProjectPage
                    key={routerProps.match.params.projectId}
                    {...routerProps}
                  />
                )}
              /> */}
            </Switch>
          </MainContent>
        </Wrapper>

        <CreateNewProjectWizard />
      </Fragment>
    );
  }
}

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  background: ${COLORS.gray[50]};

  animation: ${fadeIn} 500ms ease-in;
`;

const MainContent = styled.div`
  position: relative;
  min-height: 100vh;
  flex: 1;
`;

const mapStateToProps = state => {
  return {
    onboardingStatus: getOnboardingStatus(state),
    projects: getProjectsArray(state),
    selectedProject: getSelectedProject(state),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { refreshProjects, selectProject }
  )(App)
);
