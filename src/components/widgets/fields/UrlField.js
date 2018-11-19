import React from "react";
import { withStyles } from "@material-ui/core/styles";
import LaunchIcon from "@material-ui/icons/Launch";

import { default as styles } from "./Styles.js";

const UrlField = ({ record = {}, source, classes }) => (
  <a
    href={"http://" + record[source]}
    target="_new"
    className={classes.urlLink}
  >
    {record[source]}
    <LaunchIcon className={classes.urlLinkIcon} />
  </a>
);

export default withStyles(styles)(UrlField);
