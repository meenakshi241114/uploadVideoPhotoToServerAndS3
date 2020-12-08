import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Image, Text, ActivityIndicator, Platform, PermissionsAndroid } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import { RNS3 } from 'react-native-aws3';
import * as Progress from 'react-native-progress';
// var RNUploader = require('react-native-uploader');
// import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import Video from 'react-native-video';
import ImagePicker from 'react-native-image-picker';



const App = (props) => {
  const [progressStatus, setProgressStatus] = useState(false);
  const [image, setImage] = useState();
  const [percentage, setPercentage] = useState('');
  const [uploadStatus, setUploadStatus] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [imageName, setImageName] = useState('');
  const [videoName, setVideoName] = useState('');
  const [type, setType] = useState('');

  openGallery = (type) => {
    setType(type)
    setPercentage('');
    const options = {
      title: 'Select Avatar',
      mediaType: type,
      //customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      setImage(response)
      setUploadStatus(true)
      var filename = Platform.OS === 'android' ? response.path.substr(response.path.lastIndexOf('/') + 1) : response.fileName;
      if (type == 'photo') {
        setImageName(filename)
      } else {
        setVideoName(filename)
      }
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
     
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
     
        // this.setState({
        //   avatarSource: source,
        // });
      }
    });


    
    // setType(type)
    // setPercentage('');
    // //setImageUrl('');
    // ImagePicker.openPicker({
    //   mediaType: type,
    //   // compressVideo: false,
    //   compressVideoPreset: "HighestQuality",
    //   smartAlbums: type == 'video' ? ['Videos'] : ['UserLibrary', 'PhotoStream', 'Panoramas', 'Screenshots', 'Generic'],
    //   //compressVideoPreset: 'nil'
    // }).then((video) => {
    //   console.log('videeos', video);
    //   setImage(video)
    //   let path = Platform.OS === 'ios' ? video.sourceURL : video.path;
    //   var filename = Platform.OS === 'android' ? video.path.substr(video.path.lastIndexOf('/') + 1) : video.filename;
    //   //setImagePath(path);
    //   setUploadStatus(true)
    //   if (type == 'photo') {
    //     setImageName(filename)
    //   } else {
    //     setVideoName(filename)
    //   }
    // });
  }


  uploadToS3 = (item) => {
    setProgressStatus(true)
    console.log('file', image);
     var filename = Platform.OS === 'android' ? image.path.substr(image.path.lastIndexOf('/') + 1) : image.fileName;
   // var filename = image.fileName;
    const file = {
      uri: Platform.OS === 'ios' ? image.uri : image.uri,
      name: filename,
      // type: "image/png"
      type: image.type ? image.type : 'video/mp4'
    }
    console.log('file', file)
    const options = {
      keyPrefix: "pfv2test/app/",
      bucket: "cairs",
      region: "us-east-1",
      accessKey: "AKIA5RNAXQTAEAU2Y5PD",
      secretKey: "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",
      successActionStatus: 201
    }

    RNS3.put(file, options).progress((e) =>
      setPercentage(Math.round((e.loaded / e.total) * 100)),
      setUploadStatus(false)
    ).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      console.log(response.body);
      setProgressStatus(false)

      if (type == 'photo') {
        setImageUrl(response.body.postResponse.location)
      } else {
        let ff = Platform.OS === 'ios' ? image.uri : image.uri
        setVideoUrl(ff)
      }
      alert(response.body.postResponse.location)
    });
  }

  uploadVideo = () => {
    let formdata = new FormData();
    var filename = Platform.OS === 'android' ? image.path.substr(image.path.lastIndexOf('/') + 1) : image.filename;
    formdata.append("file", { uri: Platform.OS === 'ios' ? image.sourceURL : image.path, name: filename, type: image.mime })
    console.log('form data', formdata)
    setProgressStatus(true);
    axios({
      url: 'https://testapi.parentfinder.com/api/File',
      method: 'POST',
      data: formdata,
      timeout: 60 * 30 * 1000,
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyand0IjoiNWYwYmE3MjM3MTkxMzM2ZDlmNzA0NDQxXzA6WTc2SW1sa1BYbUwiLCJkYXRhVG9rZW4iOnsidXNlciI6eyJfaWQiOiI1ZjBiYTcyMzcxOTEzMzZkOWY3MDQ0NDEifX0sImlhdCI6MTYwNTc1NjkyOX0.moHu6VrmW0_hBhCxRMKREOuMo3BlI04CKfsdwgc_S-0',
      },

      onUploadProgress: function (progressEvent) {
        //console.log('progress',progressEvent)
        let percentage = (progressEvent.loaded / progressEvent.total) * 100;
        console.log('percentage', percentage)
        setPercentage(Math.round(percentage))
        setUploadStatus(false);
        if (percentage == 100) {
          alert('File uploaded');
        }
        // Do whatever you want with the native progress event
      },
    })
      .then(function (response) {
        console.log("response :", response);
      })
      .catch(function (error) {
        console.log("error from image :", error.response);
      })
  }

  useEffect(() => {
    return () => {
      console.log("This will be logged on unmount");
    }
  }, []);


  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <View style={{ height: '40%', width: '98%', marginHorizontal: '1%', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'grey', backgroundColor: '#ebebeb' }}>
        {videoUrl ? <Image
          style={{ height: 150, width: 300 }}
          source={{
            uri: videoUrl,
          }}
        /> : <View><Text>{videoName}</Text></View>}


        {/* {videoUrl ? <Video source={{ uri: videoUrl }}   // Can be a URL or a local file.
          style={styles.backgroundVideo} /> : null} */}

        {videoUrl ? <View style={{ position: 'absolute' }}><Image
          style={{ height: 50, width: 50 }}
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe7Hr9QS5n54U0s9jhn4NxLWQ2bTEZgO44rA&usqp=CAU',
          }}
        /></View> : null}

        <TouchableOpacity onPress={() => openGallery('video')} activeOpacity={1}>
          <Text style={{ paddingTop: 20 }}>Select Video</Text>
        </TouchableOpacity>

      </View>
      <View style={{ height: 5, backgroundColor: 'white' }}></View>

      <View style={{ height: '40%', width: '98%', marginHorizontal: '1%', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'grey', backgroundColor: '#ebebeb' }}>
        {imageUrl ? <Image
          style={{ height: 150, width: 300 }}
          source={{
            uri: imageUrl,
          }}
        /> : <View><Text>{imageName}</Text></View>}

        <TouchableOpacity onPress={() => openGallery('photo')} activeOpacity={1}>
          <Text style={{ paddingTop: 20 }}>Select Photo</Text>
        </TouchableOpacity>

      </View>
      <View style={{ height: '20%', justifyContent: 'center', alignItems: 'center', width: '50%' }}>
        {uploadStatus && <View style={{ borderRadius: 20, backgroundColor: 'grey', width: '50%', borderColor: 'grey', borderWidth: 1, height: 40, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => uploadToS3()} activeOpacity={1}>
            <Text style={{ color: 'white' }}>Upload</Text>
          </TouchableOpacity>
        </View>}
        {progressStatus && <Text>Progress {percentage} %</Text>}

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    marginBottom: 30,
    backgroundColor: 'grey',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  btnVideoproject: {
    width: '100%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    lineHeight: 70,
    fontSize: 18,
    borderRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    paddingVertical: 25,
    shadowOffset: { width: 0, height: 0, },
    shadowColor: '#000',
    shadowOpacity: .2,
    flex: 1
  },

  emptyNotification: {
    textAlign: 'center',
    opacity: 0.6,
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 100
  },

  btnVideoProjectText: {
    fontSize: 18,
    paddingLeft: 10,
    color: '#3b4955',
    paddingLeft: 8,
    position: 'relative',
    top: -2,
    textTransform: 'uppercase',
    fontWeight: '500'
  },

  videoThumb: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 2
  },
  backgroundVideo: {
    position: 'absolute',
    top: 20,
    left: 20,
    bottom: 40,
    right: 20,
  },

  videoTitle: {
    fontSize: 14,
    padding: 5,
    height: 45
  },
  wrapperCenter: {
    backgroundColor: 'rgba(0,0,0,0.95)',
    height: 100
  },
  flexColsGallery: {
    marginBottom: 2,
    alignSelf: 'stretch',
  },
  flexCol3Gallery: {
    width: '31%',
    marginHorizontal: '1%'

  },
  containerFill: {
    backgroundColor: '#fff',
    borderRadius: 10,
    // minHeight: Device.height - 200
  },
});

export default App;