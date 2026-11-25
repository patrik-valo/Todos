
import React, { useEffect, useState } from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const savedTodos = await AsyncStorage.getItem('todos');

        if (savedTodos !== null) {
          setTodos(JSON.parse(savedTodos));
        }
      } catch (error) {
        console.log('Error loading todos:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem('todos', JSON.stringify(todos));
      } catch (error) {
        console.log('Error saving todos:', error);
      }
    };

    if (isLoaded) {
      saveTodos();
    }
  }, [todos, isLoaded]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text,
      completed: false,
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos((currentTodos) => {
      const updatedTodos = currentTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      });

      console.log('Updated todos:', updatedTodos);

      return updatedTodos;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo list</Text>

      <TodoInput onAdd={addTodo} />

      <FlatList
        data={todos}
        extraData={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            text={item.text}
            completed={item.completed}
            onToggle={() => toggleTodo(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 25,
    color: '#000',
  },
}); 
