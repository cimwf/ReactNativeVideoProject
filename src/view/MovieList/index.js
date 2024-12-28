import React from'react'
import { View, Text, ScrollView, TouchableOpacity, Image } from'react-native'
import Http from '../../Http'

class MovieList extends React.Component {
    constructor(props) {
        super(props)
        this.movieListType = props.route.params.movieListType
        this.state = {
            movieList: [],
            movieLocal: '大陆'
        }
    }

    componentDidMount() {
        this.onGetMovieList(this.state.movieLocal)
    }   

    onGetMovieList = (local) => {
        Http.get('/video/collection/list', {
            params: {
                catregory: this.movieListType,
                local: local,
                page_num: 0,
                page_size: 1000
            }
        }).then((res) => {
            this.setState({
                movieList: res.data.data
            })
        })
    }

    onChangeLocal = (local) => {
        this.setState({
            movieLocal: local
        })
        this.onGetMovieList(local)
    }

    onBack = () => {
        this.props.navigation.goBack()
    }

    onDetail = (id) => {
        this.props.navigation.navigate('Detail', { id })
    }

    render() {
        return (
            <View style={{ flex:1, backgroundColor: '#000', flexDirection: 'row' }}>
                <View style={{ width: 80, height: '100%', backgroundColor: '#333' }}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={this.onBack}>
                        <Text style={{ color: '#fff', fontSize: 18 }}>返回</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onChangeLocal('大陆')} style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, this.state.movieLocal === '大陆' ? { backgroundColor: '#000' } : {} ]}>
                        <Text style={{ color: '#fff', fontSize: 18 }}>大陆</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onChangeLocal('韩国')} style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, this.state.movieLocal === '韩国' ? { backgroundColor: '#000' } : {} ]}>
                        <Text style={{ color: '#fff', fontSize: 18 }}>韩国</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onChangeLocal('日本')} style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, this.state.movieLocal === '日本' ? { backgroundColor: '#000' } : {} ]}>
                        <Text style={{ color: '#fff', fontSize: 18 }}>日本</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onChangeLocal('欧美')} style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, this.state.movieLocal === '欧美' ? { backgroundColor: '#000' } : {} ]}>
                        <Text style={{ color: '#fff', fontSize: 18 }}>欧美</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onChangeLocal('港台')} style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, this.state.movieLocal === '港台' ? { backgroundColor: '#000' } : {} ]}>
                        <Text style={{ color: '#fff', fontSize: 18 }}>港台</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', padding: 10 }}>
                    {
                        this.state.movieList.map((item) => {
                            return (
                                <TouchableOpacity onPress={() => this.onDetail(item.id)} key={item.id} style={{ width: 140, height: 200, marginRight: 10, marginBottom: 10 }}>
                                    <Image style={{ width: '100%', height: '100%' }} source={{ uri: item.cover_path }} />
                                    <View style={{ position: 'absolute', bottom: 0, width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ width: 100 }}>
                                            <Text numberOfLines={1} style={{ color: '#333', fontSize: 16 }}>{item.name}</Text>
                                        </View>
                                        {/* <Text style={{ color: 'gold', fontSize: 16, fontWeight: 'bold' }}>5.0</Text> */}
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}

export default MovieList