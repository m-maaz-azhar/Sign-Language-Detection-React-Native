import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
  },
  topHeader: {
    backgroundColor: '#1dd1a1',
    paddingTop: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    height: Dimensions.get('window').height * 0.15,
    width: Dimensions.get('window').width,
    backgroundColor: '#1dd1a1',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});

export default styles;
