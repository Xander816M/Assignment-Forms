import { Formik } from "formik";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import * as Yup from "yup";
import { router } from "expo-router";

// types
interface EmployeeFormValues {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
}

// yup validation
const EmployeeSchema = Yup.object({
  fullName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  position: Yup.string().required("Required"),
});

export default function EmployeeForm() {
  const initialValues: EmployeeFormValues = {
    fullName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Employee Information</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={EmployeeSchema}
        onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="first and last name"
              onChangeText={handleChange("fullName")}
              onBlur={handleBlur("fullName")}
              value={values.fullName}
            />
            {touched.fullName && errors.fullName && (
              <Text style={styles.error}>{errors.fullName}</Text>
            )}

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="email@companyname.com"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="Mobile phone number"
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              value={values.phone}
            />
            {touched.phone && errors.phone && (
              <Text style={styles.error}>{errors.phone}</Text>
            )}

            <Text style={styles.label}>Department</Text>
            <TextInput
              style={styles.input}
              placeholder="HR, IT,Front Office"
              onChangeText={handleChange("department")}
              onBlur={handleBlur("department")}
              value={values.department}
            />
            {touched.department && errors.department && (
              <Text style={styles.error}>{errors.department}</Text>
            )}

            <Text style={styles.label}>Position</Text>
            <TextInput
              style={styles.input}
              placeholder="Manager/Employee "
              onChangeText={handleChange("position")}
              onBlur={handleBlur("position")}
              value={values.position}
            />
            {touched.position && errors.position && (
              <Text style={styles.error}>{errors.position}</Text>
            )}

            <View style={{ marginTop: 20 }}>
              <Button title="Submit" onPress={() => handleSubmit()} />
            </View>
            {/*Sign in */}
<View style={{ marginTop: 20 }}>
  <Button title="Sign In" onPress={() => router.push("/")} />
</View>

<View style={{ marginTop: 10 }}>
  <Button title="Sign Up" onPress={() => router.push("/signUp")} />
</View> 
          </View>
        )}
      </Formik>
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
});
