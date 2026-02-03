import React from "react";
import { Text, TouchableHighlight } from "react-native";
import colors from "../styles/colors";
import defaultStyles from "../styles/defaultStyles";
type propsType = {
  title: string;
  color?: string;
  textColor?: string;
  onPress:()=>void;
};
const Button: React.FC<propsType> = ({ title, color = colors.primary, textColor = colors.primaryDark, onPress }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[defaultStyles.button, { backgroundColor: color }]}
    >
      <Text style={[defaultStyles.button, { color: textColor }]}>{title}</Text>
    </TouchableHighlight>
  );
};

export default Button;