import AsyncStorage from '@react-native-async-storage/async-storage';
import { Quote, Category } from '../types';

const QUOTES_STORAGE_KEY = '@quotes';
const FAVORITES_STORAGE_KEY = '@favorite_quotes';

// Sample quotes data - in a real app, this would come from an API
const sampleQuotes: Quote[] = [
  {
    id: '1',
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "motivation",
    isFavorite: false,
    backgroundColor: "#f4511e",
    textColor: "#ffffff"
  },
  {
    id: '2',
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    category: "life",
    isFavorite: false,
    backgroundColor: "#2196F3",
    textColor: "#ffffff"
  },
  {
    id: '3',
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "inspiration",
    isFavorite: false,
    backgroundColor: "#4CAF50",
    textColor: "#ffffff"
  },
  {
    id: '4',
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "success",
    isFavorite: false,
    backgroundColor: "#9C27B0",
    textColor: "#ffffff"
  },
  {
    id: '5',
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    category: "wisdom",
    isFavorite: false,
    backgroundColor: "#FF9800",
    textColor: "#ffffff"
  }
];

export const categories: Category[] = [
  { id: 'motivation', name: 'Motivation', icon: '💪' },
  { id: 'inspiration', name: 'Inspiration', icon: '✨' },
  { id: 'wisdom', name: 'Wisdom', icon: '🧠' },
  { id: 'success', name: 'Success', icon: '🏆' },
  { id: 'life', name: 'Life', icon: '🌱' }
];

export const quotesService = {
  async initializeQuotes(): Promise<void> {
    try {
      const existingQuotes = await AsyncStorage.getItem(QUOTES_STORAGE_KEY);
      if (!existingQuotes) {
        await AsyncStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(sampleQuotes));
      }
    } catch (error) {
      console.error('Error initializing quotes:', error);
    }
  },

  async getQuotes(): Promise<Quote[]> {
    try {
      const quotes = await AsyncStorage.getItem(QUOTES_STORAGE_KEY);
      return quotes ? JSON.parse(quotes) : [];
    } catch (error) {
      console.error('Error getting quotes:', error);
      return [];
    }
  },

  async getQuotesByCategory(categoryId: string): Promise<Quote[]> {
    try {
      const quotes = await this.getQuotes();
      return quotes.filter(quote => quote.category === categoryId);
    } catch (error) {
      console.error('Error getting quotes by category:', error);
      return [];
    }
  },

  async toggleFavorite(quoteId: string): Promise<void> {
    try {
      const quotes = await this.getQuotes();
      const updatedQuotes = quotes.map(quote => 
        quote.id === quoteId 
          ? { ...quote, isFavorite: !quote.isFavorite }
          : quote
      );
      await AsyncStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(updatedQuotes));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  },

  async getFavorites(): Promise<Quote[]> {
    try {
      const quotes = await this.getQuotes();
      return quotes.filter(quote => quote.isFavorite);
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  },

  async addQuote(quote: Omit<Quote, 'id'>): Promise<void> {
    try {
      const quotes = await this.getQuotes();
      const newQuote = {
        ...quote,
        id: Date.now().toString(),
        isFavorite: false
      };
      quotes.push(newQuote);
      await AsyncStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(quotes));
    } catch (error) {
      console.error('Error adding quote:', error);
    }
  }
}; 