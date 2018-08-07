// @flow
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { getSelectedProject } from '../../reducers/projects.reducer';
import { COLORS } from '../../constants';
import { loadDependencyInfoFromDisk } from '../../actions';
import { showRamPumpSidebar } from '../../actions/rampump-actions';

import MainContentWrapper from '../MainContentWrapper';
import Heading from '../Heading';
import PixelShifter from '../PixelShifter';
import Spacer from '../Spacer';
import RamPumpDevelopmentServerPane from '../RamPumpDevelopmentServerPane';
import TaskRunnerPane from '../RamPumpTaskRunnerPane';
import DependencyManagementPane from '../DependencyManagementPane';
import Pages from '../Pages';

import type { Project } from '../../types';

type Props = {
  project: Project,
  pages: [],
  showRamPumpSidebar: () => any,
  loadDependencyInfoFromDisk: (projectId: string, projectPath: string) => any,
  location: any, // provided by react-router
  match: any, // provided by react-router
  history: any, // provided by withRouter HOC
};

class RamPumpPage extends Component<Props> {
  componentDidMount() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    this.loadNewProjectOrBail(this.props.project);
  }

  // componentWillReceiveProps(nextProps: Props) {
  //   if (
  //     !this.props.project ||
  //     !nextProps.project ||
  //     this.props.project.id !== nextProps.project.id
  //   ) {
  //     this.loadNewProjectOrBail(nextProps.project);
  //   }
  // }

  loadNewProjectOrBail(project: Project) {
    const { history, showRamPumpSidebar } = this.props;

    if (project) {
      showRamPumpSidebar();
    } else {
      // If the selected project was not successfully resolved, that means
      // it must have been deleted. We should redirect the user to the main
      // screen.
      history.push('/');
    }
  }

  render() {
    const { project } = this.props;

    if (!project) {
      return null;
    }

    return (
      <FadeIn>
        <MainContentWrapper>
          {process.env.NODE_ENV === 'development' && (
            <Link to="/">
              <button>Back</button>
            </Link>
          )}
          <PixelShifter x={-2}>
            <Heading size="xlarge" style={{ color: COLORS.purple[500] }}>
              RamPump
            </Heading>
          </PixelShifter>

          <Pages />

          <Spacer size={30} />
          <RamPumpDevelopmentServerPane leftSideWidth={300} />

          <Spacer size={30} />
          <TaskRunnerPane leftSideWidth={200} />

          {/* {project.dependencies.length > 0 && (
            <Fragment>
              <Spacer size={30} />
              <DependencyManagementPane />
            </Fragment>
          )} */}

          <Spacer size={60} />
        </MainContentWrapper>
      </FadeIn>
    );
  }
}

const fadeIn = keyframes`
  from { opacity: 0.5 }
  to { opacity: 1 }
`;

const FadeIn = styled.div`
  animation: ${fadeIn} 400ms;
`;

const mapStateToProps = state => ({
  project: state.rampump,
});

export default withRouter(
  connect(
    mapStateToProps,
    { loadDependencyInfoFromDisk, showRamPumpSidebar }
  )(RamPumpPage)
);
