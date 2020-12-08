import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Image, Text, ActivityIndicator, Platform, PermissionsAndroid } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import { RNS3 } from 'react-native-aws3';
import * as Progress from 'react-native-progress';
// var RNUploader = require('react-native-uploader');
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import Video from 'react-native-video';

const App = (props) => {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [videos, setVideos] = useState([]);
  const [hasPage, setHasPage] = useState([]);
  const [endCursor, setEndCursor] = useState([]);
  const [progress, setProgress] = useState(0.00);
  const [progressStatus, setProgressStatus] = useState(false);
  const [image, setImage] = useState();
  const [percentage, setPercentage] = useState('');
  const [uploadStatus, setUploadStatus] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  // const [imagePath, setImagePath] = useState('');
  // const [videoPath, setVideoPath] = useState('');
  const [imageName, setImageName] = useState('');
  const [videoName, setVideoName] = useState('');
  const [type, setType] = useState('');
  //const [progressStatus, setProgressStatus] = useState(false);


  _getVideos = async () => {
    console.log('ddd')
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      )

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setLoading(true);
        CameraRoll.getPhotos({
          first: 10,
          assetType: 'Videos',
          groupTypes: 'All'
        })
          .then(r => {
            console.log('Videos', r.edges)
            let listData = videos;
            let data = listData.concat(r.edges);

            setVideos(data);
            setHasPage(r.page_info.has_next_page);
            setEndCursor(r.page_info.end_cursor)
            setLoading(false);
          })
          .catch((err) => {
            // alert(err)
            console.log('error', err)
            setLoading(false);
          });
      } else {
        return false;
      }
    } else {
      setLoading(true);
      CameraRoll.getPhotos({
        first: 10,
        assetType: 'Videos',
        type: 'video'
      })
        .then(r => {
          console.log('Videos', r.edges)
          console.log('page', r.page_info)

          let listData = videos;
          let data = listData.concat(r.edges);

          setVideos(data);
          setHasPage(r.page_info.has_next_page);
          setEndCursor(r.page_info.end_cursor)
          setLoading(false);
        })
        .catch((err) => {
          alert(err)
          console.log('error', err)
          setLoading(false);
        });
    }
  }
  _getVideosLoadmore = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setLoadingMore(true);
        CameraRoll.getPhotos({
          first: 5,
          after: endCursor.toString(),
          assetType: 'Videos',
          groupTypes: 'All'
        })
          .then(r => {
            console.log('Videos', r.edges)
            let listData = videos;
            let data = listData.concat(r.edges);

            setVideos(data);
            setHasPage(r.page_info.has_next_page);
            setEndCursor(r.page_info.end_cursor)
            setLoadingMore(false);
          })
          .catch((err) => {
            alert(err)
            console.log('error', err)
            setLoadingMore(false);
          });
      } else {
        return false;
      }
    } else {
      setLoadingMore(true);
      CameraRoll.getPhotos({
        first: 5,
        after: endCursor.toString(),
        assetType: 'Videos',
      })
        .then(r => {
          console.log('Videos', r.edges)
          console.log('page', r.page_info)

          let listData = videos;
          let data = listData.concat(r.edges);

          setVideos(data);
          setHasPage(r.page_info.has_next_page);
          setEndCursor(r.page_info.end_cursor)
          setLoadingMore(false);
        })
        .catch((err) => {
          alert(err)
          console.log('error', err)
          setLoadingMore(false);
        });
    }
  }
  openGallery = (type) => {
    setType(type)
    setPercentage('');
    //setImageUrl('');
    ImagePicker.openPicker({
      mediaType: type,
      // compressVideo: false,
      compressVideoPreset: "HighestQuality",
      smartAlbums: type == 'video' ? ['Videos'] : ['UserLibrary','PhotoStream','Panoramas','Screenshots','Generic'],
      //compressVideoPreset: 'nil'
    }).then((video) => {
      console.log('videeos', video);
      setImage(video)
      let path = Platform.OS === 'ios' ? video.sourceURL : video.path;
      var filename = Platform.OS === 'android' ? video.path.substr(video.path.lastIndexOf('/') + 1) : video.filename;
      //setImagePath(path);
      setUploadStatus(true)
      if (type == 'photo') {
        setImageName(filename)
      } else {
        setVideoName(filename)
      }
    });
  }


  uploadToS3 = (item) => {
    //setProgress(0.00)
    setProgressStatus(true)
    console.log('file', image);
    //var regex = /:\/\/(.{36})\//i;
    //var result = item.node.image.uri.match(regex);
    // video.node.image.uri.substr(video.node.image.uri.lastIndexOf('/') + 1);
    var filename = Platform.OS === 'android' ? image.path.substr(image.path.lastIndexOf('/') + 1) : image.filename;
    var rand = Math.floor(Math.random() * 100);
    const file = {
      // `uri` can also be a file system path (i.e. file://)
      // uri: "assets-library://asset/asset.PNG?id=655DBE66-8008-459C-9358-914E1FB532DD&ext=PNG",
      // uri: Platform.OS === 'ios' ? 'assets-library://asset/asset.MOV?id=' + result[1] + '&ext=MOV' : item.node.image.uri,
      uri: Platform.OS === 'ios' ? image.sourceURL : image.path,
      name: filename,
      // type: "image/png"
      type: image.mime
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
    //setProgress(0.01)
    RNS3.put(file, options).progress((e) =>
      //console.log(Math.round((e.loaded / e.total)*100)/100),
      //setProgress(Math.round((e.loaded / e.total) * 100) / 100)
      //console.log('percentage',percentage)
      setPercentage(Math.round((e.loaded / e.total) * 100)),
      setUploadStatus(false)
    ).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
      console.log(response.body);
      setProgressStatus(false)
      //alert(response.body.postResponse.location);
      if(type == 'photo'){
      setImageUrl(response.body.postResponse.location)
      }else{
        let ff = Platform.OS === 'ios' ? image.sourceURL : image.path
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
    //_getVideos();
    return () => {
      console.log("This will be logged on unmount");
    }
  }, []);

  selectCurrentVideo = async (video) => {
    console.log('video', video)
    //const album = await getAsyncstore(ALBUM_KEY);
    if (Platform.OS === 'android') {
      var fileExt = video.node.image.uri.substr(video.node.image.uri.lastIndexOf('.') + 1);
      var filename = video.node.image.uri.substr(video.node.image.uri.lastIndexOf('/') + 1);
      var filename = video.node.image.uri.substr(video.node.image.uri.lastIndexOf('/') + 1);
      var size = video.node.image.fileSize ? video.node.image.fileSize : 0;
    } else {
      var fileExt = video.node.image.filename.substr(video.node.image.filename.lastIndexOf('.') + 1);
      var filename = video.node.image.filename;
      var size = video.node.image.fileSize;
    }
    console.log('filename', filename)
    // var fileExt = video.node.image.filename.substr(video.node.image.filename.lastIndexOf('.') + 1);
    // var fileExt = video.node.image.uri.substr(video.node.image.uri.lastIndexOf('.') + 1);
    const { type } = props.route.params;
    let uri = video.node.image.uri;

    if (props.route.params.type === 'photos') {
      let selectedFile = {
        fileName: filename,
        uri: video.node.image.uri,
        //type: getMimeType(fileExt),
        fileSize: video.node.image.fileSize
      }
      // props.navigation.navigate('AlbumData', {
      //     album,
      //     selectedFile,
      //     openUploadModel: true
      // })
    } else {
      // const localfile = new LocalfileSchema(
      //     filename,
      //     uri,
      //     uri,
      //     getMimeType(fileExt),
      //     'Photo',
      //     size,
      //     0
      // );
      props.navigation.navigate('UploadFile', { file: localfile, isFromPF: false })
    }
  }


  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={_getVideosLoadmore}
          //On Click of button load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {loadingMore ? (
            <ActivityIndicator
              color="white"
              style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  const ItemView = (video) => {
    console.log('items', video.item);
    //return false;
    return (
      <View style={[styles.flexColsGallery, styles.flexCol3Gallery]} >
        {/* <TouchableOpacity onPress={() => selectCurrentVideo(video.item)} activeOpacity={0.5}>
                    <Image
                        source={{ uri: video.item.node.image.uri }}
                        style={{ width: 115, height: 100 }}
                    />
                </TouchableOpacity> */}

        <TouchableOpacity onPress={() => uploadToS3(video.item)} activeOpacity={0.5}>
          <Image
            source={{ uri: video.item.node.image.uri }}
            style={{ width: 115, height: 100 }}
          />
        </TouchableOpacity>

      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* {loading && <Loader />} */}

      <View style={{ height: '40%', width: '98%', marginHorizontal: '1%', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'grey', backgroundColor: '#ebebeb' }}>
        {videoUrl ? <Image
          style={{ height: 150, width: 300 }}
          source={{
            uri: videoUrl,
          }}
        /> : <View><Text>{videoName}</Text></View>}


{videoUrl ? <Video source={{uri: videoUrl}}   // Can be a URL or a local file.
                               // Store reference
                    // Callback when video cannot be loaded
       style={styles.backgroundVideo} /> : null}

        {videoUrl ? <View style={{position:'absolute'}}><Image
          style={{ height: 50, width: 50 }}
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe7Hr9QS5n54U0s9jhn4NxLWQ2bTEZgO44rA&usqp=CAU',
          }}
        /></View> : null}

        {/* {videoName ? <View><Text>{videoName}</Text></View> : null} */}
        
        <TouchableOpacity onPress={() => openGallery('video')} activeOpacity={1}>
          <Text style={{ paddingTop: 20 }}>Select Video</Text>
        </TouchableOpacity>

        {/* {uploadStatus && <TouchableOpacity onPress={() => uploadToS3()} activeOpacity={1}>
          <Text style={{ paddingTop: 20 }}>Upload Video</Text>
        </TouchableOpacity>} */}

      </View>

      <View style={{ height: 5, backgroundColor: 'white' }}></View>

      <View style={{ height: '40%', width: '98%', marginHorizontal: '1%', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'grey', backgroundColor: '#ebebeb' }}>
        {imageUrl ? <Image
          style={{ height: 150, width: 300 }}
          source={{
            uri: imageUrl,
          }}
        /> : <View><Text>{imageName}</Text></View>}

        {/* {imageName ? <View><Text>{imageName}</Text></View> : null} */}
        <TouchableOpacity onPress={() => openGallery('photo')} activeOpacity={1}>
          <Text style={{ paddingTop: 20 }}>Select Photo</Text>
        </TouchableOpacity>
        {/* {uploadStatus && <TouchableOpacity onPress={() => uploadVideo()}>
        <Text style={{ paddingTop: 20 }}>upload Video To Local Server</Text>
      </TouchableOpacity>} */}

        {/* {uploadStatus && <TouchableOpacity onPress={() => uploadToS3()} activeOpacity={1}>
          <Text style={{ paddingTop: 20 }}>Upload Photo</Text>
        </TouchableOpacity>} */}

      </View>
      <View style={{ height: '20%', justifyContent: 'center', alignItems: 'center', width: '50%' }}>
        {uploadStatus && <View style={{ borderRadius: 20, backgroundColor: 'grey', width: '50%', borderColor: 'grey', borderWidth: 1, height: 40, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => uploadToS3()} activeOpacity={1}>
            <Text style={{ color: 'white' }}>Upload</Text>
          </TouchableOpacity>
        </View>}
        {progressStatus && <Text>Progress {percentage} %</Text>}

      </View>
      {/* {progressStatus && <Text>Progress {percentage} %</Text>} */}
      {/* {imageUrl ? <View><Text>{imageUrl}</Text></View> : null} */}
      {/* <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, backgroundColor: '#E6E6E6', width: '100%' }}>
        <Text style={{ textAlign: 'center', paddingLeft: 170 }}>Photos</Text>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Text style={{ paddingLeft: 100, color: 'blue', fontWeight: '200' }}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <View>
       {progressStatus && <Progress.Circle size={40} progress={progress} showsText={true} />}
      </View>
      <View style={[styles.containerFill, { marginTop: 8 }]}>
        {videos.length > 0 ?
          <FlatList
            data={videos}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            enableEmptySections={true}
            renderItem={ItemView}
            numColumns={3}
            //initialNumToRender={10}
            //ListFooterComponent={renderFooter}
          /> : <Text></Text>}
      </View> */}

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