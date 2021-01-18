<template>
  <div class="content">
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
    >
      <a-page-header
        style=""
        title="최고티어조회"
        />
        <a-form layout="inline" style="margin-left:20px">
          <a-form-item
            label="닉네임" 
          >
            <a-input 
              placeholder="닉네임" 
              style="margin-left:3px"
              v-model="nickName"
              />
          </a-form-item> 
          <a-form-item>
            <a-button type="primary" v-on:click="handleSearch">
              조회
            </a-button>
          </a-form-item> 
        </a-form>
        <br/>
        <div class="search-result-list" v-if="rankData[0]!=''">
          <a-list style="align:center">
            <a-list-item>
              <a-card title='공식경기'>
                <span v-if="rankData[0]!=null">
                  {{rankData[0].divisionName}}<br/>
                  등급 달성일 : {{moment(rankData[0].achievementDate).format('YYYY-MM-DD')}}
                </span>
                <span v-else>기록이 없습니다.</span>
              </a-card>
              <a-card title='감독모드'>
                <span v-if="rankData[1]!=null">
                  {{rankData[1].divisionName}}<br/>
                  등급 달성일 : {{moment(rankData[1].achievementDate).format('YYYY-MM-DD')}}
                </span>
                <span v-else>기록이 없습니다.</span>
              </a-card>
              <a-card title='볼타모드'>
                <span v-if="rankData[2]!=null">
                  {{rankData[2].divisionName}}<br/>
                  등급 달성일 : {{moment(rankData[2].achievementDate).format('YYYY-MM-DD')}}
                </span>
                <span v-else>기록이 없습니다.</span>
              </a-card>
            </a-list-item>
          </a-list>
        </div>
    </a-layout-content>
  </div>
</template>

<script>
import {apiSend}  from "../../_utils/api"
import moment from 'moment'
export default {
  name: 'userRank',
  data () { 
    return {
      // formLayout: 'horizontal',
      nickName : ''
      ,rankData: ['','','']
      ,moment : moment
    }  
  },
  methods: {
    async handleSearch () {
      if(this.nickName !==''){
        var params ={
          nickName : this.nickName
        }
        var result = await apiSend('get','/user/rank',params)
        console.log(result)
        this.rankData = result.rank
      }else{
        alert('닉네임을 입력해주세요!')
      }
    },
  }
}
</script> 

<style lang="less" scoped>
@import './index.less';
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
</style>
