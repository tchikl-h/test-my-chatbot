import React, { PropTypes } from "react";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import globalStyles from "../styles";

const PageBase = props => {
  const { title, navigation, height, width } = props;

  return (
    <div>
      <span style={globalStyles.navigation}>{navigation}</span>

      <Paper style={height !== "" && width !== "" ? {padding: 30, width: width, height: height} : globalStyles.paper}>
        <h3 style={globalStyles.title}>{title}</h3>

        <Divider />
        {props.children}

        <div style={globalStyles.clear} />
      </Paper>
    </div>
  );
};

PageBase.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  children: PropTypes.element
};

export default PageBase;
