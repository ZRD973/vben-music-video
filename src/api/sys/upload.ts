import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';

const { uploadUrl = '' } = useGlobSetting();

/**
 * @description: Upload interface 上传图片
 */
export function uploadApi( params: UploadFileParams, onUploadProgress: (progressEvent: ProgressEvent) => void ) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params,
  );
}
/**
 * @description: 上传到华为云服务器
 */
export function uploadVideoToObsApi( params: UploadFileParams, onUploadProgress: (progressEvent: ProgressEvent) => void ) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: '/video/upload',
      onUploadProgress,
    },
    params,
  );
}
/**
 * @description: 上传到本地后台服务器
 */
export function uploadVideoToLocalApi( params: UploadFileParams, onUploadProgress: (progressEvent: ProgressEvent) => void ) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: '/video/upload',
      onUploadProgress,
    },
    params,
  );
}
