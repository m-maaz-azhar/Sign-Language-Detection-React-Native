import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  aboutContainer: {
    flex: 1,
  },
  Title: {
    fontSize: 20,
    color: '#323232',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 30,
  },
  desc: {
    fontSize: 18,
    lineHeight: 25,
    color: '#323232',
    marginHorizontal: 20,
  },
  socialGridContainer: {
    position: 'absolute',
    bottom: 0,
  },
  socialGrid: {
    flexDirection: 'row',
  },
  fb: {
    backgroundColor: '#3b5998',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 120,
  },
  twitter: {
    backgroundColor: '#00acee',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 120,
  },
  youtube: {
    backgroundColor: '#c4302b',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 120,
  },
  insta: {
    backgroundColor: '#dd2a7b',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 120,
  },
});

export default styles;
