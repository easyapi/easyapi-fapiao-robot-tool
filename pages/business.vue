<script lang="ts" setup>
import {onMounted, reactive, watch} from "vue"
import area from '@/api/area'
import {unitOfAreaList} from "~/utils/business"
import {idTypes, planeLevels, shippingLevels, trainLevels, transportKinds, vehicleTypes} from "../utils/business";
import {ElMessage} from "element-plus";
import {transformData} from "../utils/fn";

const props = defineProps(['modelValue', 'specificBusinessCode'])
const emit = defineEmits(['update:modelValue'])

const state = reactive({
  purchaseRate:'',
  specificBusiness: null as any,
  areaList: [] as any,
  formData:{},
})


/**
 * 获取省市区地址
 */
function getChinaTaxAreaList() {
  area.getChinaTaxAreaList().then((res) => {
    state.areaList = res
    transformData(state.areaList)
    if (props.specificBusinessCode === '03')
      state.areaList.push({ label: '境内海域', value: '境内海域' }, { label: '境外', value: '境外' })
  })
}

onMounted(() => {
  getChinaTaxAreaList()
})

watch(
  () => props.specificBusinessCode,
  (value) => {
    if (value) {
      if (value === '09' || value === '04') {
        state.specificBusiness = [{}]
      } else {
        state.specificBusiness = { intercityFlag: false }
      }
      getChinaTaxAreaList()
    }
  },
  { immediate: true },
)

watch(
  () => props.modelValue,
  (value) => {
    state.specificBusiness = value
  },
  { immediate: true },
)

watch(
  () => state.specificBusiness,
  (value) => {
    emit('update:modelValue', value)
  },
  { immediate: true },
)

function addRow() {
  if (state.specificBusiness.length >= 500) {
    ElMessage.warning('上限500条')
  }
  state.specificBusiness.push({})
}

function deleteRow(index: any) {
  state.specificBusiness.splice(index, 1)
}

