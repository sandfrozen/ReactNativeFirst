import React from 'react';
import {
  Image, Button, View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity,
  AsyncStorage, Picker, Item, Keyboard
} from 'react-native';
import { StackNavigator } from 'react-navigation'; // Version can be specified in package.json
import DatePicker from 'react-native-datepicker';
import CheckBox from 'react-native-checkbox';


class CreateShot1Screen extends React.Component {

  static navigationOptions = {
    title: 'CreateShot 1/4',
  };

  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.screenHeader}>Give it a name!</Text>
            <TextInput style={styles.textInput} placeholder='Name'
              onSubmitEditing={Keyboard.dismiss}
              returnKeyType='done'
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name} />
            <Image source={require('./logo.jpeg')} style={styles.logo} />
            <TouchableOpacity
              style={styles.buttonNext}
              onPress={() => {
                this.props.navigation.navigate('CreateShot2', {
                  name: this.state.name,
                });
              }}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

class CreateShot2Screen extends React.Component {

  static navigationOptions = {
    title: 'CreateShot 2/4',
  };

  constructor(props) {
    super(props);
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    this.state = {
      premiereDate: (year + '-' + month + '-' + date),
      withIce: true,
    };
  }

  render() {
    const { params } = this.props.navigation.state;
    const name = params ? params.name : null;
    return (
      <View style={styles.wrapper}>
        <ScrollView>
          <View style={styles.container}>
            <View style={{ alignItems: 'center', }}>
              <Text style={styles.screenHeader}>Amount of vodka [ml]:</Text>
              <TextInput
                style={styles.textInput}
                keyboardType='numeric'
                placeholder='25'
                onChangeText={(text) => this.setState({ amountOfVodka: text })}
                onSubmitEditing={Keyboard.dismiss}
                returnKeyType='done'
                value={this.state.amountOfVodka ? this.state.amountOfVodka : ''}
                maxLength={3}  //setting limit of input
              />

              <Text style={styles.screenHeader}>Amount of juice [ml]:</Text>
              <TextInput
                style={styles.textInput}
                keyboardType='numeric'
                placeholder='10'
                onChangeText={(text) => this.setState({ amountOfJuice: text })}
                //onSubmitEditing={Keyboard.dismiss}
                returnKeyType='done'
                value={this.state.amountOfJuice ? this.state.amountOfJuice : ''}
                maxLength={3}  //setting limit of input
              />

              <CheckBox
                style={{ alignItems: 'center', }}
                label='With ice'
                checked={this.state.withIce}
                onChange={(checked) => this.setState({ withIce: !checked })}
              />

              <Text style={styles.screenHeader}>Premiere Date:</Text>
              <DatePicker
                style={{ width: 280, marginBottom: 20, }}
                date={this.state.premiereDate}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2017-05-01"
                maxDate="2019-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(date) => { this.setState({ premiereDate: date }) }}
              />
              <View style={styles.navigationButtonsWrapper}>
                <TouchableOpacity
                  style={styles.buttonPrevious}
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}>
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonNext}
                  onPress={() => {
                    this.props.navigation.navigate('CreateShot3', {
                      name: name,
                      amountOfVodka: this.state.amountOfVodka,
                      amountOfJuice: this.state.amountOfJuice,
                      withIce: this.state.withIce + '',
                      premiereDate: this.state.premiereDate,
                    });
                  }}>
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View >
    );
  }
}

class CreateShot3Screen extends React.Component {

  static navigationOptions = {
    title: 'CreateShot 3/4',
  };

  constructor(props) {
    super(props);

    this.state = {
      vodka: 'żubrówka',
      juice: 'raspberry',
    };
  }

