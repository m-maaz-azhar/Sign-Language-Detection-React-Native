import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  TextToVoiceContainer: {
    flex: 1,
    backgroundColor: '#1dd1a1',
  },
  ScrollContainer: {
    backgroundColor: '#F1F5FF',
    height: '100%',
    borderTopStartRadius: 40,
    paddingTop: 20,
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
  submitBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 120,
    position: 'relative',
    backgroundColor: '#1dd1a1',
    height: 40,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  TextInput: {
    fontSize: 20,
    color: '#323232',
  },
  ResultContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ResultTitle: {
    backgroundColor: '#1dd1a1',
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
    padding: 12,
  },
});

export default styles;
