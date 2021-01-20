<template>
  <div class="content">
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
    >
      <a-page-header
        style=""
        title="역대 최고티어 조회"
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
        <div class="search-result-list" v-if="rankData[0]!=''">
          <a-list>
            <a-list-item>
              <a-card title='공식경기'>
                <span v-if="rankData[0].division!=null">
                  <span><img :src="rankData[0].rankImage" style="width:40px; height:40px"/></span><br/>
                  {{rankData[0].divisionName}}<br/>
                  등급 달성일 : {{moment(rankData[0].achievementDate).format('YYYY-MM-DD')}}
                </span>
                <span v-else>
                  <span><img :src="rankData[0].rankImage" style="width:40px; height:40px" /></span><br/><br/>
                  기록이 없습니다.
                </span>
              </a-card>
              <a-card title='감독모드'>
                <span v-if="rankData[1].division!=null">
                  <span><img :src="rankData[1].rankImage" style="width:40px; height:40px"/></span><br/>
                  {{rankData[1].divisionName}}<br/>
                  등급 달성일 : {{moment(rankData[1].achievementDate).format('YYYY-MM-DD')}}
                </span>
                <span v-else>
                  <span><img :src="rankData[1].rankImage" style="width:40px; height:40px"/></span><br/><br/>
                  기록이 없습니다.
                </span>
              </a-card>
              <a-card title='볼타모드'>
                <span v-if="rankData[2].division != null">
                  <span><img :src="rankData[2].rankImage" style="width:40px; height:40px"/></span><br/>
                  {{rankData[2].divisionName}}<br/>
                  등급 달성일 : {{moment(rankData[2].achievementDate).format('YYYY-MM-DD')}}
                </span>
                <span v-else>
                  <span><img :src="rankData[2].rankImage" style="width:40px; height:40px"/></span><br/><br/>
                  기록이 없습니다.
                </span>
              </a-card>
            </a-list-item>
          </a-list>
        </div>
    </a-layout-content>
  </div>
</template>

<script>
import {apiSend}  from "../../_utils/api"
import {checkConsonant, checkSpecial, checkSpace}  from "../../_utils/validation"
import {getRankImage}  from "../../_utils/image"
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

        var result = await apiSend('get','/user/rank',params)
        console.log(result)
        if(result.reCd ==='04'){
          alert('일치하는 닉네임이 없습니다.');
          this.rankData = ['','','']
        }else if(result.reCd ==='01'){
          
          if(result.rank[0] !=null){
            result.rank[0].rankImage = getRankImage('sc',result.rank[0].division)
          }else{
            result.rank[0]= {rankImage : getRankImage('sc',1)}
          }
          if(result.rank[1]!=null){
            result.rank[1].rankImage = getRankImage('sc',result.rank[1].division)
          }else{
            result.rank[1]= {rankImage : getRankImage('sc',1)}
          }
          if(result.rank[2]!=null){
            result.rank[2].rankImage = getRankImage('vt',result.rank[2].division)
          }else{
            result.rank[2]= {rankImage : getRankImage('sc',1)}
          }
          this.rankData = result.rank
        }
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
