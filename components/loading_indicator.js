import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native'

export const LoadingIndicator = () => (
  <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
)

const styles = StyleSheet.create({
  loading: {
    flex: 1
  }
})