<template>
  <div class="user_wrapper_mian">
    <el-form :inline="true" :model="formModel">
      <el-form-item label="账号">
        <el-input v-model="formModel.search" placeholder="查找账号或昵称" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="formModel.role" placeholder="请选择角色" clearable>
          <el-option label="管理员" :value="1" />
          <el-option label="用户" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="禁言">
        <el-select v-model="formModel.del" placeholder="请选择类型" clearable>
          <el-option label="未拉黑" :value="0" />
          <el-option label="拉黑用户" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="onSearch">搜索</el-button>
      </el-form-item>
    </el-form>

    <MyElTable
      v-model="userTable"
      pagination
      @pagination="getUserList"
      hide-on-single-page
      ref="usertable"
      class="userTable"
    >

      <template #reply="{row}">
        <div v-if="row.reply.length" class="reply" v-for="(item,index) in row.reply">
          <span style="color: black;font-weight: 600;">不良评论 ({{ index+1 }}): &nbsp;  </span>
          <span> {{ item.content }} &nbsp; ———— &nbsp;{{ item.created_at }} </span> 
          <el-link style="margin-left: 20px;" type="danger" @click="deleteReply(item.id)">删除</el-link>
        </div>
        <div v-else style="text-align:center;padding: 10px;font-size: 16px;font-weight: 500;">该用户没有不良评论</div>
      </template>

      <template #role="{ row }">
        <el-select v-if="inputValue === row.id" v-model="role" placeholder="修改角色" @change="changeClick(row)" @visible-change="visibleChange">
          <el-option label="管理员" :value="1" />
          <el-option label="用户" :value="2" />
        </el-select>
        <div v-else-if="row.id==1">
          <span> <el-tag size="large" type="success" style="cursor: not-allowed">管理员</el-tag> </span>
        </div>
        <div v-else @click="changeRole(row)" style="cursor: pointer">
          <span v-if="row.role == 1"> <el-tag size="large" disabled type="success">管理员</el-tag> </span>
          <span v-else><el-tag size="large" type="warning">用户</el-tag> </span>
        </div>
      </template>

      <template #phone="{ row }">
        <span :class="{ is_null: row.phone === null }">
          {{ row.phone === null ? '未填' : row.phone }}
        </span>
      </template>

      <template #email="{ row }">
        <span :class="{ is_null: row.email === null }">
          {{ row.email === null ? '未填' : row.email }}
        </span>
      </template>

      <template #introduction="{ row }">
        <span :class="{ is_null: row.introduction === null }">
          {{ row.introduction === null ? '未填' : row.introduction }}
        </span>
      </template>

      <template #address="{ row }">
        <span :class="{ is_null: row.address === null }">
          {{ row.address === null ? '未填' : row.address }}
        </span>
      </template>

      <!-- 操作栏 -->
      <template #toolBar="{ row }">
        <el-button v-if="row.delete_flag === 0 && row.role !== 1" @click="handleEdit(row)" type="info" size="small">禁言</el-button>
        <el-button v-if="row.delete_flag === 2" @click="handleEdit(row)" type="warning" size="small">恢复 </el-button>
        <el-button v-if="row.role !== 1" size="small" type="danger" :icon="Delete" @click="handleEdit(row,1)" />
        <el-link v-else type="info" disabled :underline="false" style="user-select: none;">无法操作</el-link>
      </template>
    </MyElTable>

    <el-dialog v-model="dialogVisible" title="提示！！！" width="30%" @close="cancelSubmit">
      <span v-if="isShowEdit" class="dialog_content">{{ userRow.delete_flag == 0 ? '确定将恢复用户的评论功能吗？' : userRow.delete_flag == 2 ? '确定拉黑用户吗？拉黑后无法评论！' : "确定删除用户吗？"}}</span>
      <span v-else class="dialog_content">{{ role == 1 ? '确定将用户设置成管理员吗？' : '确定将管理员变为用户吗？' }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelSubmit">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, getCurrentInstance } from 'vue';
  import { MyElTable } from '/@/components/MyTable';
  import { getAllUser,editUserInfo } from '/@/api/sys/user';
  import { deleteVideoReply } from '/@/api/video/video';
  import { Delete,Search } from '@element-plus/icons-vue';
  import { ElMessage } from 'element-plus';
  const proxy:any = getCurrentInstance()?.proxy;
  const usertable = ref();

  const formModel = reactive({
    search: '',
    role: '',
    del:''
  })

  const onSearch = () => {
    refresh();
  }

  const userTable = reactive({
    total: '',
    data: [],
    columnsProps: {
      width: 'auto',
      showOverflowTooltip: true,
      align: 'center',
    },
    column: [
      { prop: 'reply', type: 'expand', fixed: 'left', slotScope: true, },
      { type: 'index', Index:true, label: '序号', align: 'center', width: 65, fixed: 'left' },
      { prop: 'account', label: '账号', width: 110, align: 'center', fixed: 'left' },
      { prop: 'name', label: '昵称', width: 130, align: 'center', fixed: 'left' },
      { prop: 'role', label: '角色', width: 120, align: 'center', fixed: 'left', slotScope: true },
      { prop: 'phone', label: '手机', width: 130, align: 'center', slotScope: true },
      { prop: 'email', label: '邮箱', width: 150, align: 'center', slotScope: true },
      { prop: 'introduction', label: '介绍', align: 'center', slotScope: true },
      { prop: 'address', label: '地址', align: 'center', slotScope: true },
      { prop: 'toolBar', label: '操作', width: 180, align: 'center', fixed: 'right', slotScope: true, },
    ],
  });
  const getUserList = (data) => {
    getAllUser({ 
        limit:data.pageSize, 
        page:data.pageIndex, 
        search:formModel.search,
        role:formModel.role,
        del:formModel.del,
    }).then((res:any) => {
      console.log(111,res);
      userTable.data = res.result.rows;
      userTable.total = res.result.count;
    });
  };

  const inputValue = ref(0);
  const role = ref(1);
  const dialogVisible = ref(false);

  const changeRole = (row) => {
    inputValue.value = row.id;
    role.value = row.role;
  };
  const changeClick = (row) => {
    row.role = role.value;
    userRow.value = row;
    dialogVisible.value = true;
  };
  const visibleChange = (val) =>{
    if(!val){ inputValue.value = 0; }
  }
  const isShowEdit = ref(false);
  const handleEdit = (row,del=0) => {
    dialogVisible.value = true;
    isShowEdit.value = true;
    if(del){
      row.delete_flag = 1;
    }else if(row.delete_flag==0){
      row.delete_flag = 2;
    }else if(row.delete_flag==2){
      row.delete_flag = 0;
    }
    userRow.value = row;
  };

  const deleteReply = (id) =>{
    deleteVideoReply({id}).then(res=>{
    if(res.success){
      ElMessage({type:'success',message:res.message});
      refresh();
    }else{
      ElMessage({type:'error',message:res.message});
    }
  })
  }

  const userRow:any = ref({});
  const onSubmit = async () => {
    await editUserInfo(userRow.value);
    dialogVisible.value = false;
    isShowEdit.value = false;
    refresh();
  };
  const cancelSubmit = () => {
    dialogVisible.value = false;
    isShowEdit.value = false;
    refresh();
  };

  const refresh = () =>{
    proxy?.$refs?.usertable?.refresh();
  }

  
</script>
<style lang="less" scoped>
  .user_wrapper_mian {
    padding: 20px;
    margin: 0 auto;
  }
  .dialog_content{
    font-size: 18px;
  }
  .reply{
    padding: 0 20px 0 40px;
  }
  .is_null {
    color: #e6a28b;
  }
</style>
