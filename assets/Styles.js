import { StyleSheet } from "react-native"

export default StyleSheet.create({
  container: {
    position: "absolute",
    top: 0, bottom: 0, left: 0, right: 0,
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
    position: 'absolute',
    bottom: '5%',
    right: '8%',
  },
  button: {
    width: 85,
    height: 85,
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
  eventcontainer: {
    backgroundColor: 'white',
    alignSelf: "center",
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 40,
    paddingHorizontal: 15,
  },
  eventtext: {
    fontFamily: 'Roboto_100Thin',
  },
});