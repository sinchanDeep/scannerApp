import React, { useState, useRef } from "react";
import { View, Text, Button, StyleSheet, Pressable } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState("");
  const [scanActive, setScanActive] = useState(false);
  const cameraRef = useRef(null);

  const isPermissionGranted = Boolean(permission?.granted);

  const decryptData = (data) => {
    return "decrypted data";
  }

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (!scanned) {
      setScanned(true);
      setScanActive(false); 
      const decryptedData = decryptData(data);
      setData(decryptedData);
    }
  };

  const handleStartScan = async () => {
    if (!isPermissionGranted) {
      await requestPermission();
    } else {
      setData("");
      setScanned(false);
      setScanActive(true);
    }
  };

  const handleCloseCamera = () => {
    setScanActive(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen options={{ title: "overview", headerShown: false }} />

      <Text style={styles.title}>QR Code Scanner</Text>

      <View style={styles.container}>
        {scanActive ? (
          <View style={styles.cameraContainer}>
            <CameraView
              ref={cameraRef}
              style={StyleSheet.absoluteFillObject}
              facing="back"
              onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
              barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            />

            <Pressable style={styles.backButton} onPress={handleCloseCamera}>
              <Text style={styles.backText}>← Back</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.resultContainer}>
            {scanned && data ? (
              <>
                <Text style={styles.resultText}>Scanned Data:</Text>
                <Text style={styles.dataText}>{data}</Text>
                <Button title="Scan Again" onPress={handleStartScan} />
              </>
            ) : (
              <Button title="Scan QR Code" onPress={handleStartScan} />
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
