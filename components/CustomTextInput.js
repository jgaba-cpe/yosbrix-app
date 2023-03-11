import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { colors } from "../utilities/Colors";

const CustomTextInput = ({ placeholder, keyboardType, secureTextEntry, onUserInput }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');

  const handleTextInputChange = (text) => {
    setTextInputValue(text);
    console.log(`On CustomTextInput: ${text}`)
    onUserInput(text);    
  }

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <TextInput
      style={
        isFocused
          ? [styles.input, { borderColor: colors.secondary }]
          : styles.input
      }
      placeholder={placeholder}
      placeholderTextColor={colors.black50}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChangeText={(handleTextInputChange)}
    />
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    height: "7.143%",
    width: "80%",
    marginBottom: "4.29%",
    paddingLeft: "3.47%",
    borderRadius: 8,
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderWidth: 1,
    fontFamily: "LatoRegular",
    fontSize: 13,
  },
});
