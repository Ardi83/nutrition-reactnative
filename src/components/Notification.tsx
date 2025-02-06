// components/Notification.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NotifyType} from '../types/index.d';

const Notification = ({
  notification,
}: {
  notification: {type: NotifyType; message: string};
}) => {
  // Determine the style based on the type
  const {type, message} = notification;
  const getNotificationStyle = () => {
    switch (type) {
      case NotifyType.Error:
        return styles.error;
      case NotifyType.Success:
        return styles.success;
      case NotifyType.Warning:
        return styles.warning;
      default:
        return styles.info;
    }
  };

  return (
    <View style={[styles.notification, getNotificationStyle()]}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  notification: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    backgroundColor: '#ff4444',
  },
  success: {
    backgroundColor: '#00C851',
  },
  warning: {
    backgroundColor: '#ffbb33',
  },
  info: {
    backgroundColor: '#33b5e5',
  },
  message: {
    color: '#ffffff',
    fontSize: 14,
  },
});

export default Notification;
