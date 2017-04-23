import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import { drawerStyles } from '../styles/drawerStyles';

export const drawerSettings = {
  type: 'static',
  openDrawerOffset: 0.2,
  styles: drawerStyles,
  tapToClose: true,
  tweenHandler: Drawer.tweenPresets.parallax
};
