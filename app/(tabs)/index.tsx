// App.js
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, StyleSheet, Text } from 'react-native';
import { Button, TextInput, Title } from 'react-native-paper';
import * as yup from 'yup';

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  surname: yup.string().required('Surname is required'),
  birthDate: yup
    .string()
    .required('Birth date is required')
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Format must be dd/mm/yyyy'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: yup.string().required('Phone number is required'),
});

export default function App() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      surname: '',
      birthDate: '',
      email: '',
      phone: '',
    },
  });


  const onSubmit = (data: any) => {
    Alert.alert('Form Submitted', JSON.stringify(data, null, 2));
    reset(); // Now fully resets all fields to empty
  };
  // Reset function to clear all fields

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title style={styles.title}>IME - SWE3 Interview Form</Title>

      {/* Name */}
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Name"
            value={value || ''}
            onChangeText={onChange}
            error={!!errors.name}
            style={styles.input}
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      {/* Surname */}
      <Controller
        control={control}
        name="surname"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Surname"
            value={value || ''}
            onChangeText={onChange}
            error={!!errors.surname}
            style={styles.input}
          />
        )}
      />
      {errors.surname && <Text style={styles.error}>{errors.surname.message}</Text>}

      {/* Birth Date */}
      <Controller
        control={control}
        name="birthDate"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Birth Date (dd/mm/yyyy)"
            value={value || ''}
            onChangeText={onChange}
            error={!!errors.birthDate}
            style={styles.input}
          />
        )}
      />
      {errors.birthDate && <Text style={styles.error}>{errors.birthDate.message}</Text>}

      {/* Email */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Email"
            value={value || ''}
            onChangeText={onChange}
            error={!!errors.email}
            keyboardType="email-address"
            style={styles.input}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/* Phone */}
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Phone Number"
            value={value || ''}
            onChangeText={onChange}
            error={!!errors.phone}
            keyboardType="phone-pad"
            style={styles.input}
          />
        )}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}

      {/* Submit */}
      <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
        Submit
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 80,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 24,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});
