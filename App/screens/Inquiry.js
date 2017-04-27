import React, { Component } from 'react';
import {
  ListView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import Phase from '../components/Phase';

export default class Inquiry extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.inquiry.title
  });

  constructor(props) {
    super(props);

    this.inquiry = this.props.navigation.state.params.inquiry;
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.phases = this.ds.cloneWithRows(this.inquiry.phases);
  }

  removeHtmlTagsFromString(string) {
    return string.replace(/<(?:.|\n)*?>/gm, '');
  }

  render() {
    return (
      <ScrollView style={globalStyles.containerScrollView}>
        <Text style={globalStyles.whiteTitle}>{this.inquiry.title}</Text>
        <Text style={globalStyles.leftText}>
          {this.removeHtmlTagsFromString(this.inquiry.description)}
        </Text>
        <ListView
          style={styles.phaseList}
          dataSource={this.phases}
          renderRow={(phase) =>
            <Phase phase={phase} />
          }
          enableEmptySections={true}
          />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  phaseList: {
    marginLeft: sizes.offset,
    marginRight: sizes.offset
  }
});
