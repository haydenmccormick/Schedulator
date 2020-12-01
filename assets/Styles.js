import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      backgroundColor: 'white',
    },
    calendararea: {
      flex: 1.5,
      justifyContent: 'flex-end',
      width: "85%",
    },
    going: {
      alignItems: 'center',
      marginVertical: 15,
    },
    input: {
      textAlign: 'center',
      padding: 5,
      paddingHorizontal: 10,
      marginVertical: 10,
      borderColor: 'skyblue',
      borderWidth: 2,
    },
    title: {
      alignSelf: 'center',
      fontSize: 25,
      paddingBottom: 15,
    },
    subtitle: {
      alignSelf: 'center',
      fontSize: 20,
      marginBottom: 15,
      borderBottomWidth: 1.5,
    },
    buttonwrapper: {
        top: '8%',
        flex: 1,
        alignContent: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    button: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    formwrapper: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'black',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    formcontainer: {
        width: '75%',
        height: '90%',
        bottom: '-5%',
        alignSelf: 'center',
    },
    formshell: {
    },
    form: {
        borderRadius: 30,
        paddingHorizontal: 40,
        paddingTop: 10,
        backgroundColor: 'white',
    },
  });