import React from 'react'
import { View } from 'react-native'
import VideoPlayer from 'react-native-video-controls'

class Video extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPaused: false,
            // videoPath: 'http://43.133.80.165:10009' + props.route.params.path.split(':')[1]
            // videoPath: 'http://43.133.250.37:10001/video/1/69/file.m3u8'
            videoPath: props.route.params.path
        }

        console.log(props.route.params)
    }

    render() {
        return (
            <View style={{ flex:1 }}>
                {
                    this.state.videoPath && (
                        <VideoPlayer    
                            onBack={() => {
                                this.props.navigation.goBack()
                            }}
                            maxBitRate={5000000000000}
                            source={{ uri: this.state.videoPath }}
                        />
                    )
                }
                

            </View>
        )
    }
}

export default Video