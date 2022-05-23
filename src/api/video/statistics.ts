import { defHttp } from '/@/utils/http/axios';

enum Api {
  Choiceness = '/choiceness',
  Rank = '/rank',
  Recommend = '/recommend',
  Occf = '/occf',
  StyleCount = '/count/style',
  ActionCount = '/count/action',
  TotalCount = '/count/total',
  PlayCount = '/count/play',
}

/**
 * @description: getRankList 获取精选音乐
 */
 export function getChoicenessList(params={}) {
  return defHttp.get({ url: Api.Choiceness, params }, { errorMessageMode: 'none' });
}
/**
 * @description: getRankList 获取排行榜
 */
 export function getRankList(params={}) {
  return defHttp.get({ url: Api.Rank, params }, { errorMessageMode: 'none' });
}
/**
 * @description: getRecommend 获取推荐
 */
 export function getRecommend(params={}) {
  return defHttp.get({ url: Api.Recommend, params }, { errorMessageMode: 'none' });
}
/**
 * @description: getRecommend 获取协同过滤推荐
 */
 export function getOccfRecommend(params={}) {
  return defHttp.get({ url: Api.Occf, params }, { errorMessageMode: 'none' });
}
/**
 * @description: getStyleCount 统计视频风格数量
 */
 export function getStyleCount(params={}) {
  return defHttp.get({ url: Api.StyleCount, params }, { errorMessageMode: 'none' });
}
/**
 * @description: getActionCount 获取点赞收藏评论数量
 */
 export function getActionCount(params={}) {
  return defHttp.get({ url: Api.ActionCount, params }, { errorMessageMode: 'none' });
}
/**
 * @description: getTotalCount 获取视频、播放、用户、评论数
 */
 export function getTotalCount(params={}) {
  return defHttp.get({ url: Api.TotalCount, params }, { errorMessageMode: 'none' });
}
/**
 * @description: getPlayCount 获取播放量
 */
 export function getPlayCount(params={}) {
  return defHttp.get({ url: Api.PlayCount, params }, { errorMessageMode: 'none' });
}