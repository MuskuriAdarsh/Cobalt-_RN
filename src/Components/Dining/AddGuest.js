import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';

const AddGuest = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="First Name"
          placeholderTextColor="black"
          keyboardType="default"
          style={styles.guestInput}
        />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="black"
          keyboardType="default"
          style={styles.guestInput}
        />
      </View>
    </View>
  );
};

export default AddGuest;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'white'
    // justifyContent: 'center', 
  },
  inputContainer: {
    width: '100%',
    backgroundColor:'#f2f2f2',
    paddingVertical:20,
    // height:40,
    // flexDirection: 'row', 
    // justifyContent: 'space-between', 
},
  guestInput: {
    // flex: 1,
    borderWidth: 1,
    borderRadius:20,
    marginHorizontal: 5,
    padding: 10,
    marginBottom:10,
    width: '80%',
  },
});
