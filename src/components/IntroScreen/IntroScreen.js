import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  createNewProjectStart,
  importExistingProjectStart,
} from '../../actions';
import { COLORS } from '../../constants';
import { getOnboardingStatus } from '../../reducers/onboarding-status.reducer';

import Button from '../Button';
import IntroSetupButton from '../IntroSetupButton';
import Spacer from '../Spacer';
import Logo from '../Logo';
import Swimming from '../Swimming';
import Label from '../Label';

type Props = {
  history: any, // from react-router
  shouldHideContent: boolean,
  createNewProjectStart: () => any,
};

class IntroScreen extends Component<Props> {
  render() {
    const { shouldHideContent, createNewProjectStart, history } = this.props;

    return (
      <Fragment>
        <Wrapper isVisible={!shouldHideContent}>
          <Header>
            <Logo size="large" />
            <AppName>T.R.A.M.</AppName>
            <Label>RamPump's Task Runner and App Manager</Label>
          </Header>

          <Actions>
            <Spacer size={40} />
            <div>
              <IntroSetupButton history={history} color={COLORS.blue[700]}>
                To get started, find RamPump's root directory.
              </IntroSetupButton>
            </div>
          </Actions>
        </Wrapper>
      </Fragment>
    );
  }
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  pointer-events: ${props => (props.isVisible ? 'auto' : 'none')};
  transition: opacity 500ms;
`;

const Header = styled.div`
  text-align: center;
`;

const AppName = styled.div`
  font-size: 42px;
  transform: translateY(-10px);
`;

const Actions = styled.div`
  text-align: center;
  font-size: 20px;
`;

const mapStateToProps = state => ({
  shouldHideContent: getOnboardingStatus(state) !== 'brand-new',
});

export default connect(
  mapStateToProps,
  { createNewProjectStart, importExistingProjectStart }
)(IntroScreen);
