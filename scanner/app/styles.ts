import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    //backgroundColor : "#D3D3D3"
  },
cameraContainer: {
  width: 300,          
  height: 500,         
  borderRadius: 20,    
  overflow: "hidden",  
  alignSelf: "center", 
  marginVertical: 20,  
  backgroundColor: "#000", 
},
  resultContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  dataText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
