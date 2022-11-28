import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  ImageToSignContainer: {
    flex: 1,
    backgroundColor: '#1dd1a1',
  },
  ScrollContainer: {
    backgroundColor: '#F1F5FF',
    height: '100%',
    borderTopStartRadius: 40,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 10,
    width: 200,
  },
  snapWrapper: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    position: 'absolute',
    bottom: 200,
    left: 0,
    right: 0,
  },
  snapText: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
  },
});

export default styles;
