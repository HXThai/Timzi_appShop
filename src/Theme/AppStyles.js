import {StatusBar} from 'react-native';
import Color from './Color';

function dynamicSort(value) {
  var data = parseFloat(value)
    .toFixed(2)
    .toString()
    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
    .replace('.00', '');
  //console.log(data)
  return data;
}

const AppStyles = {
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: Color.main,
  },
  dynamicSort: dynamicSort,
};
export default AppStyles;
