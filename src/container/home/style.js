import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20
    },
    title:{
        fontSize: 20,
        fontWeight: '600'
    },
    searchView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 5,
        marginTop: 20
    },
    searchButton:{
        backgroundColor: '#00278a',
        width: '23%',
        justifyContent: 'center',
        borderRadius: 5,
        height: 45,
    },
    textInput:{
        width: '75%',
        borderRadius: 10,
        borderWidth: 1,
        height: 45,
        justifyContent: 'center',
        padding: 10
    },  
    searchText:{
        color: '#fff',
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    refreshView:{
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 10
    },
    refreshButton:{
        height: 35,
        width: 120,
        backgroundColor: '#00278a',
        justifyContent: 'center',
        borderRadius: 5
    },
    refreshText:{
        color: '#fff',
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    card:{
        // height: 200,
        width: '96%',
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 10,
        padding: 20,
        shadowOffset:{  width: 0,  height: 0,  },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
    },
    singleRow:{
        flexDirection: 'row',
        width: '92%'
    },
    cardTitles:{
        fontSize: 16
    },
    cardValues:{
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5
    },
    filterView:{
        position: 'absolute',
        right: 20,
        bottom: 20
    },
    filterButton:{
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        backgroundColor: '#00278a',
        shadowOffset:{  width: 0,  height: 0,  },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 1,
    },
    filterImg:{
        resizeMode: 'contain',
        height: '40%',
        width: '40%',
        alignSelf: 'center',
        backgroundColor: 'transparent'
    },
    modalView:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 210,
        width: '120%',
        backgroundColor: '#fff',
        marginLeft: -20,
        marginBottom: -20
    },
    commonTouch:{
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 40
    },
    filterTitleView:{
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 40
    },
    textStyle:{
        fontSize: 16
    },
    modalText:{
        fontSize: 16,
        color: '#8c8c8c'
    }
})