<template>
<div style="padding: 20px;margin: 0 auto;">
  <!-- <PageWrapper title="歌手管理"> -->
  
   <!-- 检索表单 -->
  <el-form :inline="true" >
    <el-form-item label="姓名">
      <el-input v-model="singerName" placeholder="请输入歌手姓名" />
    </el-form-item>
    <el-form-item >
      <el-button type="primary" :icon="Search" @click="refresh()">搜索</el-button>
      <el-button type="primary" :icon="CirclePlus" @click="onAddSinger">新增</el-button>
    </el-form-item>
  </el-form>

    <MyElTable
      v-model="singerTable"
      pagination
      @pagination="getSingerList"
      hide-on-single-page
      ref="singertable"
      class="singerTable"
    >

      <!-- <template #img_path="{row}">
        <Image :width="80" :src="row.img_path || headerImg"/>
      </template> -->

      <template #intro="{row}">
        <div class="intro" :title="row.intro" @click="handleExpand(row.intro)">{{row.intro}}</div>
      </template>

      <!-- 操作栏 -->
      <template #toolBar="{row}">
        <el-button type="primary" :icon="Edit" size="small" @click="handleEdit(row)">编辑</el-button>
      </template>
    </MyElTable>
  <!-- </PageWrapper> -->

  <!-- 弹窗表单 -->
  <el-dialog v-model="Dialog" :center="true" title="编辑歌手信息" width="30%" :z-index="999">
    <el-form  :model="formModel">
      <el-form-item label="姓名">
        <el-input v-model="formModel.name" size="large" placeholder="请输入歌手姓名" />
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="formModel.intro" type="textarea" :autosize="{ minRows: 4, maxRows: 10 }"  placeholder="请输入歌曲描述"  />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelForm">取消</el-button>
        <el-button type="primary" @click="onSubmitClick">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="isExpand" :center="true" title="歌手简介" width="30%" :z-index="999">
    {{singerIntro}}
  </el-dialog>
</div>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { MyElTable } from '/@/components/MyTable';
  import { getSingerInfo, addSinger, updateSinger } from '/@/api/video/video';
  import { Edit, Search, CirclePlus } from '@element-plus/icons-vue';
  import type { MyTableProps } from '/#/views';
  import {ref, reactive} from 'vue';
  import { cloneDeep } from 'lodash-es';
  import { Image } from 'ant-design-vue';
  import { ElMessage } from 'element-plus';
  import headerImg from '/@/assets/images/header.jpg';

  const singertable = ref();
  const singerName = ref("");
  const formModel:any = ref({
    name:"",
    intro:""
  });
     
  const isExpand = ref(false);
  const singerIntro = ref("");
  const handleExpand = (intro) =>{
    isExpand.value = !isExpand.value;
    singerIntro.value = intro;
  };

  const singerTable:MyTableProps = reactive({
    total: 0,
    data: [],
    columnsProps: {
      width: 'auto',
      showOverflowTooltip: false,
      align: 'center',
    },
    column: [
      { type: 'index', Index:true, label: '序号', align: 'center', width: 65, fixed: 'left'},
      // { prop: 'img_path', label: '照片', align: 'center', width: 150, fixed: 'left', slotScope: true },
      { prop: 'name', label: '名字', align: 'center', width:150, fixed: 'left' },
      { prop: 'intro', label: '简介', align: 'center',  fixed: 'left', slotScope: true },
      { prop: 'toolBar', label: '操作', width: 180, align: 'center', fixed: 'right', slotScope: true },
    ],
  });

  // let limit,page;
  let limit = ref(0)
  let page = ref(0)
  const getSingerList = (data) => {
    limit = data.pageSize;
    page = data.pageIndex;
    getSingerInfo({
      limit:data.pageSize,
      page:data.pageIndex,
      name:singerName.value
    }).then(res=>{
      singerTable.data = res.rows;
      singerTable.total = res.count;
    })
    
  };

   

  const Dialog = ref(false);
  const isAdd = ref(true);

  const onAddSinger = () =>{
    isAdd.value = true;
    Dialog.value = true;
    formModel.value = {};
  }

  const handleEdit = (row) =>{
    isAdd.value = false;
    Dialog.value = true;
    formModel.value = cloneDeep(row);
  }

  const onSubmitClick = () =>{
    if(isAdd.value){
      addSinger(formModel.value).then(res=>{
        if(res.success){
          refresh()
          ElMessage({ message: res.message, type: 'success' });
        }else{
          ElMessage({ message: res.message, type: 'error' });
        }
      })
    }else{
      updateSinger(formModel.value).then(res=>{
        if(res.success){
          refresh()
          ElMessage({ message: res.message, type: 'success' }); 
        }else{
          ElMessage({ message: res.message, type: 'error' });
        }
      })
    }
      
  }

  const cancelForm = () =>{
    refresh()
  }

  const refresh = () =>{
    Dialog.value = false;
    singertable.value.refresh();
  }


</script>
<style lang="less" scoped>
.intro{
  cursor: pointer;
  /*设置 用来限制在一个块元素显示的文本的行数*/
  -webkit-line-clamp: 3;
  /*必须结合的属性 将对象作为弹性伸缩盒子模型显示 */
  display: -webkit-box;
  /*必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 */
  -webkit-box-orient: vertical;
  /*溢出隐藏*/
  overflow: hidden;
  /*超出显示省略号*/
  text-overflow: ellipsis;
}
  
  </style>