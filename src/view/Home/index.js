import React from'react'
import { View, TouchableOpacity, Text, StatusBar, Image, StyleSheet } from'react-native'
import Orientation from 'react-native-orientation-locker';
import Http from '../../Http'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movieList: []
        }
    }

    componentDidMount() {
        Orientation.lockToLandscape()
        Http.get('/video/collection/list', {
            params: {
                page_num: 0,
                page_size: 5
            }
        }).then((res) => {
            console.log(res)
            this.setState({
                movieList: res.data.data
            })
        })
    }

    onMovieList = (type) => {
        this.props.navigation.navigate('MovieList', {
            movieListType: type
        }) 
    }

    onDetail = (id) => {
        this.props.navigation.navigate('Detail', { id })
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
                <StatusBar translucent={true} backgroundColor={'rgba(255, 255, 255, 0)'} barStyle={'light-content'}  />
                <View style={{  width: '100%', flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                {
                    this.state.movieList.map((item) => {
                        return (
                            <TouchableOpacity key={item.id} onPress={() => this.onDetail(item.id)} style={{ width: 140, height: 200 }}>
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
                </View>
                <View style={{ height: 80, width: '100%', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.onMovieList('电影')} style={styles.tab}>
                        <Image style={{ width: 26, height: 26, marginBottom: 3 }} source={require('../../assets/movie.png')}  />
                        <Text style={styles.tabText}>电影</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onMovieList('剧集')} style={styles.tab}>
                        <Image style={{ width: 34, height: 34 }} source={require('../../assets/episode.png')}  />
                        <Text style={styles.tabText}>剧集</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onMovieList('综艺')} style={styles.tab}>
                        <Image style={{ width: 38, height: 38 }} source={require('../../assets/variety.png')}  />
                        <Text style={styles.tabText}>综艺</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onMovieList('少儿')} style={styles.tab}>
                        <Image style={{ width: 30, height: 30 }} resizeMode={'contain'} source={require('../../assets/child.png')}  />
                        <Text style={styles.tabText}>少儿</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({ 
    tab: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#202020', 
        marginRight: 10
    },
    tabText: {
        color: '#929292',
        fontSize: 16,
        fontWeight: 'bold'
    }
    
})


export default Home
            

