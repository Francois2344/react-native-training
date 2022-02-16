import React, {useState, useEffect, useRef} from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Camera } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";


function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <>
      <Camera style={styles.camera} ref={cameraRef} />
      <Button
        title="Press me"
        onPress={async () => {
          const pictureMetadata = await cameraRef.current.takePictureAsync();
          console.log("pictureMetadata", pictureMetadata);
          console.log(
            await ImageManipulator.manipulateAsync(pictureMetadata.uri, [
              { resize: { width: 800 } },
            ])
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
});

export default CameraScreen;
