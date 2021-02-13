import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#fff",
    padding:32,
    fontFamily:'Poppins'
  },

  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
      width:150,
      height:150,
    marginBottom: 10,
  },
  leftColumn: {
    flexDirection: "column",
    width: 170,
    paddingRight: 15,
  },
  rightColumn: {
      flex:1,
      paddingLeft: 15,
      flexDirection:"column"
  }
});

export default styles;
