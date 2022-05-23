<template>
  <div class="table-template">
    <el-table v-bind="$attrs" ref="elTable" :data="$attrs.modelValue?.data">
      <template v-for="(item, index) in tbColumns">
        <el-table-column v-if="item.slotScope" v-bind="item">
          <template #default="scope">
            <slot v-bind="scope" :name="item.prop" :index="index"></slot>
          </template>
        </el-table-column>

        <el-table-column v-else-if="item.Index" :index="indexMethod" v-bind="item" ></el-table-column>
        <el-table-column v-else v-bind="item"></el-table-column>

      </template>
    </el-table>
    <template v-if="pagination && $attrs.modelValue.data?.length > 0">
      <div class="pagination-container">
        <el-pagination
          v-bind="$attrs"
          :background="background"
          :layout="layout"
          v-model:page-size="pageSize"
          v-model:current-page="pageIndex"
          :page-sizes="pageSizes"
          :total="$attrs.modelValue.total || 0"
        ></el-pagination>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import { ref, computed, onMounted, defineComponent,watch } from "vue";
export default defineComponent({
  name: "my-el-table",
  props: {
    data: {
      type: Array,
      default: []
    },
    column: Array,
    columnsProps: Object,
    pagination: {
      type: Boolean,
      default: true
    },
    total: {
      type: [Number,String]
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },
    background: {
      type: Boolean,
      default: false
    },
    autoScroll: {
      type: [String, Boolean],
      default: true
    }
  },
  setup(props, { attrs, emit }) {
    const tbColumns = computed(() => {
      const { column, columnsProps } = attrs.modelValue;
      return column.map(col => {
        const it = Object.assign({}, columnsProps, col);
        return it;
      });
    });

    const pageSizes = computed(() => {
      let width = document.body.clientWidth, height = document.body.clientHeight;
      if (height > 780) {
        return [12, 30, 50, 100, 200];
      } else if (height > 700 || (height > 665 && width <= 1440)) {
        return [10, 20, 30, 50, 100];
      } else {
        return [8, 20, 30, 40, 50];
      }
    });
    const pageIndex = ref(1);
    // 初始条数
    const initPageSize = computed(() => {
      return pageSizes.value[0];
    });
    // 自定义条数
    const propPageSize = attrs.modelValue?.pagesize;
    const pageSize = propPageSize ? ref(propPageSize) : ref(initPageSize.value);
    
    const sendEmit = () =>{
      emit("pagination", { pageIndex: pageIndex.value, pageSize: pageSize.value });
    }

    // 序号列
    const indexMethod = (index) => {
      return (pageIndex.value-1) * pageSize.value + index + 1;
    }

    const refresh = () => {
      if(propPageSize){
        if(pageIndex.value == 1 && pageSize.value == propPageSize){
          sendEmit();
        }else{
          pageIndex.value = 1;
          pageSize.value = propPageSize;
        }
      }else{
          if(pageIndex.value == 1 && pageSize.value == initPageSize.value){
            sendEmit();
          }else{
            pageIndex.value = 1;
            pageSize.value = initPageSize.value;
          }
      }
    };

    watch([pageIndex,pageSize],()=>{ sendEmit() })

    onMounted(() => { sendEmit() });
    return {
      pageIndex,
      pageSize,
      tbColumns,
      pageSizes,
      initPageSize,
      indexMethod,
      refresh
    };
  }
});
</script>

<style scoped lang="less">
.pagination-container {
  background: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
}
</style>
