import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  VoiceToTextContainer: {
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 120,
  },
  InputTitle: {
    fontSize: 20,
    color: '#323232',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 30,
  },
  OutputText: {
    fontSize: 18,
    color: '#323232',
    marginHorizontal: 20,
  },
});

export default styles;
