import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
const {Item} = Picker;
const Formulario = ({busqueda, setBusqueda, setConsultar}) => {
  const {ciudad, pais} = busqueda;
  const [animacionboton] = useState(new Animated.Value(1));
  const consultarClima = () => {
    /** It's empty*/
    if (pais.trim() === '' || ciudad.trim() === '') {
      return Alert.alert('Error', 'Agrega una ciudad y país de la busqueda', [
        {text: 'Entendido'},
      ]);
    }
    setConsultar(true)
  };
  const animacionEntrada = () => {
    //Spring is when it shrinks
    Animated.spring(animacionboton, {
      // to which porcentage will it shrink
      toValue: 0.75,
      // useNativeDriver is a must when doing animations
      useNativeDriver: true,
    }).start();
  };
  const animacionSalida = () => {
    Animated.spring(animacionboton, {
      toValue: 1,
      /**Friction is the bounciness of the animation */
      friction: 40,
      /** how smooth is the transition */
      tension: 30,
      useNativeDriver: true,
    }).start();
  };
  const estiloAnimacion = {
    transform: [{scale: animacionboton}],
  };
  return (
    <>
      <View>
        <View style={styles.formulario}>
          <TextInput
            style={styles.input}
            placeholderTextColor="#666"
            placeholder="Ciudad"
            value={ciudad}
            onChangeText={(ciudad) => setBusqueda({...busqueda, ciudad})}
          />
        </View>
        <View>
          <Picker
            onValueChange={(pais) => setBusqueda({...busqueda, pais})}
            selectedValue={pais}
            itemStyle={{height: 120, backgroundColor: '#fff'}}>
            <Item label="--Seleccione un pais--" value="" />
            <Item label="Estados Unidos" value="US" />
            <Item label="México" value="MX" />
            <Item label="Argentina" value="AR" />
            <Item label="Colombia" value="CO" />
            <Item label="Costarica" value="CR" />
            <Item label="España" value="ES" />
            <Item label="Perú" value="PE" />
          </Picker>
        </View>
        {/* FIXME: OnPressIn  does not work until you press out
            to fix this issue you need to add delayPressIn={0}
        */}
        <TouchableWithoutFeedback
          delayPressIn={0}
          onPressIn={animacionEntrada}
          onPressOut={animacionSalida}
          onPress={consultarClima}>
          <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
            <Text style={styles.textoBuscar}>Buscar Clima </Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#fff',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  btnBuscar: {
    marginTop: 50,
    backgroundColor: '#333',
    padding: 10,
    justifyContent: 'center',
  },
  textoBuscar: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
  },
});
export default Formulario;
