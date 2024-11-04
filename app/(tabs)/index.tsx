import customButton from '@/components/customButton';
import { Image, StyleSheet, Platform ,View,Text, TextInput} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Login() {
  return (
<View>
  <SafeAreaView>
    <Text>Username:</Text>
  <TextInput
  placeholder='Enter Username'
  style= {styles.container}
  />
  </SafeAreaView>
 
</View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
});
