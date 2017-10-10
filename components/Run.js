import React, { Component } from 'react';
import { StatusBar, Image } from 'react-native';
import glamorous from 'glamorous-native';
import Container from './Container';
import Phases from './Run/Phases';
import PropTypes from 'prop-types';
import { removeHtmlTags } from '../lib/Text';
import Title from './Title';
import Description from './Description';

const GameTitle = glamorous.text({ color: '#BDBDBD' });

const ChatButton = glamorous.touchableOpacity({
  marginTop: -72,
  marginBottom: 24,
  marginRight: 24,
  padding: 12,
  alignSelf: 'flex-end',
  width: 48,
  height: 48,
  backgroundColor: '#1AB394',
  borderRadius: 24
});

const ChatIcon = glamorous.image({
  width: 24,
  height: 24
});

export default class Run extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.run.title
  });

  render() {
    const { user, run } = this.props.navigation.state.params;
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
          user={user}
          phases={run.game.phases}
          runId={run.runId}
          gameId={run.game.gameId}
          navigate={this.props.navigation.navigate}
        />
        <ChatButton>
          <ChatIcon source={require('../images/chat.png')} />
        </ChatButton>
      </Container>
    );
  }
}

Run.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        user: PropTypes.object.isRequired,
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
