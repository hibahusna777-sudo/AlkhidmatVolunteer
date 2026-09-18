import { Ionicons } from '@expo/vector-icons';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupScreen() {
  const router = useRouter();

  const [role, setRole] = useState<'volunteer' | 'organizer'>('volunteer');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // GOOGLE SIGN-IN
  // Safe demo action until a Google OAuth Client ID is configured.
  // This does not crash Expo Go and does not pretend that authentication succeeded.
  const handleGoogleSignup = () => {
    Alert.alert(
      'Google Sign-In',
      'Google Sign-In needs Google OAuth configuration before it can be activated. You can create your account using the form below.',
    );
  };

  // APPLE SIGN-IN
  const handleAppleSignup = async () => {
    if (Platform.OS !== 'ios') {
      Alert.alert(
        'Apple Sign-In',
        'Apple Sign-In is available on iOS. On Android and Expo Go, please use the normal Sign Up form.',
      );
      return;
    }

    try {
      const available = await AppleAuthentication.isAvailableAsync();

      if (!available) {
        Alert.alert(
          'Apple Sign-In',
          'Apple Sign-In is not available on this device. Please use the normal Sign Up form.',
        );
        return;
      }

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      Alert.alert(
        'Signed up with Apple',
        `Welcome ${credential.fullName?.givenName || 'Volunteer'}`,
        [
          {
            text: 'Continue',
            onPress: () => router.replace('/home' as any),
          },
        ],
      );
    } catch (e: any) {
      if (e?.code === 'ERR_REQUEST_CANCELED') {
        return;
      }

      Alert.alert(
        'Apple Sign-In',
        'Apple Sign-In could not be completed. Please use the normal Sign Up form.',
      );
    }
  };

  // NORMAL SIGN-UP
  const handleSignup = () => {
    if (!name.trim()) {
      Alert.alert('Required', 'Please enter your full name.');
      return;
    }

    if (!phone.trim()) {
      Alert.alert('Required', 'Please enter your phone number.');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Required', 'Please enter your email address.');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!city.trim()) {
      Alert.alert('Required', 'Please enter your city.');
      return;
    }

    if (!password) {
      Alert.alert('Required', 'Please create a password.');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Weak Password',
        'Password must be at least 6 characters long.',
      );
      return;
    }

    if (!confirmPassword) {
      Alert.alert('Required', 'Please confirm your password.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Error', 'Passwords do not match.');
      return;
    }

    Alert.alert(
      'Account Created',
      `Your ${
        role === 'volunteer' ? 'volunteer' : 'organizer'
      } account has been created successfully.`,
      [
        {
          text: 'Continue',
          onPress: () => router.replace('/login' as any),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>

            {/* HERO */}
            <View style={styles.hero}>
              <View style={styles.heroGlowOne} />
              <View style={styles.heroGlowTwo} />

              <View style={styles.heroIcon}>
                <Ionicons name="people" size={27} color="#FFFFFF" />
              </View>

              <View style={styles.heroTextBlock}>
                <Text style={styles.heroBadge}>ALKHIDMAT VOLUNTEER</Text>
                <Text style={styles.heroTitle}>Create your account</Text>
                <Text style={styles.heroSubtitle}>
                  Join a community making a real difference through service.
                </Text>
              </View>
            </View>

            {/* HEADER */}
            <View style={styles.header}>
              <Text style={styles.title}>Choose how to continue</Text>
              <Text style={styles.subtitle}>
                Use a social account or complete the form below
              </Text>
            </View>

            {/* SOCIAL SIGN-UP */}
            <View style={styles.socialContainer}>

              {/* GOOGLE */}
              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleGoogleSignup}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="logo-google"
                  size={19}
                  color="#DB4437"
                />

                <Text style={styles.socialButtonText}>
                  Continue with Google
                </Text>
              </TouchableOpacity>

              {/* APPLE */}
              <TouchableOpacity
                style={[styles.socialButton, styles.appleButton]}
                onPress={handleAppleSignup}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="logo-apple"
                  size={20}
                  color="#FFFFFF"
                />

                <Text style={styles.appleButtonText}>
                  Continue with Apple
                </Text>
              </TouchableOpacity>

            </View>

            {/* DIVIDER */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />

              <Text style={styles.dividerText}>OR</Text>

              <View style={styles.dividerLine} />
            </View>

            {/* ROLE SELECTOR */}
            <View style={styles.roleContainer}>

              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === 'volunteer' && styles.roleButtonActive,
                ]}
                onPress={() => setRole('volunteer')}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="people-outline"
                  size={18}
                  color={
                    role === 'volunteer'
                      ? '#FFFFFF'
                      : '#64748B'
                  }
                />

                <Text
                  style={[
                    styles.roleText,
                    role === 'volunteer' &&
                      styles.roleTextActive,
                  ]}
                >
                  Volunteer
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === 'organizer' && styles.roleButtonActive,
                ]}
                onPress={() => setRole('organizer')}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="business-outline"
                  size={18}
                  color={
                    role === 'organizer'
                      ? '#FFFFFF'
                      : '#64748B'
                  }
                />

                <Text
                  style={[
                    styles.roleText,
                    role === 'organizer' &&
                      styles.roleTextActive,
                  ]}
                >
                  Organizer
                </Text>
              </TouchableOpacity>

            </View>

            {/* FULL NAME */}
            <View style={styles.field}>
              <Text style={styles.label}>Full Name</Text>

              <View style={styles.inputWrapper}>
                <Ionicons
                  name="person-outline"
                  size={18}
                  color="#64748B"
                />

                <TextInput
                  style={styles.input}
                  placeholder="Enter your full name"
                  placeholderTextColor="#94A3B8"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* EMAIL */}
            <View style={styles.field}>
              <Text style={styles.label}>Email Address</Text>

              <View style={styles.inputWrapper}>
                <Ionicons
                  name="mail-outline"
                  size={18}
                  color="#64748B"
                />

                <TextInput
                  style={styles.input}
                  placeholder="you@example.com"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            {/* PHONE */}
            <View style={styles.field}>
              <Text style={styles.label}>Phone Number</Text>

              <View style={styles.inputWrapper}>
                <Ionicons
                  name="call-outline"
                  size={18}
                  color="#64748B"
                />

                <TextInput
                  style={styles.input}
                  placeholder="03XX-XXXXXXX"
                  placeholderTextColor="#94A3B8"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
            </View>

            {/* CITY */}
            <View style={styles.field}>
              <Text style={styles.label}>City</Text>

              <View style={styles.inputWrapper}>
                <Ionicons
                  name="location-outline"
                  size={18}
                  color="#64748B"
                />

                <TextInput
                  style={styles.input}
                  placeholder="Your city"
                  placeholderTextColor="#94A3B8"
                  value={city}
                  onChangeText={setCity}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* PASSWORD */}
            <View style={styles.field}>
              <Text style={styles.label}>Create Password</Text>

              <View style={styles.inputWrapper}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color="#64748B"
                />

                <TextInput
                  style={styles.input}
                  placeholder="Create a password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                />

                <TouchableOpacity
                  onPress={() =>
                    setShowPassword(
                      (previous) => !previous,
                    )
                  }
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={
                      showPassword
                        ? 'eye-off-outline'
                        : 'eye-outline'
                    }
                    size={19}
                    color="#64748B"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* CONFIRM PASSWORD */}
            <View style={styles.field}>
              <Text style={styles.label}>
                Confirm Password
              </Text>

              <View style={styles.inputWrapper}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color="#64748B"
                />

                <TextInput
                  style={styles.input}
                  placeholder="Re-enter your password"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  autoCapitalize="none"
                />

                <TouchableOpacity
                  onPress={() =>
                    setShowConfirmPassword(
                      (previous) => !previous,
                    )
                  }
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={
                      showConfirmPassword
                        ? 'eye-off-outline'
                        : 'eye-outline'
                    }
                    size={19}
                    color="#64748B"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* SIGN UP BUTTON */}
            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignup}
              activeOpacity={0.85}
            >
              <Text style={styles.signupButtonText}>
                Sign Up
              </Text>
            </TouchableOpacity>

            {/* LOGIN */}
            <View style={styles.loginRow}>
              <Text style={styles.loginText}>
                Already have an account?{' '}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  router.push('/login' as any)
                }
                activeOpacity={0.7}
              >
                <Text style={styles.loginLink}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FC',
  },

  keyboard: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 35,
  },

  content: {
    width: '100%',
  },

  hero: {
    minHeight: 178,
    borderRadius: 24,
    backgroundColor: '#0D2B63',
    paddingHorizontal: 22,
    paddingVertical: 22,
    marginBottom: 22,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'flex-end',
  },

  heroGlowOne: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#2F6BFF',
    opacity: 0.20,
    right: -55,
    top: -65,
  },

  heroGlowTwo: {
    position: 'absolute',
    width: 105,
    height: 105,
    borderRadius: 53,
    backgroundColor: '#E8C56A',
    opacity: 0.13,
    left: -45,
    bottom: -48,
  },

  heroIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: '#2F6BFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },

  heroTextBlock: {
    width: '100%',
  },

  heroBadge: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: '#E8C56A',
    marginBottom: 5,
  },

  heroTitle: {
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  heroSubtitle: {
    fontSize: 12,
    lineHeight: 18,
    color: '#D7E2FA',
    marginTop: 5,
    maxWidth: 310,
  },

  header: {
    alignItems: 'center',
    marginBottom: 22,
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#071A3A',
  },

  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 5,
    textAlign: 'center',
  },

  socialContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },

  socialButton: {
    flex: 1,
    minWidth: 0,
    height: 50,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#D9E2F0',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingHorizontal: 8,
  },

  socialButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },

  appleButton: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },

  appleButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },

  dividerText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    marginHorizontal: 10,
  },

  roleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 13,
    padding: 4,
    marginBottom: 20,
  },

  roleButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },

  roleButtonActive: {
    backgroundColor: '#1555B5',
  },

  roleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },

  roleTextActive: {
    color: '#FFFFFF',
  },

  field: {
    width: '100%',
    marginBottom: 14,
  },

  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },

  inputWrapper: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: '#D9E2F0',
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
    color: '#0F172A',
    fontSize: 14,
  },

  signupButton: {
    width: '100%',
    height: 52,
    borderRadius: 11,
    backgroundColor: '#1555B5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },

  signupButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  loginText: {
    color: '#64748B',
    fontSize: 13,
  },

  loginLink: {
    color: '#1555B5',
    fontSize: 13,
    fontWeight: '700',
  },
});