import { defHttp } from '/@/utils/http/axios';
import  request  from '/@/utils/http/axios/request';
import { LoginParams, LoginResultModel, GetUserInfoModel,ResponeModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  // Login = '/login',
  Register = '/user/register',
  Login = '/user/login',
  ChangePws = '/change/psw',
  Logout = '/logout',
  GetUserInfo = '/user/info',
  EditUserInfo = '/user/editinfo',
  AllUser = '/user/all',
  GetPermCode = '/getPermCode',
}


// export function myLogin(param: LoginParams) {
//   return request({
//       url: Api.Login,
//       method: 'post',
//       data: param
//   })
// }

export function registerApi(params) {
  return defHttp.post({ url: Api.Register, params}, { errorMessageMode: 'none' });
}

export function changePswApi(params) {
  return defHttp.post({ url: Api.ChangePws, params}, { errorMessageMode: 'none' });
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    { url: Api.Login, params, },
    { errorMessageMode: mode, },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}
export function getAllUser() {
  return defHttp.get<GetUserInfoModel>({ url: Api.AllUser }, { errorMessageMode: 'none' });
}
export function editUserInfo(params) {
  return defHttp.post<ResponeModel>({ url: Api.EditUserInfo, params }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}
