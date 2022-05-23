export interface VideoListItem{
  cover_url:string;
  video_url:string;
  title:string;
  singer:Array;
  style:string;
  area:string;
  type:string;
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

export interface MyTableColumn{
  type?: string;
  prop?:string;
  label?: string; 
  align?: string; 
  width?: number, 
  fixed?: string;
  slotScope?:boolean;
}
export interface MyTableData{
  id: number;
  author?: string;
  title?: string;
  intro?: string;
  video_url?: string;
  cover_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MyTableProps{
  total?:number,
  data: MyTableData[],
  columnsProps?: object;
  column: MyTableColumn[];
}

export interface RankItem{
  area: string,
  cover_url: string,
  created_at: string,
  id: number,
  intro: string,
  style: string,
  title: string,
  type: string,
  updated_at: string,
  video_url: string,
  heat:number
}

