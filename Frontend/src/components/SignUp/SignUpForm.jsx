import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, Alert } from '@mui/material';

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue, 
    formState: { errors },
  } = useForm();

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const password = watch('password');

  const onSubmit = async (data) => {
    const formattedData = {
      firstName: data.firstName,
      lastName: data.lastName,
      emailId: data.emailId, 
      password: data.password,
      businessName: data.businessName,
      city: data.city,
      state: data.state,
      role: data.role,
    };

    try {
      const response = await fetch('http://localhost:5000/api/users/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Sign-up failed');
      }

      setSuccessMessage('Signup successful!');
      setErrorMessage('');
      reset();
      
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card sx={{ maxWidth: 700, p: 3, textAlign: 'center', border: '2px solid #ff7b00' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <CardContent>
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <TextField
              fullWidth
              label="First Name"
              {...register('firstName', { required: 'First name is required' })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Last Name"
              {...register('lastName', { required: 'Last name is required' })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              {...register('emailId', { required: 'Email is required' })}
              error={!!errors.emailId}
              helperText={errors.emailId?.message}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Retype Password"
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Business/Artist Name"
              {...register('businessName', { required: 'Business/Artist name is required' })}
              error={!!errors.businessName}
              helperText={errors.businessName?.message}
              margin="dense"
            />
            <TextField
              fullWidth
              label="City"
              {...register('city', { required: 'City is required' })}
              error={!!errors.city}
              helperText={errors.city?.message}
              margin="dense"
            />
            <TextField
              fullWidth
              label="State"
              {...register('state', { required: 'State is required' })}
              error={!!errors.state}
              helperText={errors.state?.message}
              margin="dense"
            />
            <FormControl fullWidth margin="dense">
              <InputLabel>Role</InputLabel>
              <Select
                defaultValue=""
                {...register('role', { required: 'Role is required' })}
                onChange={(e) => setValue('role', e.target.value)}
                error={!!errors.role}
              >
                <MenuItem value="venue">Venue</MenuItem>
                <MenuItem value="artist">Artist</MenuItem>
                <MenuItem value="promoter">Promoter</MenuItem>
              </Select>
              {errors.role && <Typography color="error">{errors.role.message}</Typography>}
            </FormControl>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, backgroundColor: '#ff7b00' }}>
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}