<template>
   <div></div>
</template>

<script>
import { defineComponent } from 'vue'
import { ElCard, ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'

export default defineComponent({
  name: 'Login',
  components: {
    ElCard,
    ElForm,
    ElFormItem,
    ElInput,
    ElButton
  },
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 登录逻辑
        }
      })
    }
  }
})
</script>

<style>[ant-click-animating-without-extra-node]:after { border-color: rgb(253, 75, 77); }</style>
