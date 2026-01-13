import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import colors from '../styles/colors';

//used chatgpt to create a reusable text field component
type TextFieldProps = {
  value: string;
  setValue: (text: string) => void;
  placeholder?: string;
  secure?: boolean;
};

export default function TextField({ value, setValue, placeholder, secure }: TextFieldProps) {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={colors.primary}
        value={value}
        onChangeText={setValue}
        secureTextEntry={secure}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    textInputContainer:{
    alignItems: 'center',
    justifyContent: 'center',
      marginTop: 10,
      backgroundColor : colors.beige,
      padding: 5
    },
    textInput:{
      borderWidth: 2,
      borderColor: colors.primary,
      backgroundColor: colors.primaryLight,
      color: colors.background,
      padding: 5,
      marginBottom: 5
    }
})