import React, {useState} from 'react'
import { connect } from 'react-redux'
import {View} from 'react-native'
import QRScannerView from '../component/QrView'
export const QrCodeScreen = (props) => {
    const [isEnableScan, setIsEnableScan] = useState(true)
    const [isShowScanBar, setisShowScanBar] = useState(true)
    const onSuccess = (e) => {
        if (!isEnableScan) return
        // sheet.current.snapTo(0)
        setCode(e.data)
        setisShowScanBar(false)
        handleOrderTable(e.data)
        // callAPIHook({
        //     API: requestBookTableWithBarcode
        // })
    }
    return (
        <View style ={{flex:1}} >
            <QRScannerView
                    isShowCorner={false}
                    isShowScanBar={isShowScanBar}
                    scanBarImage={require('../Theme/img/img_qr.png')}
                    scanBarStyle={{ marginHorizontal: 1 }}
                    // rectStyle={{ with: dimension.width }}
                    onScanResult={onSuccess}
                    cornerOffsetSize={0}
                />
        </View>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(QrCodeScreen)
