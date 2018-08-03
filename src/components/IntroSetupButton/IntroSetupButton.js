// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showRamPumpProjectPrompt } from '../../actions';

import TextButton from '../TextButton';

type Props = {
  color: string,
  children: React$Node,
  showRamPumpProjectPrompt: () => any,
};

class IntroSetupButton extends Component<Props> {
  render() {
    const { color, children, showRamPumpProjectPrompt } = this.props;

    return (
      <TextButton style={{ color }} onClick={showRamPumpProjectPrompt}>
        {children}
      </TextButton>
    );
  }
}

export default connect(
  null,
  { showRamPumpProjectPrompt }
)(IntroSetupButton);
