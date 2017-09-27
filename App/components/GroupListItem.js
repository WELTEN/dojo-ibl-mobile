import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';
import Utils from '../lib/Utils';

export default class GroupListItem extends Component {
  groupTitle = Utils.removeHtmlTagsFromString(this.props.group.title);
  gameTitle = Utils.removeHtmlTagsFromString(this.props.group.game.title);
  groupDescription = Utils.removeHtmlTagsFromString(this.props.group.game.description || '');

  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={styles.group}>
          <View style={styles.titleContainer}>
            <Text style={styles.groupTitle}>
              {this.groupTitle}
            </Text>
            <Text style={styles.gameTitle}>
              {this.gameTitle}
            </Text>
          </View>
          {this.groupDescription.length != 0 &&
            <Text style={styles.groupDescription}>
              {this.groupDescription}
            </Text>
          }
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  group: {
    marginBottom: sizes.offset / 2,
    padding: sizes.offset / 2,
    backgroundColor: `rgba(${colors.textColorRgb}, .8)`,
    borderRadius: 2
  },
  titleContainer: {
    flexDirection: 'row'
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: '300'
  },
  gameTitle: {
    marginLeft: sizes.offset / 4,
    fontSize: 18,
    fontWeight: '300',
    color: `rgba(${colors.backgroundColorRgb}, .8)`
  },
  groupDescription: {
    marginTop: 2,
    color: colors.backgroundColor
  }
});
