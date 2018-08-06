// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { importRampumpProjectStart } from '../../actions/rampump-actions';

import TextButton from '../TextButton';

const { dialog } = window.require('electron').remote;

type Props = {
  history: any, // from react-router passed down
  color: string,
  children: React$Node,
  importRampumpProjectStart: () => any,
};

class IntroSetupButton extends Component<Props> {
  onClick = () => {
    dialog.showOpenDialog(
      {
        message:
          'Select the root directory of the RamPump application (ex. c:/git/RamPump)',
        properties: ['openDirectory'],
      },
      paths => {
        // The user might cancel out without selecting a directory.
        // In that case, do nothing.
        if (!paths) {
          return;
        }

        // Only a single path should be selected
        const [path] = paths;

        this.props.importRampumpProjectStart(path, dialog, this.props.history);
      }
    );
  };

  render() {
    const { color, children } = this.props;

    return (
      <TextButton style={{ color }} onClick={this.onClick}>
        {children}
      </TextButton>
    );
  }
}

export default connect(
  null,
  { importRampumpProjectStart }
)(IntroSetupButton);
