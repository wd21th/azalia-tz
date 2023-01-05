
import React, { useEffect, useState } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import Title from '../components/Title';


export default function App({
    color = 'red',
}: Props): JSX.Element {
    const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));
    const spin = spinAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    useEffect(() => {
        Animated.loop(
            Animated.timing(spinAnim, {
                toValue: 1,
                duration: 500,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ).start();
    });

    return (
        <View style={styles.screen}>
            <Title />
            <View style={styles.container} accessibilityRole="progressbar">
                <View style={[styles.background, { borderColor: color }]} />
                <View style={[styles.progress2, { transform: [{ rotate: '-45deg' }] }]}>
                    <Animated.View
                        style={[
                            styles.progress,
                            { borderTopColor: color },
                            {
                                transform: [
                                    {
                                        rotate: spin,
                                    },
                                ],
                            },
                        ]}
                    />
                </View>
            </View>
        </View>
    );
}


const height = 70;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    container: {
        width: height,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    background: {
        width: '100%',
        height: '100%',
        borderRadius: height / 2,
        borderWidth: 4,
        opacity: 0, // 0.25
    },
    progress: {
        width: '100%',
        height: '100%',
        borderRadius: height / 2,
        borderLeftColor: '#ffffff',
        borderRightColor: '#ffffff',
        borderBottomColor: '#ffffff',
        borderWidth: 4,
        position: 'absolute',
    },
    progress2: {
        width: '100%',
        height: '100%',
        borderRadius: height / 2,
        borderWidth: 0,
        position: 'absolute',
    },
    title: {
        color: '#FF003C',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontSize: 36,
        lineHeight: 42,
        marginLeft: 18,
    },
});
