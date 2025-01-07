import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import React from 'react'

const GlanceMain = () => {
  return (
    <View style={styles.container}>
        <TouchableOpacity >
        <Text>No record Found</Text>
        </TouchableOpacity>
     
    </View>
  )
}

export default GlanceMain

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})