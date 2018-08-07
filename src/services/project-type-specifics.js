// @flow
/**
 * Guppy currently supports two project types:
 *  - create-react-app
 *  - Gatsby
 *
 * While things are mostly the same for these project types, they do vary in
 * a handful of ways. This file should collect the bits that vary across
 * project types.
 */
import type { ProjectType } from '../types';

export const getDocumentationLink = (projectType: ProjectType) => {
  switch (projectType) {
    case 'create-react-app':
      return 'https://github.com/facebook/create-react-app#user-guide';
    case 'gatsby':
      return 'https://www.gatsbyjs.org/docs/';
    case 'rampump':
      return 'https://nativo.atlassian.net/wiki/spaces/ENG/pages/591167507/Vue.js+Development+-+RamPump';
    default:
      throw new Error('Unrecognized project type: ' + projectType);
  }
};
