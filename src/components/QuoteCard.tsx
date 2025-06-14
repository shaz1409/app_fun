import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Quote } from '../types';
import { Ionicons } from '@expo/vector-icons';

interface QuoteCardProps {
  quote: Quote;
  onPress: () => void;
  onFavoritePress: () => void;
  style?: object;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  onPress,
  onFavoritePress,
  style
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: quote.backgroundColor },
        style
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <Text style={[styles.quoteText, { color: quote.textColor }]}>
          "{quote.text}"
        </Text>
        <Text style={[styles.authorText, { color: quote.textColor }]}>
          - {quote.author}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={onFavoritePress}
      >
        <Ionicons
          name={quote.isFavorite ? 'heart' : 'heart-outline'}
          size={24}
          color={quote.textColor}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flex: 1,
  },
  quoteText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    lineHeight: 24,
  },
  authorText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'right',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
}); 