import { defHttp } from '/@/utils/http/axios';

enum Api {
  Videos = '/file/videos',
}

export function getVideo() {
  return defHttp.get({ url: Api.Videos}, { errorMessageMode: 'none' });
}


// export function registerApi(params) {
//   return defHttp.post({ url: Api.Register, params}, { errorMessageMode: 'none' });
// }


// export function getUserInfo() {
//   return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
// }