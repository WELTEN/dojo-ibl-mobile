import React, { Component } from 'react';
import { Text, StatusBar, View } from 'react-native';
import glamorous from 'glamorous-native';
import Container from './Container';
import Phases from './Run/Phases';
import PropTypes from 'prop-types';
import { removeHtmlTags } from '../lib/Text';

const Title = glamorous.text({
  paddingTop: 24,
  paddingBottom: 24,
  paddingLeft: 24,
  paddingRight: 24,
  color: '#616161',
  fontSize: 28,
  fontWeight: 'bold'
});

const GameTitle = glamorous.text({ color: '#BDBDBD' });

const Description = glamorous.text({
  paddingTop: -12,
  paddingBottom: 24,
  paddingLeft: 24,
  paddingRight: 24,
  fontSize: 16
});

export default class Run extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.run.title
  });

  render() {
    const run = this.props.navigation.state.params.run;
    return (
      <Container>
        <StatusBar barStyle="dark-content" />
        <Title>
          <GameTitle>{run.game.title} / </GameTitle>
          {run.title}
        </Title>
        {run.game.description &&
          <Description>{removeHtmlTags(run.game.description)}</Description>
        }
        <Phases
          phases={run.game.phases}
          runId={run.runId}
          gameId={run.game.gameId}
          navigate={this.props.navigation.navigate}
        />
      </Container>
    );
  }
}

Run.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        run: PropTypes.shape({
          runId: PropTypes.number.isRequired,
          title: PropTypes.string.isRequired,
          code: PropTypes.string,
          game: PropTypes.shape({
            gameId: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string,
            phases: PropTypes.arrayOf(PropTypes.shape({
              title: PropTypes.string.isRequired
            })).isRequired
          }).isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  })
};
