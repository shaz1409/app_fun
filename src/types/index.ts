export interface Wallpaper {
  id: string;
  url: string;
  thumbnailUrl: string;
  title: string;
  category: string;
  tags: string[];
  author?: string;
  isFavorite: boolean;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  category: string;
  isFavorite: boolean;
  backgroundColor: string;
  textColor: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export type RootStackParamList = {
  Home: undefined;
  Category: { categoryId: string; categoryName: string };
  WallpaperDetail: { wallpaper: Wallpaper };
  QuoteDetail: { quote: Quote };
  Favorites: undefined;
  Settings: undefined;
  AddQuote: undefined;
}; 