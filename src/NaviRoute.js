import React from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import {
  Route,
  history,
  historyAddListen,
  historyRemoveListen
} from './routerHistory';

let NaviRoute = ({
  exact = true,
  path,
  component,
  render,
  children,
  backgroundColor,
  moveOutFix = 0.25
}) => <View />;
const iw = Dimensions.get('window').width;
const ssc = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
});

NaviRoute = class extends React.Component {
  static defaultProps = {
    moveOutFix: 0.25,
    backgroundColor: '#fff'
  };
  constructor(props) {
    super(props);
    this.state = {
      nowRoute: false,
      index: this.props.root ? 1 : 0,
      moveAnime: new Animated.Value(this.props.root ? 0 : iw)
    };
  }
  componentDidMount() {
    const path = this.props.path.replace('*', '');
    this.listen = historyAddListen(h => {
      let index = 0;
      console.log(':=;', h);
      for (let i = 0; i < h.entries.length; i++) {
        const r = h.entries[i];
        if (r.pathname === path) {
          index = i;
        }
      }
      if (index === h.index && !this.state.nowRoute) {
        this.setState(
          {
            nowRoute: true,
            index: 1,
          },
          () => {
            this.moveNowPage(0);
          }
        );
      } else if (index > h.index && this.state.nowRoute) {
        this.setState(
          { nowRoute: false, index: 0, moveAnime: new Animated.Value(0) },
          () => {
            this.moveNowPage(iw);
          }
        );
      } else if (index < h.index && this.state.nowRoute) {
        this.setState(
          { nowRoute: false, index: 0, moveAnime: new Animated.Value(0) },
          () => {
            this.moveNowPage(-iw * this.props.moveOutFix);
          }
        );
      }
    });
  }
  componentWillUnmount() {
    historyRemoveListen(this.listen);
  }
  moveNowPage = (x, o) => {
    console.log(',,', x);
    Animated.spring(this.state.moveAnime, {
      useNativeDriver: true,
      toValue: x,
      damping: 40,
      stiffness: 350
    }).start();
  };
  render() {
    return (
      <Animated.View
        style={[
          ssc.container,
          {
            backgroundColor: this.props.backgroundColor,
            zIndex: this.state.index,
            transform: [{ translateX: this.state.moveAnime }]
          }
        ]}
      >
        <Route {...this.props} />
      </Animated.View>
    );
  }
};

export default NaviRoute;
