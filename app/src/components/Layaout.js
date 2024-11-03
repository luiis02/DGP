import { View, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const Layaout = ({children}) => {
  return (
    <SafeAreaView>
        <View style={styles.container}>
            {children}
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F8F8',
    },
});
export default Layaout