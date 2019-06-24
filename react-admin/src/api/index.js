import ajax from './ajax';
import jsonp from 'jsonp';
import { message } from 'antd';

//请求登录函数
export const reqLogin = ( username , password ) => ajax('/login' , { username , password }, 'POST');

//请求验证用户信息
export const reqValidateUserInfo = (id) => ajax('/validate/user',{id},'POST');

//请求天气
export const reqWeather = function () {
  return new Promise((resolve,reject) => {
    jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=深圳&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,{},function (err,data) {
      if(!err){
        const { dayPictureUrl , weather } =data.results[0].weather_data[0];
        resolve({
          weatherImg:dayPictureUrl,weather
        });
      }else{
        message.error('请求天气信息失败，请刷新试试');
        resolve();
      }
    })
  })
}