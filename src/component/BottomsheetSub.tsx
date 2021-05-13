

import React from 'react';
import { Text, Image } from 'react-native';
import { FlatList } from 'react-native';
import { Modal } from 'react-native';
import { TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { Animated } from 'react-native';
import { View } from 'react-native';

import { connect } from 'react-redux';
import reactotron from 'reactotron-react-native';
import { CALCULATION } from '../Constants/Constant';


const dimension = Dimensions.get('window');
const { width, height } = dimension;
// import moduleName from 'react-naitve-mo'
interface BottomsheetSubProps {
    backgroundColor?: string;
    data?: any;
    isRequest?: boolean;
    onPressClose?: (data) => void;
    onPressSubCount?: (data) => void;
    onPressAddCount?: (data) => void;
}
export const BottomsheetSub = (props: BottomsheetSubProps) => {
    reactotron.log(props.data)
    const renderItem = ({ item, index }) => {
        const itemCard = { item, index }
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    paddingVertical: 10,
                    alignItems: 'center',
                    paddingHorizontal: 5
                }}
            >
                <Image source={require("../Theme/img/ic_checktopping.png")} style={{ width: 30, aspectRatio: 1 }} />
                <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text children={props.data.itemfood.name || 'Cơm rang dưa bò'} style={{ fontSize: 14 }} />
                    <Text children='Mô tả' style={{ fontSize: 12 }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => props.onPressSubCount ? props.onPressSubCount({ itemCard, itemFood: props.data, type: CALCULATION.SUBTRACTION }) : null}
                        style={{ backgroundColor: "green", padding: 10, marginHorizontal: 5, borderRadius: 5 }}
                    >
                        <Image source={require("../Theme/img/ic_sub.png")} style={{ width: 10, aspectRatio: 1 }} resizeMode='contain' tintColor='black' />
                    </TouchableOpacity>
                    <Text children={item.quantity.toString() ||"Chưa cập nhật"} style={{ fontSize: 15 }} />
                    <TouchableOpacity
                        onPress={() => props.onPressAddCount ? props.onPressAddCount({ itemCard, itemFood: props.data, type: CALCULATION.ADD }) : null}
                        style={{ backgroundColor: "green", padding: 10, marginHorizontal: 5, borderRadius: 5 }}
                    >
                        <Image source={require("../Theme/img/ic_add.png")} style={{ width: 10, aspectRatio: 1 }} tintColor='black' />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    //   if(props.data?.itemfood.card) return null
    return (
        <Animated.View
            style={{
                height: dimension.height,
                backgroundColor: props.backgroundColor,
                paddingTop: dimension.height * 0.6,
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.4
            }}
        >

            <View style={{ flex: 1, backgroundColor: 'white' }}>


                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: "gray", alignItems: 'center', paddingVertical: 6, marginHorizontal: 10 }}>

                    <TouchableOpacity
                        onPress={() => props.onPressClose ? props.onPressClose(props.data) : null}
                    >
                        <Image
                            source={require("../Theme/img/ic_close1.png")}
                            style={{ width: 20, aspectRatio: 1 }}
                            resizeMode='contain'
                            tintColor='gray'
                        />
                    </TouchableOpacity>
                    <Text children='Chỉnh sửa số lượng' style={{ fontSize: 20, textAlign: 'center', flex: 1, }} />

                    <View
                        style={{ width: 20, aspectRatio: 1 }}
                    />
                </View>
                <Modal transparent visible={props.isRequest}>
                    <View style={{ bottom: dimension.height * 0.2, left: 0, right: 0, position: 'absolute', flex: 1 }}>
                        <ActivityIndicator color={"blue"} count={4} size={40} />
                    </View>

                </Modal>

                <FlatList data={props.data?.itemfood?.card ? props.data?.itemfood?.card : props.data?.itemfood?.book_food} renderItem={renderItem} />
            </View>
        </Animated.View>
    );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BottomsheetSub);
