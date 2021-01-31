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
        <div class="search-result-list" v-if="this.$store.state && this.$store.state.data && this.$store.state.data.reCd=='01'">
          <a-list>
            <a-list-item>
              <a-card title='공식경기'>
                <span v-if="this.$store.state.data.rank[0].division!=null">
                  <span><img :src="getRankImage('sc',this.$store.state.data.rank[0].division)" style="width:40px; height:40px"/></span><br/>
                  {{this.$store.state.data.rank[0].divisionName}}<br/>
                  등급 달성일 : {{moment(this.$store.state.data.rank[0].achievementDate).format('YYYY-MM-DD')}}
                </span>
                <span v-else>
                  <span><img :src="getRankImage('sc',1)" style="width:40px; height:40px" /></span><br/><br/>
                  기록이 없습니다.
                </span>
              </a-card>
              <a-card title='감독모드'>
                <span v-if="this.$store.state.data.rank[1].division!=null">
                  <span><img :src="getRankImage('sc',this.$store.state.data.rank[1].division)" style="width:40px; height:40px"/></span><br/>
                  {{this.$store.state.data.rank[1].divisionName}}<br/>
                  등급 달성일 : {{moment(this.$store.state.data.rank[1].achievementDate).format('YYYY-MM-DD')}}
                </span>
                <span v-else>
                  <span><img :src="getRankImage('sc',1)" style="width:40px; height:40px" /></span><br/><br/>
                  기록이 없습니다.
                </span>
              </a-card>
              <a-card title='볼타모드'>
                                <span v-if="this.$store.state.data.rank[2].division!=null">
                  <span><img :src="getRankImage('vt',this.$store.state.data.rank[2].division)" style="width:40px; height:40px"/></span><br/>
                  {{this.$store.state.data.rank[0].divisionName}}<br/>
                  등급 달성일 : {{moment(this.$store.state.data.rank[2].achievementDate).format('YYYY-MM-DD')}}
                </span>
                <span v-else>
                  <span><img :src="getRankImage('vt',1)" style="width:40px; height:40px" /></span><br/><br/>
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
import {checkConsonant, checkSpecial, checkSpace}  from "../../_utils/validation"
import {getRankImage}  from "../../_utils/image"
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  name: 'userRank',
  data () { 
    return {
      // formLayout: 'horizontal',
      nickName : ''
      ,moment : moment
      ,getRankImage : getRankImage
    }  
  },
  computed: {
    ...mapGetters(['getData'])
  },
  watch: {
    getData(newValue, oldValue) {
      if(newValue && newValue.reCd==='04'){
        alert('일치하는 닉네임이 없습니다.');
      }
    },
  },
  methods: {
    async handleSearch () {
      if(this.nickName !==''){
        const params ={
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

        let payload ={
          method : 'get'
          ,params : params
          ,uri : '/user/rank'
        }

        this.$store.dispatch('FETCH_DATA', payload);
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
