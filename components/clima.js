import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
const Clima = ({resultado: {name, main}}) => {
  if (!name) return null;
  const kelvin = 273.15;
  return (
    <>
      <View style={styles.clima}>
        <Text>{parseInt(main.temp - kelvin)}
        <Text>
          &#x2103;
        </Text>
        </Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  clima: {},
});

export default Clima;
