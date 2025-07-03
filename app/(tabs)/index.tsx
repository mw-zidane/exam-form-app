// App.js
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, Text } from 'react-native';
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
    <ScrollView>
      <Title>IME - SWE3 Interview Form</Title>

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
          />
        )}
      />
      {errors.name && <Text>{errors.name.message}</Text>}

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
          />
        )}
      />
      {errors.surname && <Text>{errors.surname.message}</Text>}

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
          />
        )}
      />
      {errors.birthDate && <Text>{errors.birthDate.message}</Text>}

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
          />
        )}
      />
      {errors.email && <Text>{errors.email.message}</Text>}

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
          />
        )}
      />
      {errors.phone && <Text>{errors.phone.message}</Text>}

      {/* Submit */}
      <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
        Submit
      </Button>
    </ScrollView>
  );
}
