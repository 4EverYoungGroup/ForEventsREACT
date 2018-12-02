import React from "react";
import { Login } from "react-admin";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  main: {
    background: "url('../xxx.jpg')"
  }
};

export const AppLogin = withStyles(styles)(
  ({ classes, children, className, ...props }) => (
    <Login className={classNames(classes.main, className)} {...props} />
  )
);
