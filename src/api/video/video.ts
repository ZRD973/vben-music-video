import { defHttp } from '/@/utils/http/axios';
import { GetVideoInfoModel,VideoInfoRequest,TypeSortResponse } from './model';

enum Api {
  VideoList = '/video',
  VideoDetail = '/video/detail',
  UpdateAction = '/update/action',
  TypeSort = '/classify',
  Singer = '/singer',
  Reply = '/reply',
  Collect = '/user/collect',
}

/**
 * @description: addVideoList 添加音乐视频
 */
 export function addVideoInfo(params) {
  return defHttp.post({ url: Api.VideoList, params }, { errorMessageMode: 'none' });
}
/**
 * @description: getVideoList 获取音乐列表
 */
export function getVideoInfo(params:VideoInfoRequest) {
  return defHttp.get<GetVideoInfoModel>({ url: Api.VideoList ,params}, { errorMessageMode: 'none' });
}
/**
 * @description: getVideoList 更新音乐视频信息
 */
export function updateVideoInfo(params) {
  return defHttp.put({ url: Api.VideoList ,params}, { errorMessageMode: 'none' });
}
/**
 * @description: getVideoList 删除音乐视频信息
 */
export function deleteVideoInfo(params) {
  return defHttp.delete({ url: Api.VideoList, params}, { errorMessageMode: 'none' });
}
/**
 * @description: getVideoList 获取音乐视频详情
 */
export function getVideoDetail(params) {
  return defHttp.get({ url: Api.VideoDetail, params}, { errorMessageMode: 'none' });
}
/**
 * @description: getVideoList 获取用户收藏视频
 */
export function getUserCollect() {
  return defHttp.get({ url: Api.Collect}, { errorMessageMode: 'none' });
}
/**
 * @description: getVideoList 更改用户点赞收藏
 */
export function updateAction(params) {
  return defHttp.put({ url: Api.UpdateAction, params}, { errorMessageMode: 'none' });
}


/**
 * @description: getTypeSort 获取分类
 */
export function getTypeSort(params={}) {
  return defHttp.get<TypeSortResponse>({ url: Api.TypeSort,params }, { errorMessageMode: 'none' });
}
/**
 * @description: updateTypeSort 修改分类
 */
export function updateTypeSort(params) {
  return defHttp.put({ url: Api.TypeSort,params }, { errorMessageMode: 'none' });
}

/**
 * @description: getSingerInfo 获取歌手信息
 */
export function getSingerInfo(params={}) {
  return defHttp.get({ url: Api.Singer,params }, { errorMessageMode: 'none' });
}
/**
 * @description: addSinger 添加歌手信息
 */
export function addSinger(params) {
  return defHttp.post({ url: Api.Singer, params }, { errorMessageMode: 'none' });
}
/**
 * @description: updateSinger 更新歌手信息
 */
export function updateSinger(params) {
  return defHttp.put({ url: Api.Singer, params }, { errorMessageMode: 'none' });
}
/**
 * @description: addVideoReply 添加视频评论
 */
 export function addVideoReply(params) {
  return defHttp.post({ url: Api.Reply, params }, { errorMessageMode: 'none' });
}
/**
 * @description: getVideoReply 获取视频评论
 */
export function getVideoReply(params) {
  return defHttp.get({ url: Api.Reply, params }, { errorMessageMode: 'none' });
}
/**
 * @description: getVideoReply 获取视频评论
 */
export function deleteVideoReply(params) {
  return defHttp.delete({ url: Api.Reply, params }, { errorMessageMode: 'none' });
}

