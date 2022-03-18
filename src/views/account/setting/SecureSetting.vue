<template>
  <CollapseContainer title="安全设置" :canExpan="false">

    <PageWrapper class="" title="修改密码" content="修改成功后会自动退出当前登录！">
    <div class="py-8 bg-white flex flex-col justify-center items-center center">
      <BasicForm @register="register" />
      <div class="flex justify-center center">
        <a-button @click="resetFields"> 重置 </a-button>
        <a-button class="!ml-4" type="primary" @click="handleSubmit"> 确认 </a-button>
      </div>
    </div>
  </PageWrapper>
  </CollapseContainer>
</template>
<script lang="ts" setup>
  import { createVNode } from 'vue';
  import { CollapseContainer } from '/@/components/Container/index';
  import { Modal, message } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form';
  import { FormSchema } from '/@/components/Form';
  import { useRouter } from 'vue-router';
  import { PageEnum } from '/@/enums/pageEnum';
  import { changePswApi } from '/@/api/sys/user';
  import { useUserStore } from '/@/store/modules/user';
  const userStore = useUserStore();
  const  router  = useRouter();

  const formSchema: FormSchema[] = [
  {
    field: 'passwordOld',
    label: '当前密码',
    component: 'InputPassword',
    required: true,
  },
  {
    field: 'passwordNew',
    label: '新密码',
    component: 'StrengthMeter',
    componentProps: {
      placeholder: '新密码',
    },
    rules: [
      {
        required: true,
        message: '请输入新密码',
      },
    ],
  },
  {
    field: 'confirmPassword',
    label: '确认密码',
    component: 'InputPassword',

    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('不能为空');
            }
            if (value !== values.passwordNew) {
              return Promise.reject('两次输入的密码不一致!');
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
];

const [register, { validate, resetFields }] = useForm({
    size: 'large',
    labelWidth: 100,
    showActionButtonGroup: false,
    schemas: formSchema,
  });

async function handleSubmit() {
  try {
    const values = await validate();
    const { passwordOld, passwordNew } = values;

    // TODO custom api
    console.log(passwordOld, passwordNew);

    if (userStore.userInfo) {
    values.account = userStore.userInfo.account;
    Modal.confirm ({
      title: () => '修改密码',
      icon: () => createVNode(ExclamationCircleOutlined),
      content: () => '请记住自己的密码哦，点击确定后修改密码！',
      onOk: async ()=> {
        const data = await changePswApi(values);
        if(data.success){
          message.success(data.message, 2.5)
          resetFields();  
          userStore.setToken(undefined);
          userStore.setSessionTimeout(false);
          userStore.setUserInfo(null);
          router.push(PageEnum.BASE_LOGIN);
        }else{
          message.error(data.message, 2.5);
        }
      },
      onCancel() {
        resetFields()
      },
    });
  }
  } catch (error) {}
}

</script>
<style lang="less" scoped>
  .center{
    width: 50%;
  }
  :deep(.ant-page-header){
    padding-bottom: 0 !important;
  }
</style>
