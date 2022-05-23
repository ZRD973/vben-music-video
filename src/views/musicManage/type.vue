<template>
<div>
  <PageWrapper title="音乐类型管理">
    <!-- ;嘻哈;民谣;舞曲;古典 -->
    <screen :staticScreen="staticScreen"></screen>

    <el-alert title="提示：文字之间使用英文分号（ ; ），以此来分割属性。结尾不需要分号！！！" show-icon  type="warning" style="width:65%;margin:20px 0;max-width: 800px;" />
    <el-form
      label-position="Top"
      label-width="100px"
      style="width:60%;max-width: 800px;margin: 10px 0;">
      <el-form-item v-for="item in editForm" :label="item.label">
        <el-input v-model="item.content" />
      </el-form-item>
      <el-form-item>
        <div style="position: absolute;right: 0;">
          <el-button @click="cancelSubmit">重置</el-button>
          <el-button type="primary" @click="confirmSubmit">确定</el-button>
        </div>
      </el-form-item>
    </el-form>
  </PageWrapper>
</div>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import screen from '/@/views/frontPage/coms/screen.vue';
  import { ElMessageBox, ElMessage } from 'element-plus';
  import { cloneDeep } from 'lodash-es';
  import { getTypeSort, updateTypeSort } from '/@/api/video/video';
  import { ref, onMounted } from 'vue';
  const staticScreen:any = ref([]);
  const editForm:any = ref([]);
  const getInitType = () =>{
    getTypeSort({ sort: true }).then((res) => {
      if (res) {
        staticScreen.value = res.classify;
        editForm.value = res.data;
        editForm.value.forEach((item:any)=>{
          item.content = item.content.replace(';',"");
        })
      }
    });
  }

  
  const confirmSubmit = () =>{
    let submitForm = cloneDeep(editForm.value);
    let flag = true;
    submitForm.forEach((item:any)=>{
      if(item.content.slice(-1) == ";" || /[；]/.test(item.content)){
        flag = false;
      }else{
        item.content = ';' + item.content;
      }
    })
    if(!flag){
      ElMessage({ message: '必须是英文字符分号，并且不能以分号结尾！', type: 'warning' });
      return;
    }
    ElMessageBox.confirm('确定修改吗?').then(() => {
      updateTypeSort(submitForm).then(()=>{
        ElMessage({ message: '修改成功！', type: 'success' })
        getInitType();
      })
    }).catch(() => {})

  }
  const cancelSubmit = () =>{
    getInitType();
  }

  onMounted(()=>{
    getInitType();
  })
</script>
