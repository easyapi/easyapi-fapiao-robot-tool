<script lang="ts" setup>
import {reactive} from "vue";
import area from '@/api/area'
import {unitOfAreaList} from "~/utils/business";

const props = defineProps(['modelValue', 'specificBusinessCode'])
const emit = defineEmits(['update:modelValue'])

const state = reactive({
  purchaseRate:'',
  specificBusiness: null as any,
  areaList: [] as any,
  formData:{},
})
function changeBusinessDate(value: any) {
  if (value && value.length > 0) {
    state.specificBusiness.startDate = value[0]
    state.specificBusiness.endDate = value[1]
  } else {
    state.specificBusiness.startDate = ''
    state.specificBusiness.endDate = ''
  }
}

</script>

<template>
  <!--不动产经营租赁服务-->
  <div v-if="props.specificBusinessCode === '06'" class="border my-4 flex">
    <div class="w-1/2 px-4 pt-4 mr-4">
    <div class="invoice-business">
      特定信息-不动产经营租赁服务
    </div>
    <div>
      <el-form
        ref="form"
        :model="state.formData"
        label-width="auto"
        >
        <el-form-item label="不动产地址：" required>
          <div class="w-1/2 px-4 pt-4 mr-4 flex">
            <el-cascader
              v-model="state.purchaseRate"
              :options="state.areaList"
            />
            <el-input
              v-model="state.purchaseRate"
              placeholder="请输入详细地址"
              class="ml-2 w-"
            />
          </div>
        </el-form-item>
        <el-form-item label="租赁期起止：" required>
          <div class="flex">
          <el-date-picker
            v-model="state.specificBusiness"
            type="daterange"
            start-placeholder="起始日期"
            range-separator="-"
            end-placeholder="截至日期"
            value-format="YYYY-MM-DD"
            @change="changeBusinessDate"
          />
          </div>
        </el-form-item>
      </el-form>

    </div>
    <div>
      <span class="text-red-600">*</span>
      <span>产权证书/不动产权证号：</span>
      <el-input
        v-model="state.specificBusiness"
        placeholder="请输入证书编号，若没有需填写&quot;无&quot;"
        style="max-width: 460px"
      />
    </div>
    <div>
      <span class="text-red-600">*</span>
      <span>面积单位：</span>
      <el-select
        v-model="state.specificBusiness"
        placeholder="请选择"
      >
        <el-option
          v-for="item in unitOfAreaList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div>
      <span class="text-red-600">*</span>
      <span>跨地（市）标志：</span>
      <el-select
        v-model="state.specificBusiness"
        placeholder="请选择"
        style="max-width: 460px"
      >
        <el-option label="是" :value="true" />
        <el-option label="否" :value="false" />
      </el-select>
    </div>
      </div>
  </div>
</template>
<style scoped>

</style>