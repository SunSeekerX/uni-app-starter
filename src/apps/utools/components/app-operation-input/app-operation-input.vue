<!--
 * 操作输入
 * @author: SunSeekerX
 * @Date: 2021-09-16 15:16:53
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2021-09-17 13:44:21
-->
<template>
  <!-- 输入区 -->
  <label>
    <text class="wd-text-12">{{ operationName }}</text>
    <textarea
      :value="value"
      :placeholder="placeholder"
      class="content-input"
      :style="{
        height: `${inputHeight}px`,
      }"
      maxlength="-1"
      type="text"
      @input="$emit('change', $event.target.value)"
    />
  </label>
</template>

<script>
export default {
  name: 'AppOperationInput',
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    // 操作名
    operationName: {
      type: String,
      required: true,
    },
    // 输入的值
    value: {
      type: [String, Number],
      default: '',
      required: true,
    },
    // placeholder
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    // 输入框高度
    inputHeight: {
      type: [String, Number],
      required: false,
      default: '66',
    },
  },
}
</script>

<style lang="scss" scoped>
.content-input {
  width: 100%;
  margin-top: 6px;
  padding: 6px;
  overflow-y: scroll;
  border: solid 1px #eee;
  border-width: 1px;
  border-style: dashed;
  border-radius: 6px;
  border-color: #ddd;
  font-size: 12px;
  line-height: normal;
}
</style>
