<template>
  <CollapseContainer title="基本设置" :canExpan="false">
    <a-row :gutter="24">
      <a-col :span="14">
        <BasicForm @register="register"></BasicForm>
      </a-col>
      <a-col :span="10">
        <div class="change-avatar">
          <div class="mb-2">头像</div>
          <CropperAvatar
            :uploadApi="uploadApi"
            :value="avatar"
            btnText="更换头像"
            :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
            @change="updateAvatar"
            width="150"
          />
        </div>
      </a-col>
    </a-row>
    <div style="width: 100%">
      <Button class="update_btn" type="primary" @click="handleSubmit"> 修改基本信息 </Button>
    </div>
  </CollapseContainer>
</template>
<script lang="ts">
  import { Button, Row, Col, message } from 'ant-design-vue';
  import { computed, defineComponent, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container';
  import { CropperAvatar } from '/@/components/Cropper';

  import { useMessage } from '/@/hooks/web/useMessage';

  import headerImg from '/@/assets/images/header.jpg';
  import { baseSetschemas } from './data';
  import { useUserStore } from '/@/store/modules/user';
  import { uploadApi } from '/@/api/sys/upload';
  import { editUserInfo } from '/@/api/sys/user';
  import { useRedo } from '/@/hooks/web/usePage';
  export default defineComponent({
    components: {
      BasicForm,
      CollapseContainer,
      Button,
      ARow: Row,
      ACol: Col,
      CropperAvatar,
    },
    setup() {
      const { createMessage } = useMessage();
      const userStore = useUserStore();
      const userinfo = userStore.getUserInfo;

      const [register, { getFieldsValue, setFieldsValue }] = useForm({
        labelWidth: 120,
        schemas: baseSetschemas,
        showActionButtonGroup: false,
      });

      onMounted(async () => {
        setFieldsValue(userinfo);
      });

      const avatar = computed(() => {
         const {origin ,avatar} = userStore.getUserInfo;
         return origin + avatar || headerImg
      });
      function updateAvatar({ data } ) {
        userinfo.avatar = data.file;
        userStore.setUserInfo(userinfo);
      }

      function validPhone(phone) {
        if (!/^1[3456789]\d{9}$/.test(phone)) {
          return false;
        }
        return true;
      }
      const redo = useRedo();
      const handleSubmit = async () => {
        let value = getFieldsValue();
        
        if (!validPhone(value.phone)) {
          message.warning('手机号码格式不正确');
          return;
        }
        if (!value.name) {
          message.warning('昵称不能为空');
          return;
        }
        value.avatar = userinfo.avatar;
        const data = await editUserInfo(value);
        if (data.success) {
          userStore.setUserInfo(data.result);
          createMessage.success('更新成功！');
          redo();
        }
      };
      return {
        avatar,
        register,
        uploadApi: uploadApi as any,
        updateAvatar,
        handleSubmit,
      };
    },
  });
</script>

<style lang="less" scoped>
  .change-avatar {
    img {
      display: block;
      margin-bottom: 15px;
      border-radius: 50%;
    }
  }
  .update_btn {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
