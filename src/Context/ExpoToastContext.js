import React from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';

const ExpoToastContext = ({ children }) => (
  <RootSiblingParent>{children}</RootSiblingParent>
);

export default ExpoToastContext;
