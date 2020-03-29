import React, { useState, useEffect } from 'react'
import { View, Modal, Text, Button } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import {CreateCategoryStyles as styles} from './styles/CreateCategory';
import ICreateCategory from './interfaces/ICreateCategory';
import ModalButtons from '../../../shared/components/ModalButtons';
import IEmoji from 'interfaces/IEmoji';
import AsyncStorage from '@react-native-community/async-storage';
import EmojiList from './EmojiList';
import { useDispatch } from 'react-redux';
import ICategory from 'interfaces/ICategory';
import { CreateCategoryAction } from '../../../store/Categories/actions/createCategoryAction';

const CreateCategory = ({isVisible, setVisible}: ICreateCategory) => {
  const [name, setName] = useState<string>('');
  const [emoji, setEmoji] = useState<IEmoji[]>([]);
  const [activeEmoji, setActiveEmoji] = useState<string>('💎');
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getEmojis = async () => {
      AsyncStorage.getItem('@emoji').then(storeEmoji =>
        JSON.parse(`${storeEmoji}`),
      )
      .then((storeEmoji: IEmoji[]) => {
        setEmoji(storeEmoji);
        return storeEmoji;
      })
      .then((storeEmoji) => {
        setActiveEmoji(storeEmoji[0].emoji);
      })
    }
    getEmojis();
  }, []);

  const createCategory = () => {
    const catName = name.trim() || 'Untitled';
    const category: ICategory = {
      name: catName,
      emoji: activeEmoji,
      isExpense: false,
    };
    dispatch(CreateCategoryAction(category)); 
    setVisible(false);
    setName('');
  }
  
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {}}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <View style={styles.buttons}>
              <Button
                onPress={() => setVisible(false)}
                title="Cancel"
              />
              <Text style={styles.buttonsText}>
                Category
              </Text>
              <Button 
                onPress={() => createCategory()}
                title={'OK'}
              />
            </View>
            <View style={styles.emoji}>
              <Text style={styles.emojiText}>{activeEmoji}</Text>
            </View>

            <TextInput
              value={name}
              placeholder={'Untitled'}
              onChangeText={text => setName(text)}
              style={styles.categoryInput}
            />
            <EmojiList emoji={emoji} setActiveEmoji={setActiveEmoji} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CreateCategory;
