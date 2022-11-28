import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
    backgroundColor: '#1dd1a1',
  },
  CardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingTop: 15,
    width: Dimensions.get('window').width,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    backgroundColor: '#F1F5FF',
    height: '100%',
  },
});

export default styles;
