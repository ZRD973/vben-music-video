export interface VideoListItem{
  url:string;
  title:string;
  author:string;
}

export interface StaticScreenItem{
  label:string;
  type:string;
  options: Array<Options>;
}
export interface Options{
  label:string;
  value:string | number;
}

export interface EmitCarouselObj{
  isShowCarousel?:boolean;
  isShowScreen?:boolean;
  index:number;
}