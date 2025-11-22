import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { Button, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import * as Yup from "yup";


// types
interface EmployeeFormValues {
  email: string;
  password: string;
}

// yup validation
const EmployeeSchema = Yup.object({
  email: Yup.string().email("Invalid Entry").required("Required"),
  password: Yup.string().required("No password provided."),
});






export default function Index() {

    const initialValues: EmployeeFormValues = {
    email: "",
    password: "",
    };
  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Sign In</Text>
      
            <Formik
              initialValues={initialValues}
              validationSchema={EmployeeSchema}
              onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View>
      
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}
    
      
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry={true}
                  />

                  {touched.password && errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}
      
                  <View style={{ marginTop: 20 }}>
                    <Button title="Login"  onPress={() => router.push("/employee-form")} />
                  </View>
                </View>
              )}
            </Formik>

            
          </ScrollView>

          
    </View>


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
});

