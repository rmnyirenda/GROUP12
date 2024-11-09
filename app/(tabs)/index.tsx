import React from 'react';
import { registerRootComponent } from 'expo';
import _layout from '@/app/(tabs)/_layout'; // Correct import path for layout

const App = () => {
  return <_layout />;
};

registerRootComponent(App);
