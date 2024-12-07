import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const WhiteCardBoad = () => {
  return (
    <View style={styles.container}>
      <Text>WhiteCardBoad</Text>
    </View>
  )
}

export default WhiteCardBoad

const styles = StyleSheet.create({
    container: {
        elevation: 3,
        borderRadius: 3
    }
})