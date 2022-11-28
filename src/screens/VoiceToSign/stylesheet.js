import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  VoiceToSignContainer: {
    flex: 1,
    backgroundColor: '#1dd1a1',
  },
  ScrollContainer: {
    backgroundColor: '#F1F5FF',
    height: '100%',
    borderTopStartRadius: 40,
  },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#D3D3D3',
  },
  selectorTitle: {
    fontSize: 20,
    color: '#323232',
  },
  selectorBtns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 120,
  },
  ImageView: {
    marginHorizontal: 25,
    marginTop: 30,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 5,
  },
  ImageStyle: {
    width: '100%',
    height: 300,
  },
  resultText: {
    color: '#323232',
    textAlign: 'center',
    fontSize: 24,
    paddingVertical: 10,
  },
});

export default styles;
