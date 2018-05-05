<template>
  <div class="item">
    <label for="myDate">向前看</label>
    <date-picker field="myDate" placeholder="选择日期"
                 :forward="true"
                 v-model="date1"
                 :format="format">

    </date-picker>
  </div>
  <div class="item">
    <label for="myDate">时至今日</label>
    <date-picker field="myDate" placeholder="选择日期"
                 :backward="true"
                 v-model="date2"
                 :format="format">

    </date-picker>
  </div>
  <div class="item">
    <label for="myDate">今天不行</label>
    <date-picker field="myDate" placeholder="选择日期"
                 :no-today="true"
                 v-model="date3"
                 :format="format">
    </date-picker>
  </div>
</template>
