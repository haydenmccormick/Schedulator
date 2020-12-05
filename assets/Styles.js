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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  miniformwrapper: {
    backgroundColor: 'blue',
  },
  formcontainer: {
    width: '95%',
    alignSelf: 'center',
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
  eventlistcontainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    width: '95%',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  emptyeventlisttext: {
    fontFamily: 'Roboto_300Light',
    fontSize: 25,
    color: '#4a4a4a',
  },
  listheader: {
    width: '100%',
    height: '13%',
    backgroundColor: '#f49a70',
    justifyContent: 'center',
  },
  listheadertext: {
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'AbrilFatface_400Regular',
    fontSize: 45,
    color: '#f4f4f4',
  },
  eventlisttext: {
    fontFamily: 'Roboto_300Light',
    fontSize: 25,
    color: '#4a4a4a',
    marginBottom: 10,
  },
  eventlisttext2: {
    fontFamily: 'Roboto_300Light',
    fontSize: 15,
    color: '#4a4a4a',
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
  deletearea: {
    right: 10, top: 10,
    position: 'absolute',
  },
  delete: {
    color: '#f47970',
    fontFamily: 'Roboto_400Regular',
  },
});

export default styles;