import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
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
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '95%',
    minHeight: 100,
    marginVertical: 10,
    marginHorizontal: 10,

  },
  emptytext: {
    fontFamily: 'Roboto_100Thin',
    alignSelf: 'center',
  },
  datetext: {
    textAlign: 'center',
  },
  eventdate: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  eventdatetext: {
    fontFamily: 'Roboto_300Light',
    marginLeft: 30,
  },
  eventname: {
    marginLeft: 30,
    fontFamily: 'Roboto_300Light',
    fontSize: 25,
    color: '#4a4a4a',
  },
  icon: {
    width: 25,
    height: 25,
  },
  staticevent: {
    backgroundColor: '#70d3f4',
    width: 7,
  },
  dynamicevent: {
    backgroundColor: '#f49a70',
    width: 7,
  },
});

export default styles;