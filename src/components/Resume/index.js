import React from "react";
import { Page, Text, View, Document, Image, Font } from "@react-pdf/renderer";
import styles from "./styles";
import BasicInfo from "./BasicInfo";
import Skills from "./Skills";
import Education from "./Education";
import Address from "./Address";
import About from "./About";
import Experience from "./Experience";
// Create Document Component
Font.register({
  family: "Poppins",
  src: "/assets/fonts/popins.ttf",
});
Font.register({
  family: "Fredoka",
  src: "/assets/fonts/fredoka.ttf",
});
Font.register({
  family: "Roboto-Medium",
  src: "/assets/fonts/roboto-medium.ttf",
});
Font.register({
  family: "Roboto-Bold",
  src: "/assets/fonts/roboto-bold.ttf",
});
Font.registerHyphenationCallback((word) => [word]);
export default function MyDocument({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <BasicInfo data={data} />
          <About about={data.studentAbout} />
          <Education data={data} />
          <Address data={data} />
          {data.studentSkills.length>0&&(<Skills data={data.studentSkills}/>)}
          {data.studentExperience.length>0&&(<Experience data={data.studentExperience}/>)}
        </View>
      </Page>
    </Document >
  );
}
