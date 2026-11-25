
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

type TodoItemProps = {
  text: string;
  completed: boolean;
  onToggle: () => void;
};

export default function TodoItem({
  text,
  completed,
  onToggle,
}: TodoItemProps) {
  return (
    <Pressable
      onPress={onToggle}
      style={styles.container}
      android_ripple={{ color: '#ddd' }}
    >
      <Text
        style={[
          styles.text,
          completed && styles.completed,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});  
