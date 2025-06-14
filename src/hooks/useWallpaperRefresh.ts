import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { wallpaperService } from '../services/wallpaperService';

export const useWallpaperRefresh = () => {
  useEffect(() => {
    const setupWallpaperRefresh = async () => {
      // Request permissions for notifications
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Notification permissions not granted');
        return;
      }

      // Set up notification handler
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });

      // Schedule wallpaper refresh notification
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Wallpaper Refresh',
          body: 'Time to refresh your wallpaper!',
        },
        trigger: {
          seconds: 3600, // Refresh every hour
          repeats: true,
        },
      });
    };

    setupWallpaperRefresh();

    // Cleanup
    return () => {
      Notifications.cancelAllScheduledNotificationsAsync();
    };
  }, []);

  const refreshWallpaper = async () => {
    try {
      const savedWallpapers = await wallpaperService.getSavedWallpapers();
      if (savedWallpapers.length === 0) return;

      // Get a random wallpaper
      const randomIndex = Math.floor(Math.random() * savedWallpapers.length);
      const randomWallpaper = savedWallpapers[randomIndex];

      // Here you would implement the actual wallpaper setting logic
      // This would require native module implementation for both iOS and Android
      console.log('Refreshing wallpaper to:', randomWallpaper.title);
    } catch (error) {
      console.error('Error refreshing wallpaper:', error);
    }
  };

  return { refreshWallpaper };
}; 