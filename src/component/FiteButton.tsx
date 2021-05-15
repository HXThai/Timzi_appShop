import { colors } from '@app/constants/Theme';
import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedbackProps, ViewStyle, TextStyle } from 'react-native';
import { connect } from 'react-redux';
type Props = {
  title?: string;
  backgroundColor?: string;
  style?: ViewStyle;
  disabled?: boolean;
  titleStyle?: TextStyle;
  onPress?: () => void;
};
export const FiteButton = (props: Props) => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={[{ backgroundColor: "red", alignItems: 'center' }, { ...props.style }]}
      onPress={() => (props.onPress ? props.onPress() : null)}
    >
      <Text children={props.title} style={{ ...props.titleStyle }} />
    </TouchableOpacity>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FiteButton);
