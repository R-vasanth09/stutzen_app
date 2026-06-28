import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
   const [loading, setLoading] = useState(false);

  const validateEmail = value => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

 const handleLogin = async () => {
  let valid = true;

  setEmailError('');
  setPasswordError('');

  if (!validateEmail(email)) {
    setEmailError('Please enter a valid email address');
    valid = false;
  }

  if (password.length < 6) {
    setPasswordError('Password must be at least 6 characters');
    valid = false;
  }

  if (!valid) return;

  try {
   
    setLoading(true);

    const userCredential = await auth().signInWithEmailAndPassword(
      email.trim(),
      password,
    );

    console.log('Login Success:', userCredential.user);

    navigation.replace('Productlist');
    
  } catch (error) {
    console.log('Login Error:', error);

    switch (error.code) {
      case 'auth/user-not-found':
        Alert.alert('Login Failed', 'User not found');
        break;

      case 'auth/wrong-password':
        Alert.alert('Login Failed', 'Incorrect password');
        break;

      case 'auth/invalid-email':
        Alert.alert('Login Failed', 'Invalid email address');
        break;

      case 'auth/invalid-credential':
        Alert.alert('Login Failed', 'Invalid email or password');
        break;

      case 'auth/too-many-requests':
        Alert.alert(
          'Login Failed',
          'Too many attempts. Please try again later.',
        );
        break;

      default:
        Alert.alert('Error', error.message);
    }
  } finally {
   
    setLoading(false);
  }
};
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <Text style={styles.title}>Welcome Back</Text>

        <Text style={styles.subTitle}>Sign in to continue shopping</Text>

        <Text style={styles.label}>Email Address</Text>

        <View style={styles.inputContainer}>
          <Icon name="mail-outline" size={24} color="#808080" />

          <TextInput
            placeholder="user@example.com"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {emailError ? (
          <Text style={styles.errorText}>⚠ {emailError}</Text>
        ) : null}

        <Text style={[styles.label, { marginTop: 20 }]}>Password</Text>

        <View
          style={[
            styles.inputContainer,
            passwordError && {
              borderColor: 'red',
            },
          ]}
        >
          <TextInput
            placeholder="••••••••"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={26}
              color="#808080"
            />
          </TouchableOpacity>
        </View>

        {passwordError ? (
          <Text style={styles.errorText}>⚠ {passwordError}</Text>
        ) : null}

        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login →</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.line} />

          <Text style={styles.orText}>OR</Text>

          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.googleBtn}>
          <Text style={styles.googleText}>GOOGLE Continue with Google</Text>
        </TouchableOpacity>

        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Don't have an account?</Text>

          <TouchableOpacity>
            <Text style={styles.createAccount}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
  },

  logoContainer: {
    width: 140,
    height: 140,
    backgroundColor: '#ECE9FF',
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 60,

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 5,
  },

  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginTop: 40,
  },

  subTitle: {
    fontSize: 20,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 40,
  },

  label: {
    fontSize: 18,
    color: '#374151',
    marginBottom: 10,
    marginHorizontal: 25,
  },

  inputContainer: {
    height: 65,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 18,
    backgroundColor: '#FFFFFF',

    marginHorizontal: 25,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 15,
  },

  input: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
    color: '#111827',
  },

  errorText: {
    color: '#DC2626',
    fontSize: 14,
    marginTop: 8,
    marginHorizontal: 30,
  },

  forgotText: {
    color: '#2563EB',
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'flex-end',
    marginRight: 25,
    marginTop: 15,
  },

  loginButton: {
    height: 65,
    backgroundColor: '#2563EB',
    marginHorizontal: 25,
    borderRadius: 18,

    justifyContent: 'center',
    alignItems: 'center',

    marginTop: 35,

    elevation: 8,
  },

  loginText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    marginHorizontal: 25,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#D1D5DB',
  },

  orText: {
    marginHorizontal: 15,
    fontSize: 18,
    color: '#6B7280',
  },

  googleBtn: {
    height: 70,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 18,

    justifyContent: 'center',
    alignItems: 'center',

    marginHorizontal: 25,
    marginTop: 40,

    backgroundColor: '#EEF2FF',
  },

  googleText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#111827',
  },

  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },

  bottomText: {
    fontSize: 18,
    color: '#374151',
  },

  createAccount: {
    color: '#2563EB',
    fontWeight: '700',
    fontSize: 18,
    marginLeft: 5,
  },
});
