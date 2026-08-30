import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const opportunities = [
  {
    key: 'aptitude',
    title: 'Bano Qabil Aptitude Test',
    location: 'Iqra e Noor e Haq',
    date: '30 Aug 2026, Sunday',
    distance: '2.5 km away',
    spots: '20 Spots Left',
    image: require('../../assets/images/opportunities/aptitude-test.jpg'),
  },
  {
    key: 'food',
    title: 'Food Distribution',
    location: 'Orangi Town, Karachi',
    date: '4 Sep 2026',
    distance: '3.1 km away',
    spots: '15 Spots Left',
    image: require('../../assets/images/opportunities/food-distribution.jpg'),
  },
  {
    key: 'blood',
    title: 'Blood Donation Camp',
    location: 'Liaquatabad, Karachi',
    date: '6 Sep 2026',
    distance: '4.0 km away',
    spots: '15 Spots Left',
    image: require('../../assets/images/opportunities/blood-donation.jpg'),
  },
  {
    key: 'water',
    title: 'Clean Water Awareness',
    location: 'North Nazimabad, Karachi',
    date: '10 Sep 2026',
    distance: '5.2 km away',
    spots: '18 Spots Left',
    image: require('../../assets/images/opportunities/clean-water.jpg'),
  },
];

export default function NearbyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pageWrap}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color="#071A3A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nearby Opportunities</Text>
          <TouchableOpacity>
            <Ionicons name="filter" size={20} color="#071A3A" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#8A96B5" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search opportunities..."
            placeholderTextColor="#8A96B5"
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {opportunities.map((item) => (
            <TouchableOpacity key={item.key} style={styles.card}>
              <Image source={item.image} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardLocation}>{item.location}</Text>
                <Text style={styles.cardDate}>{item.date}</Text>
                <View style={styles.cardBottomRow}>
                  <Text style={styles.cardDistance}>{item.distance}</Text>
                  <Text style={styles.cardSpots}>{item.spots}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#B7C0DC" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  pageWrap: {
    flex: 1,
    width: '100%',
    maxWidth: 430,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#071A3A',
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F5FA',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    marginBottom: 18,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    color: '#071A3A',
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  cardImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
    marginRight: 12,
  },

  cardInfo: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#071A3A',
    marginBottom: 2,
  },

  cardLocation: {
    fontSize: 12,
    color: '#8A96B5',
    marginBottom: 2,
  },

  cardDate: {
    fontSize: 12,
    color: '#5A6B8C',
    marginBottom: 6,
  },

  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardDistance: {
    fontSize: 11,
    color: '#5A6B8C',
  },

  cardSpots: {
    fontSize: 11,
    color: '#1FA855',
    fontWeight: '700',
  },
});