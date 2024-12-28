import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import Http from '../../Http'

class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movieDetail: null
        }
    }

    componentDidMount() {
        console.log(this.props.route.params)
        Http.get('/app/video/collection/detail', {
            params: {
                id: this.props.route.params.id
            }
        }).then((res) => {
            console.log(res)
           this.setState({
               movieDetail: res.data.data
           })
        })
    }

    onPlay = (path) => {
        this.props.navigation.navigate('Video', { path })
    }

    onBack = () => {
        this.props.navigation.goBack()
    }

    render() {
        if (!this.state.movieDetail) return null
        const { name, description, director, actors, type, local, year, play_list, cover_path } = this.state.movieDetail
        return (
            <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center' }}>
                <TouchableOpacity style={{ position: 'absolute', width: 50, height: 50, top: 50, left: 30 }} onPress={this.onBack} >
                    <Image style={{ width: '100%', height: '100%' }} source={require('../../assets/back.png')} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
                    <View style={{ width: 240, height: 140, marginRight: 20 }}>
                        <Image style={{ width: '100%', height: '100%' }} source={{ uri: cover_path }} />
                        <View style={{ position: 'absolute', width: '100%', bottom: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: 200 }}>
                                <Text numberOfLines={1} style={{ color: '#333', fontSize: 16 }}>{name}</Text>
                            </View>
                            {/* <Text style={{ color: 'gold', fontSize: 16, fontWeight: 'bold' }}>5.0</Text> */}
                        </View>
                    </View>
                    <View style={{ width: 240, height: 120 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold', marginRight: 10, marginBottom: 5 }}>导演</Text>
                            <Text style={{ fontSize: 16, color: '#fff' }}>{director.join(',')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold', marginRight: 10, marginBottom: 5 }}>主演</Text>
                            <Text style={{ fontSize: 16, color: '#fff' }}>{actors.join(',')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold', marginRight: 10, marginBottom: 5 }}>类型</Text>
                            <Text style={{ fontSize: 16, color: '#fff' }}>{type.join(',')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold', marginRight: 10, marginBottom: 5 }}>地区</Text>
                            <Text style={{ fontSize: 16, color: '#fff' }}>{local}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold', marginRight: 10 }}>年度</Text>
                            <Text style={{ fontSize: 16, color: '#fff' }}>{year}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ width: 500, marginTop: 5 }}>
                    <View style={{ width: '100%' }}>
                        <Text style={{ color: '#fff', fontSize: 16 }}>{description}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, flexWrap: 'wrap' }}>
                        {
                            play_list.map((item, index) => {
                                return (
                                    <TouchableOpacity onPress={() => this.onPlay(item.path)} key={ item.name + index } style={{ paddingHorizontal: 20, paddingVertical: 4, backgroundColor: 'rgba(255, 255, 255, 0.3)', justifyContent: 'center', alignItems: 'center', marginRight: 20, marginBottom: 10 }}>
                                        <Text style={{ color: '#fff', fontSize: 16 }}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        
                    </View>
                </View>
            </View>
        )
    }
}
export default Detail