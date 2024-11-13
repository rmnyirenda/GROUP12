// Scan.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

type ScanProps = {
  scanned: boolean;
  setScanned: (scanned: boolean) => void;
  onBarCodeScanned: (data: string) => void;
  data: string;
};

const Scan: React.FC<ScanProps> = ({ scanned, setScanned, onBarCodeScanned, data }) => {
  return (
    <View style={styles.container}>
      {!scanned ? (
        <BarCodeScanner onBarCodeScanned={({ data }) => onBarCodeScanned(data)} style={StyleSheet.absoluteFillObject} />
      ) : (
        <View style={styles.buttonContainer}>
          <Text>Scanned Data: {data}</Text>
          <TouchableOpacity onPress={() => setScanned(false)} style={styles.button}>
            <Text style={styles.buttonText}>Scan Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  buttonContainer: { alignItems: 'center', marginTop: 50 },
  button: { backgroundColor: '#4285F4', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 30, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default Scan;
