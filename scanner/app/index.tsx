import { CameraView, useCameraPermissions } from "expo-camera";
import { Stack } from "expo-router";
import React, { useRef, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { decryptData } from "./helpers";
import { styles } from "./styles";

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState("");
  const [scanActive, setScanActive] = useState(false);
  const cameraRef = useRef(null);

  const isPermissionGranted = Boolean(permission?.granted);

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