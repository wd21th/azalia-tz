import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Logo from './../assets/images/Logo';
const Title = () => {
  return (
    <View style={styles.wrapper}>
      <Logo />
      <Text style={styles.title}>AzaliaNow</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#FF003C',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 36,
    lineHeight: 42,
    marginLeft: 18,
  },
});

export default Title;
