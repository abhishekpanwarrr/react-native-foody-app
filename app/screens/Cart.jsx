import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../constants/theme'


const Cart = () => {

  return (
    <SafeAreaView>
      <View style={{
        flex: 1,
        padding: 20
      }}>
        <View style={{
          marginTop: 100
        }}>
          <TouchableOpacity style={{ backgroundColor: COLORS.red, height: 60, alignItems: 'center' }} >
            <Text style={{ paddingHorizontal: 20, paddingVertical: 20, color: COLORS.lightWhite, fontSize: 18 }}>Buy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Cart

const styles = StyleSheet.create({})