import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import Home from './src/container/home/home';
import JsonPage from './src/container/jsonPage/jsonPage';
import { Router, Stack, Scene, Actions  } from 'react-native-router-flux';

const CustomNavBar = () =>{
  return(
    <SafeAreaView>
      <View style={styles.navBarView}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={()=> Actions.pop()}
          style={styles.backArrowView}
        >
          <Image
            source={require('./src/assets/images/backArrow1.png')}
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <Text style={styles.jsonText}>
          JSON
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default function App() {
  return (

      <Router>
        <Stack key="root">
          <Scene key="home" component={Home} hideNavBar/>
          <Scene key="JsonPage" component={JsonPage} navBar={CustomNavBar} back/>
        </Stack>
      </Router>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBarView:{
    height: 50,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingLeft: 10,
    shadowOffset:{  width: 3,  height: 3,  },
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 0,
    elevation: 2,
  },
  backArrowView:{
    height: 35,
    width: 35,
    alignSelf: 'center'
  },
  backArrow:{
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  jsonText:{
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 30,
    alignSelf: 'center'
  }
});
