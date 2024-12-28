import React from 'react'
import { View } from 'react-native'
import background from '../assets/background.mp4'
import Orientation from 'react-native-orientation-locker';
import VideoPlayer from 'react-native-video-controls'

class Demo extends React.Component {
    constructor(props) {
        super(props)
        this.videoRef = React.createRef()
        this.state = {
            isPaused: false,
            videoPath: ''
        }
    }

    componentDidMount() {
        Http.get('/app/play', {
            params: {
                path: 'K:/video/42/60.mp4'
            }
        }).then((res) => {
           console.log(res)
           this.setState({
               videoPath: res.data
           })
        })
        Orientation.lockToLandscape()
    }

    componentWillUnmount() {
        Orientation.lockToPortrait()
    }

    onBuffer = (a) => {
        console.log('onBuffer', a)
    }

    onError = (a) => {
        console.log('onError', a)
    }

    render() {
        console.log(this.props)
        return (
            <View style={{ flex:1 }}>
                {
                    this.state.videoPath && (
                        <VideoPlayer    
                    onBack={() => {
                        this.props.navigation.goBack()
                    }}
                    source={this.state.videoPath}
                    tapAnywhereToPause={true}
                />
                    )
                }
                

            </View>
        )
    }
}

export default Demo