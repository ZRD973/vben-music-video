export interface VideoInfoResponse{
  id: number;
  author: string;
  title: string;
  intro: string;
  video_url: string;
  cover_url: string;
  created_at: string;
  updated_at: string;
}

export interface GetVideoInfoModel{
  count:number;
  rows:VideoInfoResponse[];
}

export interface VideoInfoRequest {
  limit: number;
  page: number;
  type?:string;
  area?:string;
  style?:string;
  search?:string;
}

export interface TypeSortResponse{
  classify:classifySub[];
  data:[];
};

interface classifySub{
  label:string;
  options:Options[];
  type:string;
};
interface Options{
    label:string;
    value:string|null;
};