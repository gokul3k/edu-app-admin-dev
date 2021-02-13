import React from 'react';

import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "coloumn",
    flexWrap: "wrap",
  },
  name: {
    fontSize: 11,
  },
  email: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium'
  },
  phone: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium'
  },
  title: {
    fontFamily: 'Fredoka',
    fontWeight: 'bold',
    fontSize: 24
  },
  subHeading: {
    fontFamily: 'Roboto-Bold',
    fontSize: 14
  },
  viewGroup: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  }
});

export default ({ data }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{data.studentInfo.FullName}</Text>
    <View style={styles.viewGroup}>
      <Text style={styles.subHeading}>Email </Text>
      <Text style={styles.email}>{data.credDetails.Email}</Text>
    </View>
    <View style={styles.viewGroup}>
      <Text style={styles.subHeading}>Phone </Text>
      <Text style={styles.phone}>{data.addrDetails.PhoneNo}</Text>
    </View>
  </View>
);