import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Pressable,
} from 'react-native';
import TaskItem from '../interfaces/TaskItem';
import { getLocalData, setLocalData } from '../utils';

const AddTask = ({ navigation }) => {
    const [text, onChangeText] = useState<string>('');
    const [data, setData] = useState<Array<TaskItem>>([]);
    const [autoIncrement, setAutoIncrement] = useState<number>(0);

    useEffect(() => {
        async function fetchData() {
            const data = await getLocalData('@todos');
            if (data) {
                setData(data);
            }
            const increment = await getLocalData('@autoIncrement');
            if (increment) {
                setAutoIncrement(increment);
            } else {
                setLocalData('@autoIncrement', 0);
            }
        }
        fetchData()
    });

    const onPress = () => {
        if (text.trim().length){
            let dataArr = JSON.parse(JSON.stringify(data));
            let order = +autoIncrement + 1;
            setAutoIncrement(order);
            setLocalData('@autoIncrement', order);
            dataArr.push({
                id: order,
                key: order,
                description: text,
                done: false,
            });
            setData(dataArr);
            setLocalData('@todos', dataArr);
            navigation.navigate('Home');
        }
    };

    return (
        <View style={styles.formWrapper}>
            <TextInput
                style={styles.textInput}
                onChangeText={onChangeText}
                value={text}
            />
            <Pressable
                style={[styles.button, text.trim().length ? styles.activeButton : {}]}
                onPress={onPress}>
                <Text style={styles.buttonText}>Добавить</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    formWrapper: {
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FAFAFE',
    },
    textInput: {
        backgroundColor: '#FAFAFE',
        borderRadius: 8,
        padding: 8,
        elevation: 4,
        marginBottom: 16,
    },
    button: {
        backgroundColor: 'rgba(34, 47, 62, 0.5);',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 8,
        paddingBottom: 8,
    },
    activeButton: {
        backgroundColor: '#222F3E',
        opacity: 1,
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
    },
});

export default AddTask;