<!--
 * @name: 
 * @author: SunSeekerX
 * @Date: 2021-03-27 23:41:33
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2021-05-23 14:08:14
-->
<template>
  <view>
    <button
      v-for="item of list"
      :key="item.url"
      @click="
        $util.router({
          url: item.url,
        })
      "
      >{{ item.name }}</button
    >
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: '等宽字体',
          url: '/pages/module/mono-font/mono-font',
        },
        {
          name: 'icon',
          url: '/pages/module/icon/icon',
        },
      ],
    }
  },
}
</script>

<style></style>
