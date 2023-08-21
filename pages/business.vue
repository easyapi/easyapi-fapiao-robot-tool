<script lang="ts" setup>
import {reactive} from "vue"
import area from '@/api/area'
import {unitOfAreaList} from "~/utils/business"

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
    <div class="w-full px-4 pt-4 mr-4">
    <div class="invoice-business">
      特定信息-不动产经营租赁服务
    </div>
    <div class="w-full business-box">
      <el-form
        class="mt-4 flex-wrap flex"
        ref="form"
        :model="state.formData"
        label-position="left"
        >
        <el-form-item label="不动产地址：" class="w-1/2" required>
          <div class="flex">
            <el-cascader
              v-model="state.purchaseRate"
              :options="state.areaList"
            />
            <el-input
              v-model="state.purchaseRate"
              placeholder="请输入详细地址"
              class="ml-4"
            />
          </div>
        </el-form-item>
        <el-form-item label="租赁期起止：" class="w-1/2 pl-6" required>
          <div class="w-full flex">
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
        <el-form-item label="产权证书/不动产权证号：" class="w-1/2" required>
          <el-input
            v-model="state.purchaseRate"
            placeholder="请输入证书编号，若没有需填写&quot;无&quot;"
            class=" mr-2"
            style="width: 318px"
          />
        </el-form-item>
        <el-form-item label="面积单位：" class="w-1/2 pl-6" required>
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
        </el-form-item>
        <el-form-item label="跨地（市）标志：" class="w-1/2" required>
          <div class="flex">
            <el-select
              v-model="state.specificBusiness"
              placeholder="请选择"
            >
              <el-option label="是" :value="true" />
              <el-option label="否" :value="false" />
            </el-select>
          </div>
        </el-form-item>
      </el-form>
    </div>
      </div>
  </div>
  <!--建筑服务-->
  <div v-if="props.specificBusinessCode === '03'" class="border my-4 flex">
    <div class="w-full px-4 pt-4 mr-4">
      <div class="invoice-business">
        特定信息-建筑服务
      </div>
      <div class="w-full business-box">
        <el-form
          class="mt-4 flex-wrap flex"
          ref="form"
          :model="state.formData"
          label-position="left"
        >
          <el-form-item label="土地增值税项目编号：" class="w-1/2">
              <el-input
                v-model="state.specificBusiness"
                placeholder="请输入土地增值税项目编号"
                style="width: 310px"
              />
          </el-form-item>
          <el-form-item label="建筑服务发生地：" class="w-1/2" required>
            <div class="flex">
              <el-cascader
                v-model="state.specificBusiness"
                :options="state.areaList"
              />
              <el-input
                v-model="state.specificBusiness"
                placeholder="请输入详细地址"
                class="ml-4"
              />
            </div>
          </el-form-item>
          <el-form-item label="建筑项目名称：" class="w-1/2" required>
            <el-input
              v-model="state.specificBusiness"
              placeholder="请输入建筑项目名称"
              class=" ml-6"
              style="width: 318px"
            />
          </el-form-item>
          <el-form-item label="跨地（市）标志：" class="w-1/2" required>
            <div class="flex">
              <el-select
                v-model="state.specificBusiness"
                placeholder="请选择"
              >
                <el-option label="是" :value="true" />
                <el-option label="否" :value="false" />
              </el-select>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
  <!--不动产销售-->
  <div v-if="props.specificBusinessCode === '05'" class="border my-4 flex">
    <div class="w-full px-4 pt-4 mr-4">
      <div class="invoice-business">
        特定信息-不动产销售
      </div>
      <div class="w-full business-box">
        <el-form
          class="mt-4 flex-wrap flex"
          ref="form"
          :model="state.formData"
          label-position="left"
        >
          <el-form-item label="不动产单元代码/网签合同备案编号：" class="w-1/2" required>
            <el-input
              v-model="state.specificBusiness"
              placeholder="请输入不动产单元代码/网签合同备案编号"
              class=" mr-2"
              style="width: 318px"
            />
          </el-form-item>
          <el-form-item label="不动产地址：" class="w-1/2" required>
            <div class="flex">
              <el-cascader
                v-model="state.specificBusiness"
                :options="state.areaList"
              />
              <el-input
                v-model="state.specificBusiness"
                placeholder="请输入详细地址"
                class="ml-4"
              />
            </div>
          </el-form-item>
          <el-form-item label="产权证书/不动产权证号：" class="w-1/2" required>
            <el-input
              v-model="state.specificBusiness"
              placeholder="请输入证书编号，若没有需填写&quot;无&quot;"
              class=" mr-2"
              style="width: 318px"
            />
          </el-form-item>
          <el-form-item label="面积单位：" class="w-1/2 pl-6" required>
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
          </el-form-item>
          <el-form-item label="跨地（市）标志：" class="w-1/2" required>
            <div class="flex">
              <el-select
                v-model="state.specificBusiness"
                placeholder="请选择"
              >
                <el-option label="是" :value="true" />
                <el-option label="否" :value="false" />
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="土地增值税项目编号：" class="w-1/2">
            <el-input
              v-model="state.specificBusiness"
              placeholder="请输入土地增值税项目编号"
              style="width: 310px"
            />
          </el-form-item>
          <el-form-item label="核定计税价格：" class="w-1/2">
            <el-input
              v-model="state.specificBusiness"
              placeholder="请输入核定计税价格"
              style="width: 290px"
            />
          </el-form-item>
          <el-form-item label="实际成交含税金额：" class="w-1/2 pl-2">
            <el-input
              v-model="state.specificBusiness"
              placeholder="请输入实际成交含税金额"
              style="width: 310px"
              class="ml-1"
            />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.business-box {
  :deep(.el-form-item__content){
    width: 100%;
  }
}

</style>