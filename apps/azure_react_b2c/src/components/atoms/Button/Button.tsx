/**
 *
 * Button
 *
 */
// @flow

// Node_Module Imports
import React from "react";

// Relative imports
import { ButtonProps } from "./types";

const Button: React.FunctionComponent<ButtonProps> = ({
  className,
  children,
  ...otherProps
}) => (
  <button className={className} data-testid="CompRoot" {...otherProps}>
    {children}
  </button>
);

Button.defaultProps = {};
export default Button;
export { Button };
