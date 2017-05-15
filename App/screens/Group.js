import React, { Component } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import PhaseList from '../components/PhaseList';
import Utils from '../lib/Utils';

export default class Group extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.group.title
  });

  group = this.props.navigation.state.params.group;
  tokens = this.props.navigation.state.params.tokens;
  groupTitle = Utils.removeHtmlTagsFromString(this.group.title);
  gameTitle = Utils.removeHtmlTagsFromString(this.group.game.title);
  groupDescription = Utils.removeHtmlTagsFromString(this.group.game.description || '');

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={globalStyles.containerScrollView}>
        <View style={styles.titleContainer}>
          <Text style={globalStyles.title}>
            {this.groupTitle}
          </Text>
          <Text style={styles.gameTitle}>
            {this.gameTitle}
          </Text>
        </View>

        {this.group.game.description &&
          <Text style={globalStyles.leftText}>
            {this.groupDescription}
          </Text>
        }
        <PhaseList
          phases={this.group.game.phases}
          gameId={this.group.game.gameId}
          runId={this.group.runId}
          tokens={this.tokens}
          navigate={navigate}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row'
  },
  gameTitle: {
    marginTop: sizes.offset,
    marginLeft: sizes.offset / 4,
    color: `rgba(${colors.textColorRgb}, .7)`,
    fontSize: 24,
    fontWeight: '300'
  }
});
