import React, {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import {View,Alert} from 'react-native'
import QRScannerView from '../component/QrView'
import services from '../Redux/Service/orderOfflineService';
export const QrCodeScreen = (props) => {
    const [isEnableScan, setIsEnableScan] = useState(true)
    const [isShowScanBar, setisShowScanBar] = useState(true)
    const [isInit, setIsInit] = useState(false)
    useEffect(() => {
        setIsInit(true)
        // NavigationUtil.navigate(SCREEN_ROUTER_APP.INPUT_QR_CODE)
    }, [])
    const onSuccess =async (e) => {
        if (!isEnableScan) return
        alert(JSON.stringify(e))
        // sheet.current.snapTo(0)
        setisShowScanBar(false)
        // handleOrderTable(e.data)
        const payload = {
            code: e.data
        }
       try {
           const res = await services.requestQrCode(payload)
            Alert.alert(
                'Thông báo',
                res.data.message,
                [{text: 'Đồng ý', onPress: () => {
                    setIsEnableScan(false)
                }}],
                {cancelable: false},
              );
       } catch (error) {
           
       }
        // callAPIHook({
        //     API: requestBookTableWithBarcode
        // })
    }
    return (
        <View style ={{flex:1}} >
            {isInit ? <QRScannerView
                isShowCorner={false}
                isShowScanBar={isShowScanBar}
                scanBarImage={require('../Theme/img/img_qr.png')}
                scanBarStyle={{ marginHorizontal: 1 }}
                // rectStyle={{ with: dimension.width }}
                onScanResult={onSuccess}
                cornerOffsetSize={0}
                /> : <View />}
        </View>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(QrCodeScreen)
