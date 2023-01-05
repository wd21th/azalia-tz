import React from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, PanResponder, TouchableOpacity, Alert, Button, Pressable, Platform, GestureResponderEvent, PanResponderGestureState } from 'react-native';
import Mark from '../assets/images/Mark';

export default class ListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.gestureDelay = -35;
    this.scrollViewEnabled = true;

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: Platform.select({
        default: () => true,
        android: (e: GestureResponderEvent, state: PanResponderGestureState) =>
          Math.abs(state.dx) > 10 || Math.abs(state.dy) > 10
      }),
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 35) {
          this.setScrollViewEnabled(false);
          let newX = gestureState.dx + this.gestureDelay;
          position.setValue({ x: newX, y: 0 });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Уровень тяготения
        if (gestureState.dx < 100) {
          Animated.timing(this.state.position, {
            toValue: { x: 0, y: 0 },
            duration: 150,
          }).start(() => {
            this.setScrollViewEnabled(true);
          });
        } else {
          Animated.timing(this.state.position, {
            toValue: { x: width, y: 0 },
            duration: 300,
          }).start(() => {
            this.props.success(this.props.item.id);
            this.setScrollViewEnabled(true);
          });
        }
      },
    });
    this.panResponder = panResponder;
    this.state = { position, props };
  }

  setScrollViewEnabled(enabled: any) {
    if (this.scrollViewEnabled !== enabled) {
      this.scrollViewEnabled = enabled;
    }
  }

  render() {
    return (
      <View style={[styles.listItem, this.props.item.index === 0 ? { paddingTop: 5 } : {}]}>
        <Animated.View style={[this.state.position.getLayout(), {}]} {...this.panResponder.panHandlers}>
          <View style={styles.innerCell}>
            <Pressable
              onPress={() => {
                this.props.complete(this.props.item.id);
              }}
            >
              <View style={[styles.checkbox, this.props.item.done ? styles.checked : null]}>
                {
                  this.props.item.done ? <Mark /> : <></>
                }
              </View>
            </Pressable>
            <Text style={[this.props.item.done ? styles.marked : null]}>
              {this.props.item.description}
            </Text>
          </View>
        </Animated.View>
      </View>
    );
  }
}

let { width } = Dimensions.get('window');
width = width - 40;

const styles = StyleSheet.create({
  listItem: {
    marginLeft: -100,
    justifyContent: 'center',
    marginBottom: 16,
    overflow: 'visible',
    paddingLeft: 20,
    paddingRight: 20,
  },
  innerCell: {
    position: 'relative',
    zIndex: 1000,
    width: width,
    marginLeft: 100,
    backgroundColor: '#FAFAFE',
    borderRadius: 8,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 9,
    paddingRight: 9,
    elevation: 4,
    shadowColor: '#000000',
    display: 'flex',
    flexDirection: 'row',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#222F3E',
    borderStyle: 'solid',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  checked: {
    backgroundColor: '#222F3E',
  },
  marked: {
    textDecorationLine: 'line-through',
  }
});
