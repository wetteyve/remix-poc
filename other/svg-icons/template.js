const template = (variables, { tpl, ...rest }) => {
  console.log(rest);
  return tpl`
import React, { SVGProps } from 'react';

const ${variables.componentName} = (${variables.props}) => ${variables.jsx};
export default ${variables.componentName};
`;
};

module.exports = template;
