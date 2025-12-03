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
      <Text>Signed In</Text>
      <Button title="Sign Out" onPress={handleSignOut}/>
    </View>
  )
}

export default signedIn

const styles = StyleSheet.create({})