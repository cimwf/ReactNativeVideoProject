import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Orientation from 'react-native-orientation-locker';
import DeviceInfo from 'react-native-device-info';
import Http from '../../Http';
const UserList = [
    '0002202501121948415139',
    '0002202501121948425382',
    '0002202501121948429823',
    '0002202501121948420824'
]

class Verify extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: UserList[2]
        }
        this.numberKeyboard = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'del']
    }

    componentDidMount() {
        Orientation.lockToLandscape()
        this.onVerifyUser()
    }

    onVerifyUser = async (code) => {
        const UniqueId = await DeviceInfo.getUniqueId()
        const Manufacturer = await DeviceInfo.getManufacturer()
        const IpAddress = await DeviceInfo.getIpAddress()
        console.log('******onVerifyUser*****')
        console.log(UniqueId)
        console.log(Manufacturer)
        console.log(IpAddress)
        Http.get('/app/get_user_permission', {
            user_id: code,
            mac: UniqueId
        }).then(res => {
            console.log('***********')
            console.log(res)
            if (res.data.data.is_vip) {
                console.log('user is vip')
                this.props.navigation.navigate('Home')
            }
        })
    }

    onBindingUser = () => {
        if (!this.state.value) return
        this.onVerifyUser(this.state.value)
    }

    onPressKeyboard = (item) => {
        if (item === 'del') {
            this.setState({
                value: this.state.value.slice(0, this.state.value.length - 1)
            })
        } else {
            this.setState({
                value: this.state.value + item
            })
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#000' }}>
                <View style={{ height: 50, flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ height: '100%', width: 100, justifyContent: 'center', alignItems: 'flex-end', paddingRight: 10 }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>会员码:</Text>
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#111922', justifyContent: 'center', paddingLeft: 10 }}>
                        {
                            !!this.state.value 
                            ? <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>{this.state.value}</Text>
                            : <Text style={{ color: '#999', fontSize: 14 }}>请输入会员码</Text>
                        }
                        
                    </View>
                    <View style={{ height: '100%', width: 100, justifyContent: 'center' }}>
                        <TouchableOpacity 
                            onPress={this.onBindingUser}
                            style={{ width: 50, height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0065f4', borderRadius: 8, marginLeft: 10 }}
                        >
                            <Text style={{ color: '#fff', fontSize: 16 }}>确认</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ width: '100%', height: 60, bottom: 10, position: 'absolute', flexDirection: 'row', paddingLeft: 10 }} >
                    {
                        this.numberKeyboard.map(item => {
                            return (
                                <TouchableOpacity onPress={() => this.onPressKeyboard(item)} style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginRight: 10, borderRadius: 4 }}>
                                    <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#000' }}>{item}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                    
                </View>
            </View>
        )
    }
}

export default Verify