import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Wallpaper } from '../types';

const WALLPAPERS_STORAGE_KEY = '@wallpapers';
const FAVORITES_STORAGE_KEY = '@favorites';

export const wallpaperService = {
  async saveWallpaper(wallpaper: Wallpaper): Promise<void> {
    try {
      const fileName = `${wallpaper.id}.jpg`;
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;
      
      // Download the wallpaper
      const downloadResult = await FileSystem.downloadAsync(wallpaper.url, fileUri);
      
      if (downloadResult.status === 200) {
        // Save wallpaper metadata
        const savedWallpapers = await this.getSavedWallpapers();
        savedWallpapers.push({
          ...wallpaper,
          localUri: fileUri
        });
        await AsyncStorage.setItem(WALLPAPERS_STORAGE_KEY, JSON.stringify(savedWallpapers));
      }
    } catch (error) {
      console.error('Error saving wallpaper:', error);
      throw error;
    }
  },

  async getSavedWallpapers(): Promise<Wallpaper[]> {
    try {
      const wallpapers = await AsyncStorage.getItem(WALLPAPERS_STORAGE_KEY);
      return wallpapers ? JSON.parse(wallpapers) : [];
    } catch (error) {
      console.error('Error getting saved wallpapers:', error);
      return [];
    }
  },

  async toggleFavorite(wallpaperId: string): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const isFavorite = favorites.includes(wallpaperId);
      
      if (isFavorite) {
        const newFavorites = favorites.filter(id => id !== wallpaperId);
        await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
      } else {
        favorites.push(wallpaperId);
        await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  },

  async getFavorites(): Promise<string[]> {
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      return [];
    }
  },

  async deleteWallpaper(wallpaperId: string): Promise<void> {
    try {
      const wallpapers = await this.getSavedWallpapers();
      const wallpaper = wallpapers.find(w => w.id === wallpaperId);
      
      if (wallpaper?.localUri) {
        await FileSystem.deleteAsync(wallpaper.localUri);
      }
      
      const newWallpapers = wallpapers.filter(w => w.id !== wallpaperId);
      await AsyncStorage.setItem(WALLPAPERS_STORAGE_KEY, JSON.stringify(newWallpapers));
    } catch (error) {
      console.error('Error deleting wallpaper:', error);
      throw error;
    }
  }
}; 