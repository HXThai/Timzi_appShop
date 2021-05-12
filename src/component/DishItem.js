import R from '@app/assets/R'




import React, { useEffect, useState } from 'react'
import { Animated, Dimensions } from 'react-native'
import { Platform } from 'react-native'
import { TouchableOpacity, Image } from 'react-native'
import { Text } from 'react-native'
import { View } from 'react-native'

import { connect } from 'react-redux'

const dimension = Dimensions.get('window');
const { width, height } = dimension;
interface DishItemProps {
    onPressSubtract?: (value) => void
    onPressAdd?: (value) => void;
    onPress?: (value) => void;
    onPressImage?: (value) => void;
    nameFood?: string;
    urlImage?: string,
    count?: number,
    money?: string;
    price_discount?: string;
    combo?: boolean;
    infoFood?: any,
    index?: any,
    txtStatus?: string,
}

export const txtStatus = (value) => {
    try {
      if (value.is_out_of_food == 1)
        return "TẠM HẾT"
      if (value.is_new == 1)
        return "MÓN MỚI"
      if (value.is_specialties == 1)
        return "ĐẶC SẢN"
      return " "
    } catch (error) {
      return "Lỗi"
    }
  
  
  }
export const DishItem = (props: DishItemProps) => {
    const checkComoboIos = (combo) => {
        if (!combo) return dimension.width * 0.32
        return dimension.width * 0.37
    }
    const checkComoboAndroid = (combo) => {
        if (!combo) return dimension.width * 0.37
        return dimension.width * 0.4
    }
    const isCombo = (combo) => {
        if (combo)
            if (Platform.OS == 'ios')
                return "25%"
            else return "21%"
        else
            if (Platform.OS == 'ios')
                return "23%"
            else return "18%"
    }
    return (
        <View>

            <TouchableOpacity
                onPress={() => {
                    props.onPress ? props.onPress(props.infoFood) : null
                    // NavigationUtil.navigate(SCREEN_ROUTER_APP.DETAIL_DISH) 
                }}
                style={{ backgroundColor: 'white', marginHorizontal: 10, paddingTop: 40, borderRadius: 10, height: Platform.OS == 'ios' ? checkComoboIos(!props.combo) : checkComoboAndroid(!props.combo), width: dimension.width * 0.37, }}>

                <View style={{ alignItems: 'center', flex: 1, }}>
                    <TouchableOpacity
                        onPress={() => { props.onPressImage ? props.onPressImage(props.infoFood) : null }}
                    >
                        <Image
                            source={props.urlImage ? { uri: props.urlImage } : require("../Theme/img/img_cafe.png")}
                            style={{
                                width: dimension.width * 0.3,
                                marginTop: -80, borderRadius: 10,
                                height: dimension.width * 0.2,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                backgroundColor: 'white',
                                elevation: 5,
                            }}
                        // resizeMode='contain'
                        >

                        </Image>
                    </TouchableOpacity>


                    <Animated.View style={{ width: 10, aspectRatio: 1, backgroundColor: 'red', position: "absolute", bottom: -100 }} />
                    <Text children={props.nameFood || 'Cà phê đen'} style={{ fontSize:13, color: '#4F4F4F', marginTop: "10%", textAlign: 'center', marginHorizontal: 6 }} numberOfLines={2} />
                    <Text children={props.price_discount || '75.000 đ'} style={{ fontSize:15, marginTop: "1%" }} />
                    {!props.combo && <>
                        <Text children={props.money || '100.000 đ'} style={{ marginTop: "1%", fontSize:13 }} />
                        <View style={{ height: 1, backgroundColor: 'black', marginTop: -9 }} >
                            <Text children={props.money} style={{ color: "white" }} />
                        </View>
                    </>}
                </View>
                <View style={{ borderTopWidth: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 6, borderColor:"gray", marginTop: 5 }}>
                    <TouchableOpacity
                        onPress={() => {
                            // checkAuth(() => {
                                if (props.onPressSubtract)
                                    props.onPressSubtract(props.infoFood)
                            // })
                            // props.onPressSubtract ? props.onPressSubtract(props.infoFood) : null
                        }}
                        style={{ backgroundColor: "red", padding: 8, borderRadius: 4, justifyContent: 'center', alignItems: 'center', }}>
                        <Image source={require("../Theme/img/img_cafe.png")} style={{ width: 10, aspectRatio: 1 }} resizeMode='contain' tintColor='black' />
                    </TouchableOpacity>
                    <Text children={props.count || 0} style={{ marginHorizontal: 10 }} />
                    <TouchableOpacity
                        onPress={() => {
                            // checkAuth(() => {
                                if (props.onPressAdd)
                                    props.onPressAdd(props.infoFood)
                            // })
                            // props.onPressAdd ? props.onPressAdd(props.infoFood) : null
                        }}
                        style={{ backgroundColor: "red", padding: 8, borderRadius: 4, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require("../Theme/img/img_cafe.png")} style={{ width: 10, aspectRatio: 1 }} tintColor='black' />
                    </TouchableOpacity>
                </View>

            </TouchableOpacity>
            {/* <View style={{ position: 'absolute', left: 30, top: isCombo(props.combo), alignItems: 'center' }} >
                <Text children={'ĐẶC SẢN'} style={{ backgroundColor: 'rgba(0,0,0,0.4)', paddingHorizontal: 4, color: 'white', borderRadius: 4, overflow: 'hidden' }} />
            </View> */}
            {
                !(props?.infoFood.is_new == 0 && props?.infoFood.is_specialties == 0 && props?.infoFood.is_out_of_food == 0) && <View style={{ position: 'absolute', left: 30, top: isCombo(props.combo), alignItems: 'center' }} >
                    <Text children={txtStatus(props?.infoFood) || 'ĐẶC SẢN'} style={{ backgroundColor: 'rgba(0,0,0,0.4)', paddingHorizontal: 4, color: 'white', borderRadius: 4, overflow: 'hidden' }} />
                </View>
            }
        </View >

    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(DishItem)
