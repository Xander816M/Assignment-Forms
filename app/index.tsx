import { useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import { Button, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import * as Yup from "yup";
import { auth } from "../library/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


// types
interface EmployeeFormValues {
  email: string;
  password: string;
}


interface SignInFormValues {
  email: string;
  password: string;
}


const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

  


export default function Index() {
  
  const router = useRouter();
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  const handleLogin = async (values: SignInFormValues) => {
    try {
      setFirebaseError(null);
      await signInWithEmailAndPassword(auth, values.email, values.password);
      // Navigate to dashboard after successful sign-in
      router.replace("/signedIn");
    } catch (error: any) {
      setFirebaseError(error.message || "Login Failed");
      console.log("nopeman")
    }
  };
  
    const initialValues: EmployeeFormValues = {
    email: "",
    password: "",
    };
  return (

      <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Sign In</Text>
      
            <Formik<SignInFormValues>
              initialValues={initialValues}
              validationSchema={signInSchema}
              onSubmit={handleLogin}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View>
      
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    autoCapitalize="none"
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}
    
      
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="passord"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={true}
                  />

                  {touched.password && errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}
                  {firebaseError && <Text style={styles.error}>{firebaseError}</Text>}
      
                  <TouchableOpacity
                  onPress={() => handleSubmit()}
                  style={styles.submitButton}
                  >
                    <Text style={styles.submitButtonText}>Sign In</Text>
                  </TouchableOpacity> 
                </View>
              )}
            </Formik>

            <View style={{ marginTop: 20 }}>
              <Button title="Go to Sign Up" onPress={() => router.push("/signUp")} />
            </View>
            <View style={{ marginTop: 20 }}>
              <Button
                title="Employee"
                onPress={() => router.push("/employee-form")}
              />
            </View>

            
          </ScrollView>

          


  );

  
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  label: {
    marginTop: 12,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    marginTop:20,
    paddingVertical:6,
    backgroundColor:"#2196F3",
    borderRadius:2
  },
  submitButtonText: {
    fontSize:16,
    textAlign:"center",
    color:"#FFF"
  },
});

