
import React from 'react'
import { ScrollView } from 'react-native';
import { Animated } from 'react-native';
import { Text } from 'react-native';
import { View } from 'react-native';
import { connect } from 'react-redux'
import reactotron from 'reactotron-react-native';
import { DishItem } from './DishItem';
export const formatNumber = number => {
    try {
        const numberFormat = number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        return numberFormat + ' đ';
    } catch (error) {
        return 'Không có dữ liệu';
    }
};

interface ShopDetailitem {
    onPressSubtract?: (value) => void;
    onPressAdd?: (value) => void;
    onPress?: (value) => void;
    onPressImage?: (value) => void;
    data1?: [];
    data2?: [];
    name_public?: string;
    percent?: string;
    isLabelPromotion?: boolean;
    combo?: boolean;
    money?: string;
    marginBottom?: number;
}
export const ShopDetailitem = ({ onPressSubtract, onPressAdd, data1, onPress, onPressImage, percent, name_public, data2, combo, isLabelPromotion, money, marginBottom }: ShopDetailitem) => {
    return (
        <View style={{ marginBottom: 0 || marginBottom }}>
            {data1.length > 0 && data1.map((item, index) => {
                if (item && item.food?.length > 0)
                    return (
                        <View style={{ marginTop: 10 }}>
                            {isLabelPromotion ? <View style={{ flexDirection: 'row', marginHorizontal: 20, alignItems: 'center' }}>
                                <Text children={`Khyễn mãi `} style={{ fontSize: 15,}} />
                                <Text children={`${item?.name_public} `} style={{ fontSize: 15, color: "#FFB31D" }} />
                                <Text children={`Giảm ${item?.percent}%`}
                                    style={{

                                        borderWidth: 1,
                                        paddingHorizontal: 10,
                                        textAlign: 'center',
                                        marginLeft: 5,
                                        paddingVertical: 3,
                                        borderRadius: 6,
                                        borderColor: "#06B70D",
                                        color: "#06B70D",
                                        fontSize: 9,
                                    }}
                                />
                            </View> : <Text children={`${item?.name} `} style={{ fontSize: 15, color: "#FFB31D", marginHorizontal: 20, }} />}
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                                <View style={{ flexDirection: 'row', marginTop: 50 }}>
                                    {item.food?.map((itemfood, indexitemfood) => {
                                        if (itemfood)
                                            return (
                                                <DishItem
                                                    txtStatus={itemfood.is_out_of_food}
                                                    onPress={() => onPress ? onPress({ itemfood, index, indexitemfood }) : null}
                                                    onPressImage={() => onPressImage ? onPressImage({ itemfood, index, indexitemfood }) : null}
                                                    infoFood={itemfood}
                                                    key={indexitemfood}
                                                    combo={combo}
                                                    index={indexitemfood}
                                                    count={itemfood.count_card || itemfood.count_book_food}
                                                    nameFood={itemfood.name}
                                                    onPressSubtract={() => onPressSubtract ? onPressSubtract({ itemfood, index, indexitemfood }) : null}
                                                    onPressAdd={() => onPressAdd ? onPressAdd({ itemfood, index, indexitemfood }) : null}
                                                    urlImage={itemfood.image}
                                                    price_discount={formatNumber(itemfood.price_discount_with_program || itemfood.price_discount || itemfood.price)}
                                                    money={formatNumber(itemfood.price)}
                                                />
                                            );
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                    );
            })}
        </View>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ShopDetailitem)
