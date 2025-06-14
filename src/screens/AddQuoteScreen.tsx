import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { quotesService } from '../services/quotesService';
import { categories } from '../services/quotesService';

const colorOptions = [
  { name: 'Orange', value: '#f4511e' },
  { name: 'Blue', value: '#2196F3' },
  { name: 'Green', value: '#4CAF50' },
  { name: 'Purple', value: '#9C27B0' },
  { name: 'Teal', value: '#009688' },
  { name: 'Pink', value: '#E91E63' },
];

type AddQuoteScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddQuote'>;

export const AddQuoteScreen = () => {
  const navigation = useNavigation<AddQuoteScreenNavigationProp>();
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].value);
  const [textColor, setTextColor] = useState('#ffffff');

  const handleSubmit = async () => {
    if (!quote.trim() || !author.trim()) {
      Alert.alert('Error', 'Please fill in both quote and author fields');
      return;
    }

    try {
      await quotesService.addQuote({
        text: quote.trim(),
        author: author.trim(),
        category: selectedCategory,
        backgroundColor: selectedColor,
        textColor: textColor,
        isFavorite: false,
      });

      Alert.alert(
        'Success',
        'Quote added successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to add quote. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Your Quote</Text>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={4}
          placeholder="Enter your quote here..."
          value={quote}
          onChangeText={setQuote}
        />

        <Text style={styles.label}>Author</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter the author's name"
          value={author}
          onChangeText={setAuthor}
        />

        <Text style={styles.label}>Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.label}>Background Color</Text>
        <View style={styles.colorContainer}>
          {colorOptions.map((color) => (
            <TouchableOpacity
              key={color.value}
              style={[
                styles.colorButton,
                { backgroundColor: color.value },
                selectedColor === color.value && styles.selectedColor,
              ]}
              onPress={() => setSelectedColor(color.value)}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: selectedColor }]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Add Quote</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: '#e0e0e0',
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 5,
  },
  categoryName: {
    fontSize: 14,
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#000',
  },
  submitButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 