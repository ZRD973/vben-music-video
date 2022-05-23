<template>
  <div class="music_wrapper">
    <!-- 检索表单 -->
    <el-form :inline="true" :model="formModel">
      <el-form-item label="检索">
        <el-input v-model="formModel.search" placeholder="输入歌曲或描述进行搜索" />
      </el-form-item>
      <el-form-item label="歌手">
        <el-select-v2
          v-model="formModel.singer"
          style="width: 240px"
          filterable
          remote
          :remote-method="remoteMethod"
          clearable
          :options="singerObj"
          :loading="loading"
          placeholder="请选择歌手"
        />
      </el-form-item>
      <el-form-item :label="typeObj.label">
        <el-select v-model="formModel.type" placeholder="请选择音乐类型" clearable>
          <el-option v-for="item in typeObj.options" :label="item.label" :value="item.label" />
        </el-select>
      </el-form-item>
       <el-form-item :label="styleObj.label">
        <el-select v-model="formModel.style" placeholder="请选择音乐风格" clearable>
          <el-option v-for="item in styleObj.options" :label="item.label" :value="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item :label="areaObj.label">
        <el-select v-model="formModel.area" placeholder="请选择地区" clearable>
          <el-option v-for="item in areaObj.options" :label="item.label" :value="item.label" />
        </el-select>
      </el-form-item>
        <div class="btns">
          <el-button type="primary" :icon="Search" @click="onSearch">搜索</el-button>
          <el-button type="primary" :icon="CirclePlus" @click="onAddVideo">新增</el-button>
        </div>
    </el-form>

    <!-- 视频信息列表 -->
    <MyElTable
      v-model="videoTable"
      pagination
      @pagination="getVideoList"
      hide-on-single-page
      ref="videortable"
      class="videoTable"
    >
      <template #singer="{row}">
        <span v-if="!row.singer.length" style="margin:0 3px;">{{"未知"}}</span> 
        <span v-else style="margin:0 3px;" v-for="item in row.singer">{{item.name}}</span> 
      </template>
      <!-- 操作栏 -->
      <template #toolBar="{row}">
        <el-button  type="primary" :icon="VideoPlay" size="small" @click="handlePreview(row)">预览</el-button>
        <el-button  type="primary" :icon="Edit" size="small" @click="handleEdit(row)">编辑</el-button>
        <el-button  type="danger" :icon="Delete" size="small" @click="handleDelete(row)">删除</el-button>
      </template>
    </MyElTable>

  <!-- 新增弹窗表单 -->
  <el-dialog v-model="addDialog" :center="true" title="新增音乐视频" width="50%" :z-index="999">
      <el-form  :model="addFormModel" :rules="addRules" ref="ruleFormRef">
        <el-row>
          <el-col :span="14">
            <el-form-item label="视频标题" prop="title">
              <el-input v-model="addFormModel.title" size="large" placeholder="请输入视频标题" />
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="7">
            <el-form-item label="歌手" prop="singer">
              <el-select-v2
                v-model="addFormModel.singer"
                style="width: 240px"
                filterable
                remote
                :remote-method="remoteMethod"
                clearable
                :options="singerObj"
                :loading="loading"
                placeholder="请选择歌手"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item :label="typeObj.label" prop="type">
              <el-select v-model="addFormModel.type" size="large" placeholder="请选择音乐类型" clearable>
                <el-option v-for="item in typeObj.options" :label="item.label" :value="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="7">
            <el-form-item :label="styleObj.label" prop="style">
              <el-select v-model="addFormModel.style" size="large" placeholder="请选择音乐风格" clearable>
                <el-option v-for="item in styleObj.options" :label="item.label" :value="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="7">
            <el-form-item :label="areaObj.label" prop="area">
              <el-select v-model="addFormModel.area" size="large" placeholder="请选择地区" clearable>
                <el-option v-for="item in areaObj.options" :label="item.label" :value="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="23">
            <el-form-item label="歌曲描述" >
              <el-input v-model="addFormModel.intro" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }"  placeholder="请输入歌曲描述"  />
            </el-form-item>
          </el-col>
          <el-form-item>
            <span style="font-size:20px;">上传视频</span>
              <div class="upload_wrapper">
              <BasicUpload @change="handleChange" multiple :maxSize="500" :api="uploadVideoToObsApi"
                :emptyHidePreview="true" :columns="columns" :accept="['flv','avi','mov','mp4','wmv']" class="upload my-5">
                <span>上传服务器</span>
              </BasicUpload>
              <BasicUpload @change="handleChange" :maxSize="500" multiple :api="uploadApi"
                :accept="['flv','avi','mov','mp4','wmv']" :emptyHidePreview="true" :columns="columns" class="upload my-5">
                <span>上传后台</span>
              </BasicUpload>
            </div>
          </el-form-item>
          </el-row>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelForm">取消</el-button>
          <el-button type="primary" @click="onAddClick(ruleFormRef)">确定</el-button>
        </span>
      </template>
  </el-dialog>

  <!-- 编辑弹窗表单 -->
  <el-dialog v-model="editDialog" :center="true" title="编辑音乐视频" width="50%" :z-index="999">
      <el-form  :model="editFormModel">
        <el-row>
          <el-col :span="14">
            <el-form-item label="视频标题">
              <el-input v-model="editFormModel.title" size="large" placeholder="请输入视频标题" />
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="7">
            <el-form-item label="歌手">
              <el-select-v2
                v-model="editFormModel.singer[0].name"
                style="width: 240px"
                filterable
                remote
                :remote-method="remoteMethod"
                clearable
                :options="singerObj"
                :loading="loading"
                placeholder="请选择歌手"
              />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item :label="typeObj.label">
              <el-select v-model="editFormModel.type" size="large" placeholder="请选择音乐类型" clearable>
                <el-option v-for="item in typeObj.options" :label="item.label" :value="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="7">
            <el-form-item :label="styleObj.label">
              <el-select v-model="editFormModel.style" size="large" placeholder="请选择音乐风格" clearable>
                <el-option v-for="item in styleObj.options" :label="item.label" :value="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="7">
            <el-form-item :label="areaObj.label">
              <el-select v-model="editFormModel.area" size="large" placeholder="请选择地区" clearable>
                <el-option v-for="item in areaObj.options" :label="item.label" :value="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="23">
            <el-form-item label="歌曲描述" >
              <el-input v-model="editFormModel.intro" type="textarea" :autosize="{ minRows: 2, maxRows: 5 }"  placeholder="请输入歌曲描述"  />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelForm">取消</el-button>
          <el-button type="primary" @click="onEditClick">确定</el-button>
        </span>
      </template>
  </el-dialog>

  <el-dialog v-model="previewDialog" :center="true" title="预览视频" width="65%" :z-index="999">
     <video v-if="previewDialog" class="video" :src="previeData.video_url"  controls autoplay></video>
  </el-dialog>

