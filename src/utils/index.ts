import AsyncStorage from "@react-native-async-storage/async-storage";

export const getLocalData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value) {
            if (value[0] === '[' || value[0] === '{') {
                return JSON.parse(value);
            }
            return value;
        } else return null;
    } catch (e) {
        console.log(e);
    }
};


export const setLocalData = async (key: string, value: any) => {
    try {
        if (typeof value === 'object') {
            await AsyncStorage.setItem(key, JSON.stringify(value));
        } else {
            if (typeof value === 'number') {
                await AsyncStorage.setItem(key, value.toString());
            } else {
                await AsyncStorage.setItem(key, value);
            }
        }
    } catch (e) {
        console.log(e);
    }
};