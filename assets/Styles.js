import { StyleSheet } from "react-native"

const styles = StyleSheet.create({

  /*********** LOGIN **********/

  loginheader: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 50,
  },
  logintext: {
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'AbrilFatface_400Regular',
    fontSize: 45,
    color: 'black',
  },
  logintext2: {
    fontFamily: 'Roboto_300Light',
    fontSize: 15,
  },
  logintextinput: {
    fontFamily: 'Roboto_300Light',
    marginVertical: 10,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderColor: 'lightgray',
    fontSize: 19,
  },
  loginarea: {
    width: '85%',
    alignSelf: 'center',
  },
  loginsubmit: {
    backgroundColor: '#6fdbae',
    height: 50,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 15,
    shadowOpacity: .1,
    shadowOffset: { height: 0 },
  },
  loginsubmittext: {
    fontFamily: 'Roboto_900Black',
    fontSize: 23,
    color: '#3e785e',
  },
  signuptext: {
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'AbrilFatface_400Regular',
    fontSize: 40,
    color: 'black',
  },

  /*********** DAY VIEW **********/

  container: {
    position: "absolute",
    top: 0, bottom: 0, left: 0, right: 0,
  },
  agendacontainer: {
    position: "absolute",
    top: 0, bottom: 0, left: 0, right: 0,
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
    fontSize: 20,
    marginVertical: 20,
    flexWrap: 'wrap',
    color: '#4a4a4a',
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
    flexDirection: 'row',
  },
  button: {
    width: 85,
    height: 85,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  miniformwrapper: {
    backgroundColor: 'blue',
  },
  form: {
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  formtop: {
    width: '95%',
    height: 25,
    resizeMode: 'stretch',
    alignSelf: 'center',
    marginBottom: -.5
  },
  form2: {
    borderRadius: 30,
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: 'white',
    height: 200,
    justifyContent: 'center',
    marginTop: 0,
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
  scheduledeventcontainer: {
    backgroundColor: 'white',
    alignSelf: "center",
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '85%',
    minHeight: 100,
    marginVertical: 10,
    marginHorizontal: 10,
    alignSelf: 'flex-end',
  },
  emptycontainer: {
    backgroundColor: 'white',
    alignSelf: "center",
    justifyContent: 'center',
    flexDirection: 'row',
    width: '95%',
    height: 100,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  emptytext: {
    fontFamily: 'Roboto_100Thin',
    alignSelf: 'center',
    textAlign: 'center',
  },
  datetext: {
    textAlign: 'center',
  },
  eventdate: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 10,
    marginRight: 35,
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
    marginBottom: 10,
  },
  scheduledeventname: {
    marginLeft: 30,
    fontFamily: 'Roboto_300Light',
    fontSize: 23,
    color: '#4a4a4a',
    marginBottom: 10,
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
  scheduledevent: {
    backgroundColor: '#ff9585',
    width: 7
  },
  taskname: {
    marginTop: 10,
  },
  enterdate: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  datepicker: {
    width: '95%',
    alignSelf: 'center',
  },
  formtext: {
    fontFamily: 'Roboto_300Light',
    fontSize: 18,
    marginTop: 25,
  },
  staticdelete: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#2e94ac',
    fontFamily: 'Roboto_400Regular',
    fontSize: 15,
  },
  period: {
    alignItems: 'center',
  },
  forminput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input2: {
    borderColor: '#70d3f4',
    borderWidth: 1,
    fontSize: 20,
    marginVertical: 20,
    flexWrap: 'wrap',
    color: '#4a4a4a',
    padding: 5,
    marginRight: 10,
  },

  /********** DYNAMIC **********/

  formwrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  formcontainer: {
    width: '95%',
    alignSelf: 'center',
  },
  eventlistcontainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 100,
    width: '95%',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  finishedcontainer: {
    flex: 1,
    backgroundColor: '#c9c9c9',
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 100,
    width: '95%',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  checkarea: {
    alignSelf: 'flex-start',
    backgroundColor: '#ff9585',
    width: 50,
    height: '100%',
    justifyContent: 'center',
  },
  check: {
    textAlign: 'center',
    fontSize: 50,
    color: '#ffd5ce',
  },
  deletearea: {
    right: 10, top: 10,
    backgroundColor: '#e7e8e9',
    width: 18,
    height: 18,
    borderRadius: 10,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  delete: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#ec7d6d',
    fontFamily: 'Roboto_400Regular',
    fontSize: 15,
  },
  eventlistelement: {
    marginRight: 80,
  },
  eventlisttext: {
    fontFamily: 'Roboto_300Light',
    fontSize: 25,
    color: '#4a4a4a',
    margin: 15,
  },
  eventlisttext2: {
    fontFamily: 'Roboto_300Light',
    fontSize: 15,
    color: '#4a4a4a',
    marginLeft: 15,
    marginBottom: 15,
  },
  emptyeventlistcontainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: 350,
    width: 350,
    borderRadius: 175,
    padding: 50,
    bottom: '-10%',
    alignSelf: 'center',
  },
  emptyeventlisttext: {
    fontFamily: 'Roboto_300Light',
    fontSize: 25,
    color: '#4a4a4a',
  },
  listheader: {
    width: '100%',
    height: '13%',
    backgroundColor: '#f58f73',
    justifyContent: 'center',
  },
  listheadertext: {
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'AbrilFatface_400Regular',
    fontSize: 45,
    color: '#f4f4f4',
  },
});

export default styles;