</div>

</template>

<script lang="ts" setup>
import { reactive, ref, getCurrentInstance, onMounted, inject } from 'vue';
import { MyElTable } from '/@/components/MyTable';
import { Delete,Edit,VideoPlay,Search,CirclePlus } from '@element-plus/icons-vue';
import { getVideoInfo, addVideoInfo, updateVideoInfo, deleteVideoInfo, getTypeSort, getSingerInfo } from '/@/api/video/video';
import { uploadApi,uploadVideoToObsApi } from '/@/api/sys/upload';
import type { MyTableProps } from '/#/views';
import { BasicUpload } from '/@/components/Upload';
import { useMessage } from '/@/hooks/web/useMessage';
import { createTableColumns } from '/@/components/Upload/src/data';
import { ElMessageBox,ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { debounce,cloneDeep } from 'lodash-es';
  onMounted(()=>{
    remoteSinger();
    getTypeSort().then(res=>{
      typeObj.value = res.classify[0];
      areaObj.value = res.classify[1];
      styleObj.value = res.classify[2];
    })
  })
  const proxy:any = getCurrentInstance()?.proxy;
  const videortable = ref();

  const formModel = reactive({  search: '', type: '', area:'', style:'', singer:'' });
  const typeObj:any = ref({});  
  const areaObj:any = ref({});
  const styleObj:any = ref({});
  const singerObj:any = ref([]);
  const temp = ref([])
  const remoteSinger = (query="") =>{
    getSingerInfo({name:query}).then(res=>{
      loading.value = false;
      singerObj.value = res.rows.map((item)=>{
        return { label:item.name,value:item.id }
      })
      temp.value = cloneDeep(singerObj.value);
    })
  }
  let debounced = debounce(remoteSinger,500);
  const remoteMethod = (query: string) => {
    if (query !== '') {
      loading.value = true;
      debounced(query)
      } else {
        singerObj.value = temp.value;
      }
  }

  const onSearch = () => {
    refresh();
  }
  
  const videoTable:MyTableProps = reactive({
    total: 0,
    data: [],
    columnsProps: {
      width: 'auto',
      showOverflowTooltip: true,
      align: 'center',
    },
    column: [
      { type: 'index', Index:true, label: '序号', align: 'center', width: 65, fixed: 'left' },
      { prop: 'title', label: '歌曲', align: 'center', width: 150, fixed: 'left' },
      { prop: 'singer', label: '歌手', align: 'center', width: 120, fixed: 'left', slotScope: true },
      { prop: 'type', label: '类型', align: 'center', width: 120 },
      { prop: 'style', label: '风格', align: 'center', width: 120 },
      { prop: 'area', label: '地区', align: 'center', width: 120 },
      { prop: 'intro', label: '介绍', align: 'center' },
      { prop: 'toolBar', label: '操作', width: 250, align: 'center', fixed: 'right', slotScope: true },
    ],
  });
  const getVideoList = (data) => {
    getVideoInfo({
        limit:data.pageSize, 
        page:data.pageIndex, 
        ...formModel
    }).then(res=>{
      videoTable.data = res.rows;
      videoTable.total = res.count;
    })
  };


  const previewDialog = ref(false);
  const previeData:any = ref({});
  const handlePreview = (row) =>{
    previewDialog.value = true;
    previeData.value = row;
  }

  const editDialog = ref(false);
  const editFormModel = ref({ title:'', singer:[{name:""}], type:'', style:'', area:'', intro:'' });
  const handleEdit = (row) =>{
    editDialog.value = true;
    if(!row.singer.length){
      row.singer.push({name:"未知"})
    }
    editFormModel.value = cloneDeep(row);
  }
  const onEditClick = () =>{
    updateVideoInfo(editFormModel.value).then(res=>{
      editDialog.value = false;
      refresh();
      cancelForm();
      res.success ?  ElMessage({ message: '修改成功！', type: 'success' }) :ElMessage({ message: '修改失败！', type: 'error' });
    })
  }

  const handleDelete = (row) =>{
    ElMessageBox.confirm('确定要删除视频吗?').then(() => {
      deleteVideoInfo({ id:row.id }).then(res=>{
        if(res.success){
          ElMessage({ message: '视频删除成功！', type: 'success' })
        }else{
          ElMessage({ message: '视频删除失败！', type: 'error' })
        }
        refresh();
      })
    }).catch(() => {})
  }

  const addDialog = ref(false);
  const loading = ref(false);
  const addFormModel = ref({ title: '', singer:'', type: '', area:'', style:'', intro:'',video_url:'' })
  const columns = createTableColumns().slice(1);
  const { createMessage } = useMessage();
  const handleChange = (list: string[]) => {
    createMessage.info(`已上传文件${JSON.stringify(list)}`);
    addFormModel.value.video_url = list[0];
  };

  const ruleFormRef = ref<FormInstance>()
  const addRules = reactive<FormRules>({
    title: [
      { required: true, message: '请输入音乐视频名称', trigger: 'blur' },
      // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    singer: [
      { required: true, message: '请选择歌手', trigger: 'blur' },
    ],
    type: [
      { required: true, message: '请选择视频类型', trigger: 'blur' },
    ],
    style: [
      { required: true, message: '请选择视频风格', trigger: 'blur' },
    ],
    area: [
      { required: true, message: '请选择视频地区', trigger: 'blur' },
    ],
  })

  const onAddVideo = () => {
    addDialog.value = true;
  }

  const reload = inject<Function>("reload");
  // 确定添加视频
  const onAddClick = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        if(!addFormModel.value.video_url){
          ElMessage({ message: '没有上传视频! 请上传视频后再提交！', type: 'warning' })
          return;
        }
        addVideoInfo({...addFormModel.value}).then(()=>{
          refresh();
          cancelForm();
          reload && reload();
        })
      }else {
        console.log('error submit!', fields)
      }

    })
  }
  // 取消
  const cancelForm = () => {
    addFormModel.value = { title: '', singer:'', type: '', area:'', style:'', intro:'',video_url:'' }
    editFormModel.value = { title:'', singer:[{name:""}], type:'', style:'', area:'', intro:'' }
    loading.value = false;
    addDialog.value = false;
    editDialog.value = false;
    // refresh();
  }

  // 刷新
  const refresh = () =>{
    proxy?.$refs?.videortable?.refresh();
  }

  // const handleClose = (done) => {
    // addDialog.value = false
    // if (loading.value) {
    //   return
    // }
    // ElMessageBox.confirm('Do you want to submit?').then(() => {
    //     loading.value = true
    //   }) .catch(() => { })
  // }

  


</script>

<style lang="less" scoped>
.music_wrapper{
  padding: 20px;
  margin: 0 auto;
}
.btns{
  float: right;
}
.upload_wrapper{
  display: flex;
  // justify-content: center;
  // position: absolute;
  // top: 20px;
  // right: 5%;
  .upload{
    margin: 0 10px;
  }
}
.drawer_footer{
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

</style>
