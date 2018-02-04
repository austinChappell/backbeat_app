import { StyleSheet } from 'react-native';

const colors = {
  primary: '#7b1fa2',
  primaryDark: '#4a0072',
  primaryLight: '#ae52d4',
  primaryDisabled: '#e1bee7',
  secondary: '#3949ab',
  secondaryDark: '#00227b',
  secondaryLight: '#6f74dd',
  white: '#ffffff',
  black: '#111111',
  bgLight: '#eee',
  bgDark: '#555555'
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 20,
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
  containerDark: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    padding: 20,
  },
  containerTop: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  containerLoggedOut: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    color: colors.primary,
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center'
  },
  headerLight: {
    color: colors.white,
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center'
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
  line: {
    borderBottomColor: colors.secondaryDark,
    borderBottomWidth: 1,
    flexGrow: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  message: {

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
  subHeaderLight: {
    color: colors.white,
    fontSize: 26,
    marginBottom: 20,
    textAlign: 'center'
  },
  tabBar: {
    backgroundColor: colors.bgLight,
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

export { colors, styles };
