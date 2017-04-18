import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Linking
} from 'react-native';

// var shittyQs = require('shitty-qs')

export default class DojoIblMobile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: 'nope'
    };
  }

  componentDidMount() {
    Linking.addEventListener('url', urlHandler);

    const self = this;
    function urlHandler(event) {

      console.log(event.url);

      var requestToken = (event.url).split("code=")[1];
      console.log(requestToken);

      fetch('https://wespot-arlearn.appspot.com/oauth/token?client_id=wespotClientId&redirect_uri=http://localhost/callback&client_secret=wespotClientSecret&code=' + requestToken, {
          method: 'post',
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          }
        })
        .then(function (data) {
            console.log('Request succeeded with JSON response', data);
        })
        .catch(function (error) {
          console.log('Request failed', error);
        });

      // fetch('https://wespot-arlearn.appspot.com/oauth/token', {
      //   method: 'POST',
      //   data:{
      //     client_id: 'wespotClientId',
      //     redirect_uri: 'https://localhost/callback',
      //     client_secret: 'wespotClientSecret',
      //     grant_type: 'authorization_code',
      //     code: 'requestToken',
      //   }
      // }).then((data) => {
      //   console.log(data);
      //   self.state.url = "JOLA"
      // })
      // .catch((error) => {
      //   console.error(error);
      // });

      //
      // $http({method: "post", url: "http://wespot-arlearn.appspot.com/oauth/token", data: "client_id=wespotClientId&redirect_uri=http://localhost/callback&client_secret=wespotClientSecret&grant_type=authorization_code&code=" + requestToken })
      //  .success(function(data) {
      //    alert(data.access_token)
      //    accessToken = data.access_token;
      //    $location.path("/app/inquiries");
      //  })
      //  .error(function(data, status) {
      //    alert(data)
      //
      //    console.log("ERROR: " + data);
      //  });

      // var [, query_string] = event.url.match(/[^&?]*?=[^&?]*/)
      // var query = shittyQs(query_string)
      // console.log(query);
      // console.log(query_string);
      //
      // if (state === query.state) {
      //   callback(null, query.access_token, query.uid)
      // } else {
      //   callback(new Error('Oauth2 security error'))
      // }

      Linking.removeEventListener('url', urlHandler);
    }
    Linking.openURL('https://wespot-arlearn.appspot.com/Login.html?client_id=dojo-ibl&redirect_uri=dojoiblmobile://dojo-ibl.appspot.com/oauth/wespot&response_type=code&scope=profile+email');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          URL: {this.state.url}
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3F51B5',
  },
  welcome: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, .7)',
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, .7)',
    marginBottom: 5,
  },
});
