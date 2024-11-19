import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Video from 'react-native-video'
import background from './assets/background.mp4'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.videoRef = React.createRef()
    }

    onBuffer = (a) => {
        console.log('onBuffer', a)
    }

    onError = (a) => {
        console.log('onError', a)
    }

    render() {
        return (
            <View>
                <Text>Hello world</Text>
                <Video 
                    // Can be a URL or a local file.
                    source={background}
                    // Store reference  
                    ref={this.videoRef}
                    // Callback when remote video is buffering                                      
                    onBuffer={this.onBuffer}
                    // Callback when video cannot be loaded              
                    onError={this.onError}               
                    style={styles.backgroundVideo}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });

export default App