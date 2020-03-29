import React, { useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import IEmoji from '../../../interfaces/IEmoji';
import { mainBrandColor } from '../../../shared/styles/mainStyle';

const styles = StyleSheet.create({
  emoji: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    paddingTop: 5,
    paddingBottom: 5,
    marginLeft: 10,
    marginBottom: 10,
    borderWidth: 4,
    borderColor: 'transparent',
  },
  emojiActive: {
    borderWidth: 4,
    borderColor: mainBrandColor,
  },
  emojiText: {
    fontSize: 30,
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    width: Dimensions.get('window').width * 0.7,
    marginTop: 10,
    height: '50%',
  }
})

const EmojiList = ({
  emoji,
  setActiveEmoji,
}: {
  emoji: IEmoji[];
  setActiveEmoji(emoji: string): void}) => {
  const [activeId, setActiveId] = useState<string>('');
  const computeStyle = (id: string) => {
    if (activeId === id) {
      return StyleSheet.flatten([styles.emoji, styles.emojiActive]);
    } else {
      return styles.emoji;
    }
  };

  return (
    <FlatList
      data={emoji}
      horizontal={false}
      numColumns={4}
      style={styles.list}
      renderItem={({item}) => (
        <TouchableOpacity
          style={computeStyle(item._id)}
          activeOpacity={1}
          onPress={() => {
            setActiveId(item._id);
            setActiveEmoji(item.emoji);
          }}>
          <Text style={styles.emojiText}> {item.emoji} </Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item._id}
    />
  );
};

export default EmojiList;
