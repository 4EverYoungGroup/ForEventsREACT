import React from "react";
import { List, Datagrid, TextField, EditButton } from "react-admin";
import withStyles from "@material-ui/core/styles/withStyles";

const listStyles = { name: { padding: "0 2em 0 4em" } };

export const ResList = withStyles(listStyles)(({ classes, ...props }) => (
  <List {...props} sort={{ field: "name", order: "ASC" }} pagination={null}>
    <Datagrid>
      <TextField source="name" className={classes.name} />
      <EditButton />
    </Datagrid>
  </List>
));
