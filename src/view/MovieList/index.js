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
        this.localList = ['大陆', '韩国', '日本', '欧美', '港台']
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
                <View style={{ width: 140, height: '100%', backgroundColor: '#202020' }}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={this.onBack}>
                        <Text style={{ color: '#707070', fontSize: 18 }}>返回</Text>
                    </TouchableOpacity>
                    {
                        this.localList.map((item) => {
                            return (
                                <TouchableOpacity onPress={() => this.onChangeLocal(item)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[{ color: '#707070', fontSize: 18 }, this.state.movieLocal === item? { color: '#dd9731', fontWeight: 'bold', fontSize: 20 } : {}]}>{item}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 10, paddingLeft: 20 }}>
                    {
                        this.state.movieList.map((item) => {
                            return (
                                <TouchableOpacity onPress={() => this.onDetail(item.id)} key={item.id} style={{ width: 140, height: 200, marginRight: 20, marginBottom: 20 }}>
                                    <Image style={{ width: '100%', height: '100%' }} source={{ uri: item.cover_path }} />
                                    <View style={{ position: 'absolute', bottom: 0, width: '100%', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                                        <View style={{ width: 100 }}>
                                            <Text numberOfLines={1} style={{ color: '#fff', fontSize: 16 }}>{item.name}</Text>
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