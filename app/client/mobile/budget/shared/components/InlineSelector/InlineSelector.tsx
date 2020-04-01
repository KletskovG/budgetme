import React, { useState } from 'react'
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import { mainBrandColor } from '../../styles/mainStyle';


const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#000',
  },
  elementsContainer: {
    flexDirection: 'row',
  },
  element: {
    borderWidth: 1,
    borderColor: mainBrandColor,
    padding: 5,
  },
  firstElement: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderRightWidth: 0,
    paddingLeft: 10,
  },
  lastElement: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderLeftWidth: 0,
    paddingRight: 10,
  },
  elementText: {
    color: '#000',
  },
  text: {
    fontSize: 20,
  },
});

interface InlineSelectorProps {
  title: string;
  elements: string[];
  change(index: number): void
}

const InlineSelector: React.FC<InlineSelectorProps> = ({title, elements, change}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  
  const computeElementStyle = (index: number) => {
    const style = {
      backgroundColor: index === activeIndex ? mainBrandColor : 'white',
    };
    const returnStyles: any= [styles.element];

    if (index === 0) {
      returnStyles.push(styles.firstElement);
    } else if (index === elements.length - 1) {
      returnStyles.push(styles.lastElement);
    }
    returnStyles.push(style);
    return StyleSheet.flatten(returnStyles);
  }
 
  const computeTextStyle = (index: number) => {
    const style = {
      color: index === activeIndex ? 'white' : '#000',
    };
    return StyleSheet.flatten([styles.elementText, style]);
  }

  const selectItem = (index: number) => {
    setActiveIndex(index);
    change(index);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.elementsContainer}>
        <TouchableOpacity
          style={computeElementStyle(0)}
          activeOpacity={0.8}
          onPress={() => {
            selectItem(0);
          }}>
          <Text style={computeTextStyle(0)}>{elements[0]}</Text>
        </TouchableOpacity>
        {elements.slice(1, elements.length - 1).map((item, index) => {
          if (index !== elements.length - 2) {
            index++;
          }
          return (
            <TouchableOpacity
              key={index}
              style={computeElementStyle(index)}
              activeOpacity={0.8}
              onPress={() => {
                selectItem(index);
              }}>
              <Text style={computeTextStyle(index)}>{item}</Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={computeElementStyle(elements.length - 1)}
          activeOpacity={0.8}
          onPress={() => {
            selectItem(elements.length - 1);
          }}>
          <Text style={computeTextStyle(elements.length - 1)}>
            {elements[elements.length - 1]}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default InlineSelector;
