import React, { useCallback, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Title from '../components/Title';
import ListItem from '../components/ListItem';
import AddIcon from '../assets/images/AddIcon';
import { getLocalData, setLocalData } from '../utils';
import TaskItem from '../interfaces/TaskItem';

const Main = ({ navigation }) => {
  const [data, setData] = useState<Array<TaskItem>>([]);
  const complete = (id) => {
    const dataArr = JSON.parse(JSON.stringify(data)).map((item: any) => {
      if (item.id === id) {
        item.done = !item.done;
      }
      return item;
    });
    setLocalData('@todos', dataArr);
    setData(dataArr);
  };

  const swipeRight = (key) => {
    const dataArr = data.filter(item => item.key !== key);
    setLocalData('@todos', dataArr);
    setData(dataArr);
  };

  const renderItem = (item, index) => {
    return (
      <ListItem
        item={item}
        success={swipeRight}
        complete={complete}
      />
    );
  };


  useFocusEffect(
    useCallback(() => {
      // FOCUS
      async function fetchData() {
        const data = await getLocalData('@todos');
        
        if (data) {
          setData(data);
        }
      }
      fetchData();
      // UNFOCUS
      return () => { };
    }, []),
  );

  return (
    <View style={styles.mainScreen}>
      <View style={styles.wrapper}>
        <Title />
      </View>
      <FlatList
        data={data}
        renderItem={({ item, index }) => renderItem(item, index)}
      />
      <TouchableOpacity
        style={styles.addIcon}
        onPress={() => navigation.navigate('New Task', { name: 'Вернуться назад' })}
      >
        <AddIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 90,
  },
  wrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 19,
  },
  addIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default Main;
