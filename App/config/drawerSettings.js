import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import { drawerStyles } from '../styles/drawerStyles';
import DrawerContent from '../components/DrawerContent';

export const drawerSettings = {
  type: 'static',
  content: <DrawerContent />,
  openDrawerOffset: 0.2,
  styles: drawerStyles,
  tapToClose: true,
  tweenHandler: Drawer.tweenPresets.parallax
};
