// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { showImportExistingProjectPrompt } from '../../actions';

import BigClickableButton from '../BigClickableButton';

type Props = {
  color: string,
  children: React$Node,
  showImportExistingProjectPrompt: () => any,
};

class ImportProjectButton extends Component<Props> {
  render() {
    const { color, children, showImportExistingProjectPrompt } = this.props;

    return (
      <BigClickableButton
        width={350}
        style={{ color }}
        onClick={showImportExistingProjectPrompt}
      >
        {children}
      </BigClickableButton>
    );
  }
}

export default connect(
  null,
  { showImportExistingProjectPrompt }
)(ImportProjectButton);
