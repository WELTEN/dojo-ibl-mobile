import React from 'react';
import { View, Text } from 'react-native';
import glamorous from 'glamorous-native';
import PropTypes from 'prop-types';

const Item = glamorous.view({
  marginTop: 6,
  marginBottom: 6,
  marginLeft: 24,
  marginRight: 24
});

const TitleContainer = glamorous.view({
  flexDirection: 'row'
});

const Title = glamorous.text({
  fontSize: 18,
  color: '#616161',
  fontWeight: 'bold'
});

const GameTitle = glamorous.text({ color: '#BDBDBD' });

const Code = glamorous.text({
  paddingLeft: 8,
  color: '#9E9E9E',
  fontSize: 18,
  fontWeight: 'normal'
});

const OpenButton = glamorous.touchableOpacity({
  marginTop: 4
});

const ButtonText = glamorous.text({
  color: '#2196F3',
  fontSize: 14,
  fontWeight: 'bold'
});

const Run = ({ run, navigate }) => (
  <Item>
    <TitleContainer>
      <Title>
        <GameTitle>{run.game.title} / </GameTitle>
        {run.title}
      </Title>
      {run.code &&
        <Code>{run.code}</Code>
      }
    </TitleContainer>
    <OpenButton onPress={() => navigate('Run', { run })}>
      <ButtonText>Open</ButtonText>
    </OpenButton>
  </Item>
);

Run.propTypes = {
  run: PropTypes.shape({
    title: PropTypes.string.isRequired,
    code: PropTypes.string,
    game: PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  navigate: PropTypes.func.isRequired
};

export default Run;
