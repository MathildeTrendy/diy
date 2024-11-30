import { StyleSheet, View } from 'react-native';

import { StyledText } from '../components';

export default function App() {
  return (
    <View style={styles.container}>
      <StyledText big>WINE APP</StyledText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
