import React, { useEffect, useState } from "react";
import { StyleSheet, Image, FlatList, Button } from "react-native";
import * as FileSystem from "expo-file-system";
import singleFileUploader from "single-file-uploader";

function ImageScreen() {
  const [imagesURI, setImagesURI] = useState([]);

  useEffect(() => {
    (async () => {
      const images = await FileSystem.readDirectoryAsync(
        FileSystem.cacheDirectory + "ImageManipulator"
      );
      setImagesURI(images);
    })();
  }, []);

  return imagesURI.length > 0 ? (
    <FlatList
      data={imagesURI}
      keyExtractor={(imageURI) => imageURI}
      renderItem={(itemData) => {
        console.log("item", itemData);
        return (
          <>
          <Image
            style={styles.image}
            source={{
              uri:
                FileSystem.cacheDirectory + "ImageManipulator/" + itemData.item,
            }}
          />
          <Button
              title="upload"
              onPress={async () => {
                try {
                  await singleFileUploader({
                    distantUrl:
                      "https://wildstagram.nausicaa.wilders.dev/upload",
                    filename: itemData.item,
                    filetype: "image/jpeg",
                    formDataName: "fileData",
                    localUri:
                      FileSystem.cacheDirectory +
                      "ImageManipulator/" +
                      itemData.item,
                  });
                  alert("Image Uploadé");
                } catch (err) {
                  alert("Error");
                }
              }}
            />
            </>
        );
      }}
    />
  ) : null;
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    height: 500,
  },
});

export default ImageScreen;
