<template>
  <div class="content">
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px'}"
    >
      <a-page-header
        title="최근 전적 조회(일반)"
        class="title"
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
          <a-radio-group :options="radioOptions" v-model="mode" @change="modeChange" />
        </a-form>
        <br/>
          <a-table :columns="columns" :data-source="data" class="tb-font">
              <img 
                slot="maxTear"
                slot-scope="maxTear"
                alt='maxTear'
                style="width:70px; height:70px; margin-right:-30px; margin-left:30px"
                :src ='maxTear'
              />
              <a key='opponent' slot="opponent" slot-scope="opponent">{{ opponent }}</a>
              <span slot="opponentController" slot-scope="opponentController" v-if="opponentController ==='keyboard'">
                <img src='../../../assets/keyboard.png'>
              </span>
              <span slot="opponentController" v-else>
                <img src='../../../assets/pad.png'>
              </span>
              <span 
                    id = "matchScore"
                    slot="matchScore" 
                    slot-scope="matchScore"
                    style="margin-right:0px;text-align:right;"
              >
                  {{ matchScore}}
              </span>
              <a-tag id="matchResult" slot="matchResult" slot-scope="matchResult" style="text-align:center"
              :color="(matchResult === '패')|| (matchResult === '몰수패') ? 'volcano' 
                    : matchResult === '승' || (matchResult === '몰수승') ? 'green' : 'geekblue'"
              >
                {{matchResult}}
              </a-tag>
              <span slot="matchDate" 
                slot-scope="matchDate"
              >
                {{moment(matchDate).format('YYYY-MM-DD HH:mm')}}
              </span>
              <a slot="detail" slot-scope="">상세기록</a>
            </a-table>
    </a-layout-content>
  </div>
</template>

<script>
import {checkConsonant, checkSpecial, checkSpace}  from "../../_utils/validation"
import moment from 'moment'
import { mapGetters } from 'vuex'
const columns = [
  {
    title : '대전상대',
    colSpan : 0,
    dataIndex : 'maxTear',
    scopedSlots: { customRender: 'maxTear' },
  },
  {
    title : '대전상대',
    colSpan : 2,
    dataIndex: 'opponent',
    key: 'opponent',
  },
  {
    title : '컨트롤러',
    dataIndex: 'opponentController',
    key: 'opponentController',
    scopedSlots: { customRender: 'opponentController' },    
  },
  {
    title: '스코어&승패',
    key: 'matchScore',
    colSpan: 2,
    dataIndex: 'matchScore',
    scopedSlots: { customRender: 'matchScore' },
    width:60,
    align:'right',
  },
  {
    title: 'matchResult',
    colSpan: 0,
    dataIndex: 'matchResult',
    scopedSlots: { customRender: 'matchResult' },
    width:80,
    align : 'left',
  },
  {
    title: '상대구단가치',
    key: 'bp',
    dataIndex: 'bp',
  },
  {
    title: '매칭일자',
    key: 'matchDate',
    dataIndex: 'matchDate',
    scopedSlots: { customRender: 'matchDate' },
  },
  {
    title: '상세기록',
    key: 'detail',
    scopedSlots: { customRender: 'detail' },
    width : 130,
  },
];
const radioOptions = [
  { label: '공식경기1vs1', value: '50' },
  { label: '클래식1vs1', value: '40' },
  { label: '친선경기', value: '60' },
  { label: '감독모드', value: '52' },
  // { label: '볼타모드', value: '214' },
];
const data = [
// {
//   bp: "32,085,019,620 BP "
// ,changeNickname: "tttesetsttse"
// ,haCd: "h"
// ,matchDate: "2021-01-22T15:15:23"
// ,matchEndType: 0
// ,matchResult: "몰수승"
// ,matchScore: "4:3"
// ,maxTear: "http://s.nx.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank5.png"
// ,opponent: "testtest"
// ,opponentAid: "5bb865586022b271772e060d"
// ,opponentController: "etc"
// },
// {
//   bp: "32,085,019,620 BP "
// ,changeNickname: "asdasdadk"
// ,haCd: "h"
// ,matchDate: "2021-01-22T15:15:23"
// ,matchEndType: 0
// ,matchResult: "패"
// ,matchScore: "1:3"
// ,maxTear: "http://s.nx.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank3.png"
// ,opponent: "asdasdadk"
// ,opponentAid: "5bb865586022b271772e060d"
// ,opponentController: "keyboard"
// },
];

export default {
  name: 'userMatch',
  data () { 
    return {
      nickName : '',
      moment : moment,
      columns,
      data,
      radioOptions,
      mode : '50',
      matchList : []
    }  
  },
    computed: {
    ...mapGetters(['getData'])
  },
  watch: {
    getData(newValue, oldValue) {
      if(newValue && newValue.reCd==='04'){
        alert('일치하는 닉네임이 없습니다.');
        this.data = [];
      }else if(newValue && newValue.reCd ==='01'){
        if(newValue.nickName !== oldValue.nickName){
          // 다른 닉네임을 검색했을 경우
          this.data = [];
        }else if(newValue.mode !== oldValue.mode){
          // 다른 모드를 선택했을경우
          this.data = [];
        }
        this.matchList = newValue.matchList;
        for (var matchInfo of this.matchList){
          let temp = matchInfo.matchDefaultInfo;
          if(temp.matchEndType===1){
            temp.matchResult = '몰수승';
          }else if(temp.matchEndType === 2){
            temp.matchResult = '몰수패';
          }
          this.data.push(temp);
        }
      }
    },
  },
  methods: {
    async handleSearch () {
      if(this.nickName !==''){
        var params ={
          nickName : this.nickName
          ,mode : this.mode
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
          ,uri : '/user/match'
        }

        this.$store.dispatch('FETCH_DATA', payload);
        this.$store.state.LoadingStatus = true;

      }else{
        alert('닉네임을 입력해주세요!')
      }
    },
    modeChange (e)  {
      this.mode = e.target.value;
      console.log(this.mode);
    }
  }
}
</script> 

<style lang="less" scoped>
@import './index.less';
</style>
<style lang="less">
@import "~ant-design-vue/lib/style/themes/default.less";
.ant-table{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: @font-size-base+3.5 !important;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    -webkit-font-feature-settings: 'tnum';
    font-feature-settings: 'tnum';
    position: relative;
    clear: both;  } 

.ant-page-header-heading-title{
  font-size: @font-size-base+9.5;
}
.ant-form{
  padding-top: 1em;
  line-height: 2.5 !important;
}
#matchScore{
  padding-right: 0px;
  margin-right: 0px;
}
// #components-form-demo-advanced-search .search-result-list {
//   margin-top: 16px;
//   border: 1px dashed #e9e9e9;
//   border-radius: 6px;
//   background-color: #fafafa;
//   min-height: 200px;
//   text-align: center;
//   padding-top: 80px;
// }
//Modify list text and background color  

</style>
