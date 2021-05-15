
// import { formatNumber } from '@app/utils/Utils';
import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native';
import { Animated, } from 'react-native';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import reactotron from 'reactotron-react-native';
import BottomSheetBehavior from './FiteBottomSheet';
import { FiteButton } from './FiteButton';

import { formatNumber } from './ShopDetailitem';
const dimension = Dimensions.get('window');
const { width, height } = dimension;
interface BottomSheetShopProps {
  ref: any;
  height?: number;
  initialSnap?: number;
  backgroundColor?: string;
  onPressClose?: (data) => void;
  OnPressTopping?: ({ item, index }) => void;
  OnPressFinal?: (data) => void;
  onPressAdd?: (value) => void;
  onPressSub?: (value) => void;
  dataTopping?: [];
  image?: string;
  infoDish?: object;

}
export const BottomSheetShop = (props: BottomSheetShopProps) => {
  const [count, setCount] = useState(0)
  // if (!props.infoDish) return
  // reactotron.log("props", props.infoDish.itemfood);
  const moneydiscout = props.infoDish?.itemfood?.price_discount_with_program > 0 ? props.infoDish?.itemfood?.price_discount_with_program : props.infoDish?.itemfood?.price_discount > 0 ? props.infoDish?.itemfood?.price_discount : props.infoDish?.itemfood?.price
  // const money = props.infoDish?.itemfood?.price_discount_with_program > 0 ? props.infoDish?.itemfood?.price_discount_with_program : props.infoDish?.itemfood?.price_discount > 0 ? props.infoDish?.itemfood?.price_discount : props.infoDish?.itemfood?.money
  const ListHeaderComponent = () => {
    return (
      <View style={{ flexDirection: 'row', paddingVertical: 6, paddingHorizontal: 10 }}>
        <Image
          source={{ uri: props.infoDish.itemfood.image }}
          style={{ width: 100, aspectRatio: 1 }}
          resizeMode='contain'
        />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text children={props.infoDish.itemfood.name} style={{  fontSize: 24, color: "gray" }} numberOfLines={2} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text children={formatNumber(moneydiscout)} style={{ fontSize:17, }} />
            {props.infoDish?.itemfood?.price_discount >= 0 && props.infoDish?.itemfood?.price_discount_with_program >= 0 && <View style={{ alignItems: 'center', marginLeft: 10 }}>
              <Text children={formatNumber(props.infoDish?.itemfood?.price)} style={{ fontSize:15, color: 'gray' }} />
              <View style={{ height: 1, backgroundColor: 'black', top: -11 }} >
                <Text children={formatNumber(props.infoDish?.itemfood?.price)} style={{ fontSize:15, color: 'white' }} />
              </View>
            </View>}

          </View>
          <View style={{ flexDirection: 'row', }}>
            <View style={{ flex: 1 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => props.onPressSub ? props.onPressSub(props.infoDish) : null}
                style={{ backgroundColor: "blue", padding: 10, marginHorizontal: 5, borderRadius: 5 }}>
                <Image
                  source={require("../Theme/img/ic_sub.png")}
                  style={{ width: 10, aspectRatio: 1, }}
                  resizeMode='contain'
                  tintColor='black'
                />
              </TouchableOpacity>
              <Text children={props.infoDish?.itemfood?.count_temp.toString() || "Chưa cập nhật"} style={{ fontSize:15 }} />
              <TouchableOpacity
                onPress={() => props.onPressAdd ? props.onPressAdd(props.infoDish) : null}
                style={{ backgroundColor: "blue", padding: 10, marginHorizontal: 5, borderRadius: 5 }}>
                <Image
                  source={require("../Theme/img/ic_add.png")}
                  style={{ width: 10, aspectRatio: 1, }}
                  tintColor='black'
                />
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </View >

    )
  }

  const renderItemTopping = ({ item, index, indexTopping, itemTopping }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (!props.OnPressTopping) return
          // if(props.infoDish.type == TYPE_UPDATE_CART.CATEGORY){
          let priceItem = props.infoDish.itemfood.price_discount_with_program > 0 ? props.infoDish.itemfood.price_discount_with_program : props.infoDish.itemfood.price_discount > 0 ? props.infoDish.itemfood.price_discount : props.infoDish.itemfood.price
          props.OnPressTopping({
            item,
            indexToppingFood: index,
            priceItem: priceItem,
            indexCategoryTopping: indexTopping,
            indexFood: props.infoDish.indexitemfood,
            indexCategory: props.infoDish.index,
            type: props.infoDish.type,
            itemTopping: itemTopping
          })
          return
          // }
          // console.log(props.infoDish.price);
        }}
        style={{ borderBottomWidth: 1, borderColor: 'gray', marginHorizontal: 10, paddingVertical: 7, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
        <View style={{}}>
          <Text children={item.name || "121"} style={{ fontSize:17 }} />
          <Text children={formatNumber(item.price)} style={{ color: 'gray' }} />
        </View>

        { item.check == 0 && <View style={{ width: 20, aspectRatio: 1, borderColor: "gray", borderRadius: 10, borderWidth: 1 }} />}
        {item.check == 1 && <Image
          source={require("../Theme/img/ic_checktopping.png")}
          style={{ width: 20, aspectRatio: 1, }} />}
      </TouchableOpacity>
    )
  }
  const renderItem = ({ item, index }) => {
    const indexTopping = index
    const itemTopping = item
    return (
      <View style={{ marginTop: 10, }} >
        <Text children={item.name} style={{ backgroundColor: "gray", fontSize:18, paddingHorizontal: 10, paddingVertical: 5 }} />
        <FlatList
          data={item.topping_food}
          renderItem={({ item, index }) => renderItemTopping({ item, index, indexTopping: indexTopping, itemTopping: itemTopping })}
        />
      </View>
    )
  }
  if (props.infoDish.itemfood == undefined) return null
  return (
    <Animated.View
      style={{
        height: height,
        backgroundColor: props.backgroundColor,
        paddingTop: height * 0.3,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
      }}
    >
      <View style={{ flex: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: 'white', paddingTop: 15 }}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
            paddingVertical: 6,
            borderColor: "gray"
          }}>
          <TouchableOpacity
            onPress={() => props.onPressClose ? props.onPressClose(props.infoDish) : null}
          >
            <Image
              source={require("../Theme/img/ic_close1.png")}
              style={{ width: 20, aspectRatio: 1 }}
              tintColor={"gray"}
              resizeMode='contain'
            />
          </TouchableOpacity>

          <Text children='Thêm món mới' style={{ fontSize:18, color: "gray"}} />
          <View
            // source={R.images.ic_close1}
            style={{ width: 20, aspectRatio: 1 }}
          />
        </View>
        {ListHeaderComponent()}
        <FlatList
          data={props.infoDish.itemfood.category_topping_food}
          // ListHeaderComponent={ListHeaderSize}
          renderItem={renderItem}
        />
        <View style={{
          // borderTopWidth: 1, 
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
          backgroundColor: 'white',
          paddingVertical: 15,
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text children={formatNumber(props.infoDish?.itemfood?.total_temp)} style={{fontSize:17 }} />
          </View>
          <View style={{ flex: 1 }}>
            {/* <TouchableOpacity
              onPress={props.OnPressFinal ? props.OnPressFinal(props.infoDish) : null}
              style={{ backgroundColor: 'white', borderWidth: 1, marginHorizontal: 10, borderRadius: 20, paddingVertical: 8, borderColor: "blue", alignItems: 'center' }}>
              <Text children='Thêm vào giỏ hàng' style={{ color: "blue",fontSize:15 }} />
            </TouchableOpacity> */}
            <FiteButton
              onPress={() => props.OnPressFinal ? props.OnPressFinal(props.infoDish) : null}
              title='Thêm vào giỏ hàng'
              style={{ backgroundColor: 'white', borderWidth: 1, marginHorizontal: 10, borderRadius: 20, paddingVertical: 8, borderColor: "blue" }}
              titleStyle={{ color: "blue", fontSize:15 }}
            />
          </View>
        </View>
      </View>

    </Animated.View>
  );
};
const style = StyleSheet.create({
  button: {
    padding: 10,
    paddingHorizontal: 13,
    margin: 5,
    borderRadius: 6
  }
})
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomSheetShop);
