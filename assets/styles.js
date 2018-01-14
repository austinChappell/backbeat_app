import { StyleSheet } from 'react-native';

const color = {
  primary: '#1a237e',
  primaryDark: '#000051',
  primaryLight: '#534bae',
  secondary: '#e040fb',
  secondaryDark: '#aa00c7',
  secondaryLight: '#ff79ff',
  white: '#ffffff',
  black: '#111111',
  bgLight: '#eee',
  bgDark: '#555555'
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    width: '100%',
    borderRadius: 4,
    padding: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    padding: 20,
  },
  containerLoggedOut: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    color: '#0d47a1',
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 20
  },
  hide: {
    display: 'none'
  },
  input: {
    borderColor: '#000000',
    borderWidth: 2,
    height: 40,
    marginBottom: 10,
    padding: 5,
    width: 250,
  },
  spinnerContainer: {
    flex: 1,
    paddingTop: '40%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)'
  },
  subHeader: {
    color: '#0d47a1',
    fontSize: 26,
    marginBottom: 20,
    textAlign: 'center'
  },
  tabBar: {
    backgroundColor: color.bgLight,
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 10,
    paddingBottom: 10
  }
})

export { color, styles };
