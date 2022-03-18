<template>
  <PageWrapper title="上传组件示例">
    <BasicUpload
      :maxSize="500"
      multiple
      @change="handleChange"
      :api="uploadVideoToObsApi"
      :emptyHidePreview="true"
      :columns="columns"
      :accept="['flv','avi','mov','mp4','wmv']"
      class="my-5"
    >
    <span>上传服务器</span>
    </BasicUpload>
    <BasicUpload
      :maxSize="500"
      multiple
      @change="handleChange"
      :api="uploadApi"
      :accept="['flv','avi','mov','mp4','wmv']"
      :emptyHidePreview="true"
      :columns="columns"
      class="my-5"
    >
      <span>上传后台</span>
    </BasicUpload>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicUpload } from '/@/components/Upload';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';
  import { uploadApi,uploadVideoToObsApi } from '/@/api/sys/upload';
  import { createTableColumns } from '/@/components/Upload/src/data';
  const columns = createTableColumns().slice(1);
  const { createMessage } = useMessage();
  const handleChange = (list: string[]) => {
    createMessage.info(`已上传文件${JSON.stringify(list)}`);
    console.log(list);
  };
</script>
