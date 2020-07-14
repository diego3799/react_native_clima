import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import Formulario from './components/formulario';
import Clima from './components/clima';

const App = () => {
  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: '',
  });
  const [constultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const ocultarTeclado = () => {
    Keyboard.dismiss();
  };
  useEffect(() => {
    if (!constultar) return;
    const apiKey = '1233024c3039acb6aad1f9c7cc2eb6af';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${busqueda.ciudad},${busqueda.pais}&appid=${apiKey}`;
    const consultarApi = async () => {
      try {
        const respuesta = await fetch(url);
        const res = await respuesta.json();
        setResultado(res);
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Hubo un error en la consulta', [
          {text: 'Entendido'},
        ]);
      }
    };
    consultarApi();
    setConsultar(false);
  }, [constultar]);
  return (
    <>
      <TouchableWithoutFeedback onPress={ocultarTeclado}>
        <View style={styles.app}>
          <View style={styles.contenido}>
            <Clima resultado={resultado} />
            <Formulario
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              setConsultar={setConsultar}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: 'rgb(71,149,212)',
    justifyContent: 'center',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