  render() {
    /* 2. Read the params from the navigation state */
    const { params } = this.props.navigation.state;
    const name = params ? params.name : null;
    const amountOfVodka = params ? params.amountOfVodka : null;
    const amountOfJuice = params ? params.amountOfJuice : null;
    const withIce = params ? params.withIce : null;
    const premiereDate = params ? params.premiereDate : null;

    return (
      <View style={styles.wrapper}>
        <ScrollView>
          <View style={styles.container}>

            <Text style={styles.screenHeader}>Kind of vodka:</Text>
            <Picker
              style={styles.picker}
              selectedValue={this.state.vodka}
              onValueChange={(itemValue) => this.setState({ vodka: itemValue })}>
              <Picker.Item label={"żubrówka"} value={"żubrówka"} />
              <Picker.Item label={'stock'} value={"stock"} />
              <Picker.Item label={'wyborowa'} value={"wyborowa"} />
              <Picker.Item label={'finlandia'} value={"finlandia"} />
              <Picker.Item label={'soplica'} value={"soplica"} />
            </Picker>

            <Text style={styles.screenHeader}>Kind of juice:</Text>
            <Picker
              style={styles.picker}
              selectedValue={this.state.juice}
              onValueChange={(itemValue) => this.setState({ juice: itemValue })}>
              <Picker.Item label={"raspberry"} value={"raspberry"} />
              <Picker.Item label={'banana'} value={"banana"} />
              <Picker.Item label={'orange'} value={"orange"} />
              <Picker.Item label={'strawberry'} value={"strawberry"} />
              <Picker.Item label={'pineapple'} value={"pineapple"} />
            </Picker>

            <View style={styles.navigationButtonsWrapper}>
              <TouchableOpacity
                style={styles.buttonPrevious}
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonNext}
                onPress={() => {
                  this.props.navigation.navigate('CreateShot4', {
                    name: name,
                    amountOfVodka: amountOfVodka,
                    amountOfJuice: amountOfJuice,
                    withIce: withIce,
                    premiereDate: premiereDate,
                    vodka: this.state.vodka,
                    juice: this.state.juice,
                  });
                }}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </View >
    );
  }
}

class CreateShot4Screen extends React.Component {

  static navigationOptions = {
    title: 'CreateShot 4/4',
  };

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    /* 2. Read the params from the navigation state */
    const { params } = this.props.navigation.state;
    const name = params ? params.name : null;
    const amountOfVodka = params ? params.amountOfVodka : null;
    const amountOfJuice = params ? params.amountOfJuice : null;
    const withIce = params ? params.withIce : null;
    const premiereDate = params ? params.premiereDate : null;
    const vodka = params ? params.vodka : null;
    const juice = params ? params.juice : null;

    return (
      <View style={styles.wrapper}>
        <ScrollView>
          <View style={styles.container}>

              <Text style={styles.header2}>Name: <Text style={styles.header3}>{name}</Text></Text>
              <Text style={styles.header2}>AmountOfVodka: <Text style={styles.header3} ml>{amountOfVodka}</Text></Text>
              <Text style={styles.header2}>AmountOfJuice: <Text style={styles.header3} ml>{amountOfJuice}</Text></Text>
              <Text style={styles.header2}>WithIce: <Text style={styles.header3}>{withIce}</Text></Text>
              <Text style={styles.header2}>PremiereDate: <Text style={styles.header3}>{premiereDate}</Text></Text>
              <Text style={styles.header2}>Vodka: <Text style={styles.header3}>{vodka}</Text></Text>
              <Text style={styles.header2}>Juice: <Text style={styles.header3}>{juice}</Text></Text>
              <View style={styles.navigationButtonsWrapper}>
              </View>
              <TouchableOpacity
                style={styles.buttonPrevious}
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>

          </View>
        </ScrollView>
      </View >
    );
  }
}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'lightblue',
  },
  navigationButtonsWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginBottom: 20,
    marginTop: 40,
  },
  container: {
    alignContent: 'center',
    // alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40,

  },
  screenHeader: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  screenHeader: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  header2: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
  },
  header3: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: 'red'
  },
  logo: {
    height: 280,
    width: '100%',
    marginBottom: 40,
  },
  textInput: {
    fontSize: 20,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 20,
    textAlign: 'center',
    // borderWidth: 1,
  },
  buttonPrevious: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#FF3333',
    alignItems: 'center',
    padding: 10,
    marginRight: 5,
  },
  buttonNext: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#33CC00',
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    fontSize: 20,
  },
  picker: {
    backgroundColor: 'white',
    marginBottom: 20,
  }
});

const RootStack = StackNavigator(
  {
    CreateShot1: {
      screen: CreateShot1Screen,
    },
    CreateShot2: {
      screen: CreateShot2Screen,
    },
    CreateShot3: {
      screen: CreateShot3Screen,
    },
    CreateShot4: {
      screen: CreateShot4Screen,
    },
  },
  {
    initialRouteName: 'CreateShot1',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  }
);

export default class App extends React.Component {

  render() {
    return <RootStack />;
  }
}
