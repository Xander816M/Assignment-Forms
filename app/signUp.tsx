import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { router } from "expo-router";

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  reenterPassword: string;
}

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(1, "First name can not be less than 3 characters")
    .max(80, "First name can not exceed 40 characters")
    .required("Full name is required"),
  lastName: Yup.string()
    .min(1, "Last name can't be less than 3 characters")
    .max(80, "Last Name can't be more then 20 characters")
    .required("Last name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
  reenterPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match")
    .required("Re-entering password is required"),
});

const handleSignUp = () => {
  console.log("Submited");
};
const signUp = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Formik<SignUpFormValues>
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          reenterPassword: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={handleSignUp}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Enter First Name"
              onChangeText={handleChange("firstName")}
              onBlur={handleBlur("firstName")}
              value={values.firstName}
            />
            {touched.firstName && errors.firstName && (
              <Text style={styles.error}>{errors.firstName}</Text>
            )}
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Enter Last Name"
              onChangeText={handleChange("lastName")}
              onBlur={handleBlur("lastName")}
              value={values.lastName}
            />
            {touched.lastName && errors.lastName && (
              <Text style={styles.error}>{errors.lastName}</Text>
            )}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Enter Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.formInput}
              placeholder="Enter Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={[styles.formInput, { marginBottom: 10 }]}
              placeholder="Re-enter Password"
              onChangeText={handleChange("reenterPassword")}
              onBlur={handleBlur("reenterPassword")}
              value={values.reenterPassword}
            />
            {touched.reenterPassword && errors.reenterPassword && (
              <Text style={styles.error}>{errors.reenterPassword}</Text>
            )}
            <View style={styles.button}>
              <Button title="Sign Up" onPress={() => handleSubmit()} />
            </View>
            <View style={styles.button}>
              <Button title="Go to Sign In" onPress={() => router.push("/")} />
            </View>
            <View style={styles.button}>
              <Button
                title="Employee"
                onPress={() => router.push("/employee-form")}
              />
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default signUp;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
  },
  error: {
    color: "red",
    paddingBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
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
});
