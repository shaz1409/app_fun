import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Quote } from '../types';
import { categories, quotesService } from '../services/quotesService';
import { QuoteCard } from '../components/QuoteCard';
import { Ionicons } from '@expo/vector-icons';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    const allQuotes = await quotesService.getQuotes();
    setQuotes(allQuotes);
  };

  const handleFavoritePress = async (quoteId: string) => {
    await quotesService.toggleFavorite(quoteId);
    loadQuotes();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quote Wallpapers</Text>
        <Text style={styles.subtitle}>Your daily inspiration</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => navigation.navigate('Category', {
                  categoryId: category.id,
                  categoryName: category.name,
                })}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.quotesContainer}>
          <Text style={styles.sectionTitle}>Featured Quotes</Text>
          {quotes.slice(0, 5).map((quote) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              onPress={() => navigation.navigate('QuoteDetail', { quote })}
              onFavoritePress={() => handleFavoritePress(quote.id)}
            />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddQuote')}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f4511e',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  content: {
    flex: 1,
  },
  categoriesContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  categoryCard: {
    width: 100,
    height: 100,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginRight: 15,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
  },
  quotesContainer: {
    padding: 20,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f4511e',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
}); 