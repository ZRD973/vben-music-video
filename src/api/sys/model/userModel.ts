/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  account: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
  success:boolean;
  message:string;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  // userId: string | number;
  // 用户名
  // username: string;
  // 真实名字
  name: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
  result:Result;
}
/**
 * 响应模型
 */
export interface ResponeModel {
  success: boolean;
  code:number;
  result:Result;
}
export interface Result {
  account: string;
  address: string;
  avatar: string;
  created_at: string;
  delete_flag: number;
  email: string;
  id: number;
  introduction: string;
  name: string;
  password: string;
  phone: string;
  role: number;
  sex:string;
  updated_at: string;
  roles:RoleInfo[];
  result:Result;
  userId:number; 
  username:string;
}

