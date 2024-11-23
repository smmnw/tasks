import React from 'react';
import { Text } from 'react-native';

const Icon = ({ name, ...props }) => <Text {...props}>{name}</Text>;

export const MaterialIcons = Icon;
export const FontAwesome = Icon;
export const Ionicons = Icon;

export default Icon;