function changeBusinessDate(value: any) {
  if (value && value.length > 0) {
    state.specificBusiness.startDate = value[0]
    state.specificBusiness.endDate = value[1]
  } else {
    state.specificBusiness.startDate = ''
    state.specificBusiness.endDate = ''
  }
}
function changeVehicleType(row: any) {
  row.level = ''
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
              class="ml-4 pr-8"
              style="width: 235px"
            />
          </div>
        </el-form-item>
        <el-form-item label="租赁期起止：" class="w-1/2 pl-10" required>
          <div class="w-full flex">
            <el-date-picker
              v-model="state.specificBusiness"
              type="daterange"
              start-placeholder="起始日期"
              range-separator="-"
              end-placeholder="截至日期"
              value-format="YYYY-MM-DD"
              @change="changeBusinessDate"
              class="w-full"
            />
          </div>
        </el-form-item>
        <el-form-item label="产权证书/不动产权证号：" class="w-1/2" required>
          <el-input
            v-model="state.purchaseRate"
            placeholder="请输入证书编号，若没有需填写&quot;无&quot;"
            class=" mr-2 w-full"
          />
        </el-form-item>
        <el-form-item label="面积单位：" class="w-1/2 pl-10" required>
            <el-select
              v-model="state.specificBusiness"
              placeholder="请选择"
              class="w-full"
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
              style="width: 423px"
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
                v-model="state.specificBusiness.projectNumber"
                placeholder="请输入土地增值税项目编号"
                class="w-full"
              />
          </el-form-item>
          <el-form-item label="建筑服务发生地：" class="w-1/2 pl-8" required>
            <div class="flex">
              <el-cascader
                v-model="state.specificBusiness.serviceArea"
                :options="state.areaList"
              />
              <el-input
                v-model="state.specificBusiness.serviceAddress"
                placeholder="请输入详细地址"
                class="ml-4 w-full"
              />
            </div>
          </el-form-item>
          <el-form-item label="建筑项目名称：" class="w-1/2" required>
            <el-input
              v-model="state.specificBusiness.projectName"
              placeholder="请输入建筑项目名称"
              class=" ml-6 w-full"
            />
          </el-form-item>
          <el-form-item label="跨地（市）标志：" class="w-1/2 pl-8" required>
            <div class="flex">
              <el-select
                v-model="state.specificBusiness.intercityFlag"
                placeholder="请选择"
                class="w-full"
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
              v-model="state.specificBusiness.propertyContractNumber"
              placeholder="请输入不动产单元代码/网签合同备案编号"
              class=" mr-2 w-full"
            />
          </el-form-item>
          <el-form-item label="不动产地址：" class="w-1/2 pl-8" required>
            <div class="flex">
              <el-cascader
                v-model="state.specificBusiness.area"
                :options="state.areaList"
              />
              <el-input
                v-model="state.specificBusiness.address"
                placeholder="请输入详细地址"
                class="ml-4"
                style="width: 370px"
              />
            </div>
          </el-form-item>
          <el-form-item label="产权证书/不动产权证号：" class="w-1/2" required>
            <el-input
              v-model="state.specificBusiness.propertyNumber"
              placeholder="请输入证书编号，若没有需填写&quot;无&quot;"
              class=" mr-2 w-full"
            />
          </el-form-item>
          <el-form-item label="面积单位：" class="w-1/2 pl-8" required>
            <el-select
              v-model="state.specificBusiness.unit"
              placeholder="请选择"
              class="w-full"
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
                v-model="state.specificBusiness.intercityFlag"
                placeholder="请选择"
                style="width: 425px"
              >
                <el-option label="是" :value="true" />
                <el-option label="否" :value="false" />
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="土地增值税项目编号：" class="w-1/2 pl-8">
            <el-input
              v-model="state.specificBusiness.projectNumber"
              placeholder="请输入土地增值税项目编号"
              class="w-full"
            />
          </el-form-item>
          <el-form-item label="核定计税价格：" class="w-1/2">
            <el-input
              v-model="state.specificBusiness.price"
              placeholder="请输入核定计税价格"
              class="w-full"
            />
          </el-form-item>
          <el-form-item label="实际成交含税金额：" class="w-1/2 pl-8">
            <el-input
              v-model="state.specificBusiness.taxAmount"
              placeholder="请输入实际成交含税金额"
              class="ml-1 w-full"
            />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
  <!--货物运输服务-->
  <div v-if="props.specificBusinessCode === '04'" class="border my-4 flex">
  <div class="w-full px-4 pt-4 mr-4">
    <div class="invoice-business">
      特定信息-货物运输服务
    </div>
    <div class="w-full business-box">
      <el-table :data="state.specificBusiness" border>
        <el-table-column label="运输工具种类" align="center">
          <template #default="scope">
            <el-select
              v-model="scope.row.transportKind"
              placeholder="请选择运输工具种类"
              class="business w-full"
            >
              <el-option
                v-for="item in transportKinds"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="运输工具牌号" align="center">
          <template #default="scope">
            <el-input
              v-model="scope.row.transportNumber"
              placeholder="请输入运输工具牌号"
            />
          </template>
        </el-table-column>
        <el-table-column label="起运地" align="center">
          <template #default="scope">
            <el-cascader
              v-model="scope.row.departurePlace"
              :options="state.areaList"
              placeholder="请选择起运地"
              class="w-full"
            />
          </template>
        </el-table-column>
        <el-table-column label="到达地" align="center">
          <template #default="scope">
            <el-cascader
              v-model="scope.row.destinationPlace"
              :options="state.areaList"
              placeholder="请选择到达地"
              class="w-full"
            />
          </template>
        </el-table-column>
        <el-table-column label="运输货物名称" align="center">
          <template #default="scope">
            <el-input
              v-model="scope.row.goodsName"
              placeholder="请输入运输货物名称"
            />
          </template>
        </el-table-column>
        <el-table-column width="120" label="操作" align="center">
          <template #default="scope">
            <div class="flex items-center">
              <span v-if="scope.$index === state.specificBusiness.length - 1" class="operate-btn" @click="addRow">增</span>
              <span v-if="state.specificBusiness.length !== 1" class="operate-btn" @click="deleteRow(scope.$index)">删</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  </div>
  <!-- 旅客运输服务 -->
  <div v-if="props.specificBusinessCode === '09'" class="w-full border-l">
    <div class="invoice-business border-r">
      特定信息-旅客运输服务
    </div>
    <div class="invoice-check-table_tbody">
      <el-table :data="state.specificBusiness" border>
        <el-table-column label="出行人" align="center">
          <template #default="scope">
            <el-input
              v-model="scope.row.traveler"
              placeholder="请输入出行人"
            />
          </template>
        </el-table-column>
        <el-table-column label="出行日期" align="center">
          <template #default="scope">
            <el-date-picker
              v-model="scope.row.travelDate"
              class="business"
              value-format="YYYY-MM-DD"
              type="date"
              placeholder="请选择出行日期"
            />
          </template>
        </el-table-column>
        <el-table-column label="出行人证件类型" align="center">
          <template #default="scope">
            <el-select
              v-model="scope.row.idType"
              placeholder="请选择出行人证件类型"
              class="business w-full"
            >
              <el-option
                v-for="item in idTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="出行人证件号码" align="center">
          <template #default="scope">
            <el-input
              v-model="scope.row.idNumber"
              placeholder="请输入出行人证件号码"
            />
          </template>
        </el-table-column>
        <el-table-column label="出发地" align="center">
          <template #default="scope">
            <el-cascader
              v-model="scope.row.departurePlace"
              :options="state.areaList"
              placeholder="请选择出发地"
              class="w-full"
            />
          </template>
        </el-table-column>
        <el-table-column label="到达地" align="center">
          <template #default="scope">
            <el-cascader
              v-model="scope.row.destinationPlace"
              :options="state.areaList"
              placeholder="请选择到达地"
              class="w-full"
            />
          </template>
        </el-table-column>
        <el-table-column label="交通工具类型" align="center">
          <template #default="scope">
            <el-select
              v-model="scope.row.vehicleType"
              placeholder="请选择交通工具类型"
              class="business w-full"
              @change="changeVehicleType(scope.row)"
            >
              <el-option
                v-for="item in vehicleTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="等级" align="center">
          <template #default="scope">
            <el-select
              v-if="scope.row.vehicleType === 1"
              v-model="scope.row.level"
              placeholder="请选择等级"
              class="business w-full"
            >
              <el-option
                v-for="item in planeLevels"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select
              v-else-if="scope.row.vehicleType === 7"
              v-model="scope.row.level"
              placeholder="请选择等级"
              class="business w-full"
            >
              <el-option
                v-for="item in shippingLevels"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select
              v-else-if="scope.row.vehicleType === 2"
              v-model="scope.row.level"
              placeholder="请选择等级"
              class="business w-full"
            >
              <el-option
                v-for="item in trainLevels"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-input
              v-else
              v-model="scope.row.level"
              placeholder="请输入等级"
            />
          </template>
        </el-table-column>
        <el-table-column width="120" label="操作" align="center">
          <template #default="scope">
            <div class="flex items-center">
              <span v-if="scope.$index === state.specificBusiness.length - 1" class="operate-btn" @click="addRow">增</span>
              <span v-if="state.specificBusiness.length !== 1" class="operate-btn" @click="deleteRow(scope.$index)">删</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
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