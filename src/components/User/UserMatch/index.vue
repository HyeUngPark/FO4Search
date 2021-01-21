<template>
  <div class="content">
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
    >
      <a-page-header
        style=""
        title="최근 매치 조회"
        />
        <a-form layout="inline" style="margin-left:20px">
          <a-form-item
            label="닉네임" 
          >
            <a-input 
              placeholder="닉네임" 
              style="margin-left:3px"
              v-model="nickName"
              v-on:keyup.enter ='handleSearch()'
              />
          </a-form-item> 
          <a-form-item>
            <a-button type="primary" v-on:click="handleSearch()"  >
              조회
            </a-button>
          </a-form-item> 
        </a-form>
        <br/>
        <div class="search-result-list">

        </div>
    </a-layout-content>
  </div>
</template>

<script>
import {apiSend}  from "../../_utils/api"
import {checkConsonant, checkSpecial, checkSpace}  from "../../_utils/validation"
import moment from 'moment'
export default {
  name: 'userMatch',
  data () { 
    return {
      nickName : '',
      moment : moment
    }  
  },
  methods: {
    async handleSearch () {
      if(this.nickName !==''){
        var params ={
          nickName : this.nickName
        }
        // validation
        if(checkSpecial(this.nickName)){
          alert('특수문자는 사용할 수 없습니다.')
          return
        }   
        if(checkSpace(this.nickName)){
          alert('공백은 사용할 수 없습니다.')
          return
        }
        if(checkConsonant(this.nickName)){
          alert('자음은 사용할 수 없습니다.')
          return
        }   

        // var result = await apiSend('get','/user/rank',params)
      }else{
        alert('닉네임을 입력해주세요!')
      }
    },
  }
}
</script> 

<style lang="less" scoped>
@import './index.less';
@import "~ant-design-vue/lib/style/themes/default.less";
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
.search-result-list{
  text-align: center;
}
</style>
