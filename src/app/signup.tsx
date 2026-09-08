import { Ionicons } from '@expo/vector-icons';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
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

WebBrowser.maybeCompleteAuthSession();

// Real Client ID, from Google Cloud Console (Web application type)
const GOOGLE_WEB_CLIENT_ID =
  '758307128837-d6mvtq49fjjfk28koi78t2ndaostf9gj.apps.googleusercontent.com';

const GOOGLE_CLIENT_ID = {
  expoClientId: GOOGLE_WEB_CLIENT_ID,
  webClientId: GOOGLE_WEB_CLIENT_ID,
};

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

  const [request, response, promptAsync] = Google.useAuthRequest(GOOGLE_CLIENT_ID);

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      fetchGoogleProfile(authentication?.accessToken);
    } else if (response?.type === 'error') {
      Alert.alert('Google Sign-Up Failed', 'Please try again.');
    }
  }, [response]);

  const fetchGoogleProfile = async (accessToken?: string) => {
    if (!accessToken) return;
    try {
      const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const profile = await res.json();

      // TODO: yahan profile.email / profile.name se apna backend
      // (Supabase / Firebase) account create karen.
      Alert.alert(
        'Signed up with Google',
        `Welcome ${profile.name || ''}`,
        [{ text: 'Continue', onPress: () => router.replace('/home' as any) }],
      );
    } catch {
      Alert.alert('Error', 'Could not fetch your Google profile.');
    }
  };

  const handleGoogleSignup = () => {
    if (!request) {
      Alert.alert('Please wait', 'Still preparing Google Sign-In, try again in a moment.');
      return;
    }
    promptAsync();
  };

  const handleAppleSignup = async () => {
    if (Platform.OS !== 'ios') {
      Alert.alert(
        'iOS Only',
        'Apple Sign-In only works on iOS devices with a development build, not on Android or Expo Go on Android.',
      );
      return;
    }

    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      // TODO: yahan credential.user / credential.email se apna backend
      // (Supabase / Firebase) account create karen.
      Alert.alert(
        'Signed up with Apple',
        `Welcome ${credential.fullName?.givenName || ''}`,
        [{ text: 'Continue', onPress: () => router.replace('/home' as any) }],
      );
    } catch (e: any) {
      if (e.code === 'ERR_REQUEST_CANCELED') {
        // user cancelled, do nothing
      } else {
        Alert.alert('Apple Sign-Up Failed', 'Please try again.');
      }
    }
  };

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

    /*
      TEMPORARY:
      Real Supabase authentication will be connected here later.
      For now, successful signup takes the user to Login.
    */
    Alert.alert(
      'Account Created',
      `Your ${role === 'volunteer' ? 'volunteer' : 'organizer'} account has been created successfully.`,
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
            {/* HEADER */}
            <View style={styles.header}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join Alkhidmat Volunteer</Text>
            </View>

            {/* SOCIAL SIGN-UP */}
            <View style={styles.socialContainer}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleGoogleSignup}
                activeOpacity={0.8}
              >
                <Ionicons name="logo-google" size={19} color="#DB4437" />
                <Text style={styles.socialButtonText}>
                  Continue with Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.socialButton, styles.appleButton]}
                onPress={handleAppleSignup}
                activeOpacity={0.8}
              >
                <Ionicons name="logo-apple" size={20} color="#FFFFFF" />
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
                  color={role === 'volunteer' ? '#FFFFFF' : '#64748B'}
                />
                <Text
                  style={[
                    styles.roleText,
                    role === 'volunteer' && styles.roleTextActive,
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
                  color={role === 'organizer' ? '#FFFFFF' : '#64748B'}
                />
                <Text
                  style={[
                    styles.roleText,
                    role === 'organizer' && styles.roleTextActive,
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
                <Ionicons name="person-outline" size={18} color="#64748B" />
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
                <Ionicons name="mail-outline" size={18} color="#64748B" />
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
                <Ionicons name="call-outline" size={18} color="#64748B" />
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
                <Ionicons name="location-outline" size={18} color="#64748B" />
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
                  onPress={() => setShowPassword((previous) => !previous)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={19}
                    color="#64748B"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* CONFIRM PASSWORD */}
            <View style={styles.field}>
              <Text style={styles.label}>Confirm Password</Text>
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
                    setShowConfirmPassword((previous) => !previous)
                  }
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={
                      showConfirmPassword ? 'eye-off-outline' : 'eye-outline'
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
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* LOGIN */}
            <View style={styles.loginRow}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => router.push('/login' as any)}
                activeOpacity={0.7}
              >
                <Text style={styles.loginLink}>Login</Text>
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
    backgroundColor: '#FFFFFF',
  },
  keyboard: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 35,
  },
  content: {
    width: '100%',
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
    gap: 10,
    marginBottom: 18,
  },
  socialButton: {
    height: 50,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#D9E2F0',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  appleButton: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  appleButtonText: {
    fontSize: 14,
    fontWeight: '600',
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