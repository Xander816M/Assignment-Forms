import { StyleSheet, Text, View, Button } from 'react-native'
import {router} from 'expo-router'
import React from 'react'
import { signingOut } from '@/hooks/signOut'

const signedIn = () => {
    const handleSignOut = async () =>{
        await signingOut()
        router.replace('/')
    }
  return (
    <View>

      <Text style={{
        marginTop:150,
        marginBottom:30,
        textAlign:"center",
        fontWeight:"bold",
        fontSize:28
      }}>Signed In</Text>

      <View style={styles.signOutButton}>
        <Button title="Sign Out" onPress={handleSignOut} />
      </View>
    </View>
  )
}

export default signedIn

const styles = StyleSheet.create({
  signOutButton: {
    alignItems:"center"
  }
})