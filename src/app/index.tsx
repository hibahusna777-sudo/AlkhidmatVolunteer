import { router } from 'expo-router';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.content}>

        {/* Alkhidmat Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/alkhidmat-logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.brand}>ALKHIDMAT</Text>

        <Text style={styles.title}>
          Volunteer
        </Text>

        <Text style={styles.titleSecond}>
          Management
        </Text>

        <Text style={styles.description}>
          Join us to serve humanity, help communities,
          and make a positive difference in people's lives.
        </Text>

        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/signup')}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>
            Get Started
          </Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push('/login')}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Serving Humanity • Making a Difference
        </Text>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071A3A',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  logoContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  logo: {
    width: 115,
    height: 115,
  },

  brand: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 5,
    color: '#E8C56A',
    marginBottom: 35,
  },

  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  titleSecond: {
    fontSize: 36,
    fontWeight: '800',
    color: '#2F6BFF',
    textAlign: 'center',
    marginBottom: 18,
  },

  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#A9B8DD',
    textAlign: 'center',
    maxWidth: 340,
    marginBottom: 35,
  },

  primaryButton: {
    width: '100%',
    height: 55,
    borderRadius: 14,
    backgroundColor: '#2F6BFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  secondaryButton: {
    width: '100%',
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8C56A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryButtonText: {
    color: '#E8C56A',
    fontSize: 14,
    fontWeight: '600',
  },

  footer: {
    position: 'absolute',
    bottom: 25,
    color: '#6F80AB',
    fontSize: 11,
    textAlign: 'center',
  },
});