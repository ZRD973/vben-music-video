<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />

    <CropperAvatar
      class="avatar-uploader"
      :uploadApi="uploadApi"
      :value="avatar"
      :showBtn="false"
      @change="updateAvatar"
      width="150"
    />

    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="account" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.userName')"
        />
      </FormItem>
      <FormItem name="name" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.name"
          placeholder="昵称"
        />
      </FormItem>
      <!-- <FormItem name="mobile" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.mobile"
          :placeholder="t('sys.login.mobile')"
          class="fix-auto-fill"
        />
      </FormItem>
      <FormItem name="sms" class="enter-x">
        <CountdownInput
          size="large"
          class="fix-auto-fill"
          v-model:value="formData.sms"
          :placeholder="t('sys.login.smsCode')"
        />
      </FormItem> -->
      <FormItem name="password" class="enter-x">
        <StrengthMeter
          size="large"
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </FormItem>
      <FormItem name="confirmPassword" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.confirmPassword"
          :placeholder="t('sys.login.confirmPassword')"
        />
      </FormItem>

      <!-- No logic, you need to deal with it yourself -->
      <!-- <FormItem class="enter-x" name="policy">
        <Checkbox v-model:checked="formData.policy" size="small">
          {{ t('sys.login.policy') }}
        </Checkbox>
      </FormItem> -->

      <Button
        type="primary"
        class="enter-x"
        size="large"
        block
        @click="handleRegister"
        :loading="loading"
      >
        {{ t('sys.login.registerButton') }}
      </Button>
      <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </Button>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button, message } from 'ant-design-vue';
  import { StrengthMeter } from '/@/components/StrengthMeter';
  import { CropperAvatar } from '/@/components/Cropper';
  import { uploadApi } from '/@/api/sys/upload';
  import { useUserStore } from '/@/store/modules/user';
  import headerImg from '/@/assets/images/header.jpg';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import { registerApi } from '/@/api/sys/user';


  const imageUrl = ref<string>('');
  const userStore = useUserStore();
  const userinfo = userStore.getUserInfo;
  const updateAvatar = ({ data } ) => {
    userinfo.avatar = data.file;
    imageUrl.value = data.file;
    userStore.setUserInfo(userinfo);
  }

  const avatar = computed(() => {
      const { avatar } = userinfo;
      return avatar || headerImg;
  });



  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { handleBackLogin, setLoginState, getLoginState } = useLoginState();
  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    account: '',
    name: '',
    password: '',
    confirmPassword: '',
    // mobile: '',
    // sms: '',
    // policy: false,
  });

  const { getFormRules } = useFormRules(formData);
  const { validForm } = useFormValid(formRef);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);

  async function handleRegister() {
    const data = await validForm();
    if (!data) return;
    data.avatar = imageUrl.value;
    const isRegister = await registerApi(data);
    isRegister.success
      ? message.success(isRegister.message, 2.5)
      : message.error(isRegister.message, 2.5);
    setLoginState(LoginStateEnum.LOGIN);
  }
</script>

<style>
  .avatar-uploader {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
