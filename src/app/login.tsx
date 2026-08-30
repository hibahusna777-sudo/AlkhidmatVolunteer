import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => {
    if (!email.trim()) {
      Alert.alert(
        'Missing Information',
        'Please enter your email address.'
      );
      return;
    }

    if (!password) {
      Alert.alert(
        'Missing Information',
        'Please enter your password.'
      );
      return;
    }

    router.push('/home');
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'Password recovery will be available soon.'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>

            {/* ALKHIDMAT LOGO */}
            <Image
              source={require('../../assets/images/alkhidmat-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            {/* WELCOME */}
            <Text style={styles.welcome}>
              Welcome Back
            </Text>

            <Text style={styles.subtitle}>
              Sign in to continue volunteering.
            </Text>

            {/* EMAIL */}
            <View style={styles.field}>
              <Text style={styles.label}>
                Email Address
              </Text>

              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor="#6F80AB"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* PASSWORD */}
            <View style={styles.field}>
              <Text style={styles.label}>
                Password
              </Text>

              <View style={styles.passWrap}>
                <TextInput
                  style={styles.passInput}
                  placeholder="Enter your password"
                  placeholderTextColor="#6F80AB"
                  secureTextEntry={!showPass}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={password}
                  onChangeText={setPassword}
                />

                <TouchableOpacity
                  onPress={() =>
                    setShowPass((previous) => !previous)
                  }
                  activeOpacity={0.7}
                >
                  <Text style={styles.toggle}>
                    {showPass ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* FORGOT PASSWORD */}
            <TouchableOpacity
              style={styles.forgotWrap}
              onPress={handleForgotPassword}
              activeOpacity={0.7}
            >
              <Text style={styles.forgotText}>
                Forgot password?
              </Text>
            </TouchableOpacity>

            {/* SIGN IN */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                Sign In
              </Text>
            </TouchableOpacity>

            {/* SIGN UP */}
            <View style={styles.signupRow}>
              <Text style={styles.signupText}>
                Don't have an account?{' '}
              </Text>

              <TouchableOpacity
                onPress={() => router.push('/signup')}
                activeOpacity={0.7}
              >
                <Text style={styles.signupLink}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            {/* BACK TO WELCOME */}
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Text style={styles.backText}>
                Back to Welcome
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071A3A',
  },

  keyboardView: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  content: {
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },

  logo: {
    width: 190,
    height: 110,
    marginBottom: 15,
  },

  welcome: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    color: '#A9B8DD',
    textAlign: 'center',
    marginBottom: 30,
  },

  field: {
    width: '100%',
    marginBottom: 16,
  },

  label: {
    fontSize: 12,
    color: '#A9B8DD',
    marginBottom: 6,
  },

  input: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 14,
    color: '#FFFFFF',
    fontSize: 14,
  },

  passWrap: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  passInput: {
    flex: 1,
    height: '100%',
    color: '#FFFFFF',
    fontSize: 14,
  },

  toggle: {
    color: '#A9B8DD',
    fontSize: 12,
    fontWeight: '600',
  },

  forgotWrap: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },

  forgotText: {
    color: '#E8C56A',
    fontSize: 13,
    fontWeight: '600',
  },

  button: {
    width: '100%',
    height: 55,
    borderRadius: 14,
    backgroundColor: '#2F6BFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  signupRow: {
    flexDirection: 'row',
    marginTop: 22,
  },

  signupText: {
    color: '#A9B8DD',
    fontSize: 13,
  },

  signupLink: {
    color: '#E8C56A',
    fontSize: 13,
    fontWeight: '700',
  },

  backText: {
    color: '#6F80AB',
    fontSize: 13,
    marginTop: 18,
  },
});