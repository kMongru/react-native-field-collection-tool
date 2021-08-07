import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  Pressable,
  Modal,
  SafeAreaView,
  ScrollView,
} from 'react-native';

//useSelector for persistence, might need to add to the back button too
import { useSelector, useDispatch } from 'react-redux';
import * as surveyActions from '../../store/actions/survey';

import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

import Popup from '../../components/Popup';
import NextButton from '../../components/NextButton';
import Colors from '../../constants/Colors';
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../constants/Screen';

const CameraScreen = (props) => {
  //setting image roll to check for images, setImageRoll[0] = null
  const [imageRoll, setImageRoll] = useState([]);
  //to set up connection to the camera
  const [camera, setCamera] = useState(null);

  //for the transition
  const [isCompleted, setIsCompleted] = useState(false);

  //for the permisson to acess camera/gallery
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  //information header button
  const [informationModalVisible, setInformationModalVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    imageRoll[0] != null ? setIsCompleted(true) : setIsCompleted(false);
  }, [imageRoll]);

  //getting permission to use Camera
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  //allowing header component to interact with screen components
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => setInformationModalVisible(!informationModalVisible)}
        >
          <Image
            source={require('../../assets/info.png')}
            style={styles.informationLogo}
          />
        </Pressable>
      ),
    });
  }, [props.navigation]);

  //no permission handlers
  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera and gallery</Text>;
  }

  //taking up to 3 pictures
  const handlePicture = async () => {
    if (camera && imageRoll.length < 3) {
      const data = await camera.takePictureAsync(null);
      console.log(data.uri);
      //adding to the end of the array
      setImageRoll([...imageRoll, data.uri]);
      console.log(imageRoll);
    }
  };

  //getting an image from the users camera roll
  const pickImage = async () => {
    if (camera && imageRoll.length < 3) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        setImageRoll([...imageRoll, result.uri]);
      }
    }
  };

  //removes selected image from array
  const handleDeletedImage = (imageUri) => {
    setImageRoll((prev) => {
      const filteredArray = prev.filter((val, index) => val != imageUri);
      console.log(filteredArray);
      return filteredArray;
    });
  };

  const handleNavigation = () => {
    if (isCompleted) {
      //dispatch the action before navigating
      dispatch(
        surveyActions.addInformation({
          images: imageRoll,
        })
      );
      props.navigation.navigate('Location');
    }
  };

  return (
    // No safeAreaView because they camera should take up everything available
    <View style={styles.screen}>
      {/* Camera */}
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={StyleSheet.absoluteFill}
          type={Camera.Constants.Type.back}
        />
        <View style={styles.controlsContainer}>
          {/* Image Roll Button */}
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.stackContainer}>
              <Image
                source={require('../../assets/white_stack.png')}
                style={styles.stackImage}
              />
              {imageRoll[0] != null ? (
                <Text style={styles.pictureCounter}>{imageRoll.length}</Text>
              ) : (
                <Text style={styles.pictureCounter}>0</Text>
              )}
            </View>
          </TouchableOpacity>
          {/* Camera Button */}
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={handlePicture}
          ></TouchableOpacity>
          {/* Access users camera roll */}
          <TouchableOpacity
            onPress={() => {
              pickImage();
            }}
          >
            <Image
              source={require('../../assets/white_upload.png')}
              style={styles.uploadImage}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomCard}>
        <NextButton
          onPress={handleNavigation}
          isDisabled={!isCompleted}
          nextArrow={true}
        />
      </View>

      {/*Modal JSX, for image roll*/}
      <Modal
        animationType='slide'
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <SafeAreaView style={styles.modalScreen}>
          <Text style={styles.title}>Camera Roll</Text>
          <View style={styles.imageRollContainer}>
            <ScrollView horizontal={true}>
              {imageRoll &&
                imageRoll.map((imageUri, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <View style={styles.imageBackground}>
                        <Image
                          source={{ uri: imageUri }}
                          style={styles.images}
                        />
                      </View>
                      <TouchableOpacity
                        onPress={handleDeletedImage.bind(this, imageUri)}
                        style={styles.deleteContainer}
                      >
                        <Image
                          source={require('../../assets/red_trashcan.png')}
                          style={styles.deleteButton}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })}
            </ScrollView>
          </View>
          <View style={styles.closeButtonContainer}>
            <NextButton
              buttonName={'Close'}
              isDisabled={false}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </SafeAreaView>
      </Modal>
      {/* Information Popup broken */}
      {/* <Popup
        modalText={
          'You can click on the titles of each section, such as "Cultivar" for additional information!'
        }
        modalVisible={modalVisible}
        onPress={() => setModalVisible(!modalVisible)}
      /> */}
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: () => {
      return (
        //see offical npm docs for all information relationing to Dot props
        // <Dots
        //   length={3}
        //   active={1}
        //   activeDotHeight={15}
        //   activeDotWidth={15}
        //   activeColor={Colors.primaryGreen}
        //   passiveColor={Colors.backgroundGrey}
        // />
        <Text>Dots Placeholder</Text>
      );
    },
    headerTransparent: true,
    headerTintColor: Colors.white,
  };
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.backgroundGrey },
  informationLogo: {
    height: 30,
    width: 30,
    marginRight: 30,
    marginTop: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
  cameraContainer: {
    flex: 1,
  },
  cameraButton: {
    width: 75,
    height: 75,
    borderRadius: 40,
    borderWidth: 5,
    borderColor: Colors.white,
    marginBottom: 20,
  },
  controlsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  },
  stackContainer: { marginBottom: 20 },
  stackImage: {
    height: 30,
    width: 30,
  },
  pictureCounter: {
    fontSize: 18,
    textAlign: 'right',
    color: Colors.white,
  },
  uploadImage: {
    height: 30,
    width: 30,
    marginBottom: 38,
    borderRadius: 5,
  },
  imageRollContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    margin: 20,
    paddingHorizontal: 10,
  },
  modalScreen: {
    flex: 1,
    padding: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  imageView: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  images: {
    width: 300,
    height: 400,
  },
  imageBackground: {
    padding: 5,
    marginHorizontal: 20,
    backgroundColor: Colors.white,
  },
  deleteContainer: {
    width: 40,
    height: 40,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: Colors.darkRed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: 20,
    height: 20,
  },
  closeButtonContainer: {
    width: '100%',
  },
  bottomCard: {
    backgroundColor: Colors.background,
    width: DEVICE_WIDTH,
    height: 80,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 100,
  },
});

export default CameraScreen;
