import React from "react";

import { Text, View, StyleSheet } from "@react-pdf/renderer";
import List, { Item } from "./List";

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "coloumn",
    flexWrap: "wrap",
  },
  title: {
    fontSize: 14,
    fontFamily: 'Fredoka',
    textTransform: "uppercase",
  },
  heading: {
    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    marginTop: 10,
  },
  subHeading: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    marginTop: 6,
    display: 'flex',
    flexWrap: 'wrap'
  },
  text: {
    fontSize: 10,
    marginLeft: 4,
    color: "grey"
  },
  line: {
    backgroundColor: "#DFDFDF",
    height: 1,
    width: '100%'
  },
  educationBlk: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  educationInBlk1: {
    display: 'flex',
    flexDirection: 'column',
    flex: 2,
    flexWrap: 'wrap'
  },
  educationInBlk2: {
    display: 'flex',
    flexDirection: 'column',
    flex: 4,
    flexWrap: 'wrap'
  },
  miniHeading: {
    fontSize: 12,
    fontFamily: 'Poppins',
    display: 'flex',
    flexWrap: 'wrap'
  }
});

export default ({data}) => (
  <View style={styles.container}>
  <Text style={styles.title}>Experience</Text>
  <View style={styles.line}></View>
  {data.map((item)=>(
    
  <View style={styles.educationBlk}>
    <View style={styles.educationInBlk1}>
      <Text style={styles.heading}>{item.FromDate} - {item.ToDate.length<1?"Present":item.ToDate}</Text>
    </View>
    <View style={styles.educationInBlk2}>
      <Text style={styles.subHeading}>{item.JobTitle}</Text>
      <Text style={styles.miniHeading}>{item.CompanyName}</Text>
    </View>
  </View>
  ))}


</View>
);
