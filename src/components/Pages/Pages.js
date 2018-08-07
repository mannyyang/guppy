// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import IconBase from 'react-icons-kit';
import { plus } from 'react-icons-kit/feather/plus';

import { runTask, abortTask } from '../../actions';
import { getSelectedProject } from '../../reducers/projects.reducer';
import { COLORS } from '../../constants';

import Module from '../Module';
import AddDependencyModal from '../AddDependencyModal';
import AddDependencySearchProvider from '../AddDependencySearchProvider';
import DependencyDetails from '../DependencyDetails';
import DependencyInstalling from '../DependencyInstalling/DependencyInstalling';
import Card from '../Card';
import Spacer from '../Spacer';
import Spinner from '../Spinner';
import OnlyOn from '../OnlyOn';
import Button from '../Button';

import type { Project } from '../../types';

type Props = {
  project: Project,
  pages: any[],
};

type State = {
  selectedDependencyIndex: number,
  addingNewDependency: boolean,
};

const electron = window.require('electron');
const ENVS = ['local', 'dev', 'qa', 'stage', 'prod'];

class Pages extends PureComponent<Props, State> {
  render() {
    const pages = this.props.pages;

    return (
      <Module title="Admin Pages">
        <Wrapper>
          <DependencyList>
            <Dependencies>
              {pages.map((page, index) => (
                <DependencyButton key={page.name}>
                  <DependencyName>{page.name}</DependencyName>
                  <div>
                    {ENVS.map(env => {
                      return (
                        <Button
                          {...mapEnvToButtonProps(env)}
                          key={env}
                          onClick={() => {
                            electron.shell.openExternal(
                              `${mapEnvToUrl(env)}/${page.name}`
                            );
                          }}
                        >
                          {env}
                        </Button>
                      );
                    })}
                  </div>
                </DependencyButton>
              ))}
            </Dependencies>
          </DependencyList>
        </Wrapper>
      </Module>
    );
  }
}

function mapEnvToUrl(env) {
  switch (env) {
    case 'local':
      return 'http://localhost:3031';
    case 'dev':
      return 'http://dev-admin.nativo.com';
    case 'qa':
      return 'http://qa-admin.nativo.com';
    case 'stage':
      return 'http://stg-admin.nativo.com';
    case 'prod':
      return 'http://admin.nativo.com';
    default:
      return '';
  }
}

function mapEnvToButtonProps(env) {
  switch (env) {
    case 'local':
      return {
        color1: COLORS.green[500],
        color2: COLORS.green[700],
        style: { margin: '10px' },
        size: 'small',
        type: 'fill',
      };
    case 'dev':
      return {
        color1: COLORS.teal[500],
        color2: COLORS.teal[700],
        style: { marginRight: '10px' },
        size: 'small',
        type: 'fill',
      };
    case 'qa':
      return {
        color1: COLORS.blue[500],
        color2: COLORS.blue[700],
        style: { marginRight: '10px' },
        size: 'small',
        type: 'fill',
      };
    case 'stage':
      return {
        color1: COLORS.violet[500],
        color2: COLORS.violet[700],
        style: { marginRight: '10px' },
        size: 'small',
        type: 'fill',
      };
    case 'prod':
      return {
        color1: COLORS.purple[500],
        color2: COLORS.purple[700],
        style: { marginRight: '10px' },
        size: 'small',
        type: 'fill',
      };
  }
}

const Wrapper = styled.div`
  display: flex;
  max-height: 475px;
`;

const DependencyList = Card.extend`
  flex: 12;
  display: flex;
  flex-direction: column;
`;

const Dependencies = styled.div`
  overflow: auto;
  /*
    flex-shrink is needed to ensure that the list doesn't clobber the
    "Add New Dependency" button below.
  */
  flex-shrink: 8;
`;

const DependencyButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 10px;
  margin: 8px 0px;
  border: none;
  background: ${props =>
    props.isSelected
      ? `linear-gradient(10deg, ${COLORS.blue[700]}, ${COLORS.blue[500]})`
      : COLORS.gray[100]};
  color: ${props => (props.isSelected ? COLORS.white : COLORS.gray[900])};
  border-radius: 4px;
  border-bottom: ${props =>
    props.isSelected
      ? '2px solid rgba(0, 0, 0, 0.5)'
      : '2px solid rgba(0, 0, 0, 0.1)'};
  cursor: pointer;

  &:hover {
    outline: none;
    background: ${props =>
      props.isSelected
        ? `linear-gradient(10deg, ${COLORS.blue[700]}, ${COLORS.blue[500]})`
        : COLORS.gray[200]};
  }

  &:active,
  &:focus {
    outline: none;
    background: ${props =>
      props.isSelected
        ? `linear-gradient(10deg, ${COLORS.blue[700]}, ${COLORS.blue[500]})`
        : COLORS.gray[300]};
  }

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const AddDependencyButton = styled.button`
  width: 100%;
  height: 42px;
  padding: 8px 10px;
  margin-top: 10px;
  border: 2px dashed ${COLORS.gray[300]};
  border-radius: 6px;
  color: ${COLORS.gray[500]};
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  cursor: pointer;

  &:hover {
    border: 2px dashed ${COLORS.gray[400]};
    color: ${COLORS.gray[600]};
  }
`;

const DependencyName = styled.span`
  font-size: 18px;
  font-weight: 500;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DependencyVersion = styled.span`
  padding-left: 10px;
  font-size: 16px;
  color: ${props =>
    props.isSelected
      ? COLORS.transparentWhite[400]
      : COLORS.transparentBlack[400]}};
`;

const MainContent = Card.extend`
  flex: 12;
  margin-left: 15px;
  padding: 0;
  overflow: auto;
`;

const mapStateToProps = state => {
  return {
    project: getSelectedProject(state),
    pages: state.pages || [],
  };
};

const mapDispatchToProps = { runTask, abortTask };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pages);
