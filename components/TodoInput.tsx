
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';

type TodoInputProps = {
  onAdd: (text: string) => void;
};

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState('');

  const handleSave = () => {
    const trimmedText = text.trim();

    if (trimmedText.length === 0) {
      return;
    }

    onAdd(trimmedText);
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={text}
        onChangeText={setText}
      />

      <Pressable onPress={handleSave}>
        <Text style={styles.button}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  button: {
    color: '#4285c5',
    fontSize: 16,
    paddingHorizontal: 10,
  },
}); 
