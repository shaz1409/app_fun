# App Fun

A cross-platform mobile application built with React Native and Expo.

## Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac users) or Android Studio (for Android development)

## Getting Started

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Start the development server:
```bash
npm start
# or
yarn start
```

3. Run on your device:
- Scan the QR code with the Expo Go app on your iOS or Android device
- Press 'i' to open in iOS simulator
- Press 'a' to open in Android emulator

## Development

- The app is built with TypeScript for better type safety
- Uses React Navigation for screen management
- Follows modern React Native best practices

## Building for Production

To create production builds:

1. For iOS:
```bash
expo build:ios
```

2. For Android:
```bash
expo build:android
```

## Project Structure

- `App.tsx` - Main application component
- `src/` - Source code directory
  - `components/` - Reusable components
  - `screens/` - Screen components
  - `navigation/` - Navigation configuration
  - `assets/` - Images, fonts, and other static assets 