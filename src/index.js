import React from 'react'
import { View, StyleSheet } from 'react-native'
import background from './assets/background.mp4'
import Orientation from 'react-native-orientation-locker';
import VideoPlayer from 'react-native-video-controls'
class App extends React.Component {
    constructor(props) {
        super(props)
        this.videoRef = React.createRef()
        this.state = {
            isPaused: false
        }
    }

    componentDidMount() {
        Orientation.lockToLandscape()
    }

    onBuffer = (a) => {
        console.log('onBuffer', a)
    }

    onError = (a) => {
        console.log('onError', a)
    }

    render() {
        return (
            <View style={{ flex:1 }}>
                <VideoPlayer 
                    source={background}
                    tapAnywhereToPause={true}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundVideo: {
     flex: 1,
    },
  });

export default App