<template>
  <div class="content">
    <a-layout-content
      :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px'}"
    >
      <a-page-header
        title="최근 전적 조회(볼타)"
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
           <a-card>
            <a-row class="listContentItem a-font-sizeup a-center">
                    <a-col :sm="3" :xs="10">
                        <div class="headerInfo">
                            <span>사용한선수</span>
                        </div>
                    </a-col>
                    <a-col :sm="5" :xs="10">
                        <div class="headerInfo">
                            <span>결과</span>
                        </div>
                    </a-col>
                    <a-col :sm="2" :xs="10">
                        <div class="headerInfo">
                            <span>일자</span>
                        </div>
                    </a-col>
                    <a-col :sm="4" :xs="10">
                        <div class="headerInfo">
                            <span>골/어시스트/평점</span>
                        </div>
                    </a-col>
                    <a-col :sm="2" :xs="10">
                        <div class="headerInfo">
                            <span>우리팀</span>
                        </div>
                    </a-col>
                    <a-col :sm="7" :xs="10">
                        <div class="headerInfo">
                            <span>상대팀</span>
                        </div>
                    </a-col>
                </a-row>
            </a-card>
            <a-card
                class="listCard"
                :bodyStyle="{ padding: '0 20px 0px 20px' }"
            >
                <a-list
                    size="large"
                    rowKey="id"
                >
                    <a-list-item>
                      <div class="listContentItem a-center a-max-width a-font-sizeup ">
                          <a-avatar src='https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p234041236.png' size="large" />
                          <br/>
                          <img src='http://s.nx.com/s2/game/fo4/obt/externalAssets/season/lh.png'/>
                           Z.이브라히모비치 <span class="square" style="background:#c2c5ca">+5</span>
                          <br/>
                          <span class="a-font-sizeup ">FW</span>
                      </div>
                      <div class="listContentItem a-font-sizeup">
                        5 : 4 
                      <a-tag 
                            style="text-align:center"
                            :color="(matchResult === '패')|| (matchResult === '몰수패') ? 'volcano' 
                                    : matchResult === '승' || (matchResult === '몰수승') ? 'green' : 'geekblue'"
                      >
                        승
                      </a-tag>
                      </div>
                      <div class="listContentItem a-font-sizeup">
                          {{ moment('2020-07-02T04:49:37').format('YYYY-MM-DD HH:mm') }}
                      </div>
                      <div class="listContentItem a-center a-font-sizeup">
                        4 / 2 <br/>9.6점
                      </div>
                      <div class="listContentItem">
                        <span>
                          <a-avatar
                            src="http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank2.png"
                          />
                              <a>programming</a>
                              FW 8.5
                          </span><br/>
                          <span  >
                              <a-avatar
                                src="http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank2.png"
                                      />
                                      <a>programming</a>
                                      FW 10.0
                                  </span ><br/>
                                  <span>
                                      <a-avatar
                                        src="http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank2.png"
                                      />
                                      <a>programming</a>
                                      MF 10.0
                                  </span><br/>
                                  <span >
                                      <a-avatar
                                        src="http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank2.png"
                                      />
                                      <a>programming</a>
                                      DF 7.7
                                  </span>
                          </div>
                      <div class="listContentItem">
                        <span>
                          <a-avatar
                            src="http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank2.png"
                          />
                              <a>programming</a>
                              FW 8.5
                          </span><br/>
                          <span  >
                              <a-avatar
                                src="http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank2.png"
                                      />
                                      <a>programming</a>
                                      FW 10.0
                                  </span ><br/>
                                  <span>
                                      <a-avatar
                                        src="http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank2.png"
                                      />
                                      <a>programming</a>
                                      MF 10.0
                                  </span><br/>
                                  <span >
                                      <a-avatar
                                        src="http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank2.png"
                                      />
                                      <a>programming</a>
                                      DF 7.7
                                  </span>
                                  
                          </div>
                      <div class="listContentItem a-font-sizeup">
                        <a>상세보기</a>
                      </div>
                    </a-list-item>
                    <a-list-item>
                      <div class="listContentItem a-center a-font-sizeup a-max-width">
                          <a-avatar src='https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p221203376.png' size="large" />
                          <br/>
                          <img src='http://s.nx.com/s2/game/fo4/obt/externalAssets/season/19ucl.png'/>
                           버질 반다이크
                          <span class="square a-font-sizeup " style="background:#c37653">+3</span><br/>
                          <span class="a-font-sizeup ">DF</span>
                      </div>
                      <div class="listContentItem a-font-sizeup">
                        0 : 4 
	                    <a-tag 
                            style="text-align:center"
                            :color="'volcano'"
                      >
                        패
                      </a-tag>
                      </div>
                      <div class="listContentItem a-font-sizeup">
                          {{ moment('2020-07-02T04:49:37').format('YYYY-MM-DD HH:mm') }}
                      </div>
                      <div class="listContentItem a-center a-font-sizeup">
                        4 / 2 <br/>9.6점
                      </div>
                      <div class="listContentItem">
                        <span>
                          <a-avatar
                            src="http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank2.png"
                          />
                              <a>programming</a>
                              FW 8.5
                          </span><br/>
                          <span  >
                              <a-avatar
                                src="http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank2.png"
                                      />
                                      <a>programming</a>
                                      FW 10.0
                                  </span ><br/>
                                  <span>
                                      <a-avatar
                                        src="http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank2.png"
                                      />
                                      <a>programming</a>
                                      MF 10.0
                                  </span><br/>
                                  <span >
                                      <a-avatar
                                        src="http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank2.png"
                                      />
                                      <a>programming</a>
                                      DF 7.7
                                  </span>
                          </div>
                      <div class="listContentItem">
                        <span>
                          <a-avatar
                            src="http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank2.png"
                          />
                              <a>programming</a>
                              FW 8.5
                          </span><br/>
                          <span  >
                              <a-avatar
                                src="http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank2.png"
                                      />
                                      <a>programming</a>
                                      FW 10.0
                                  </span ><br/>
                                  <span>
                                      <a-avatar
                                        src="http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank2.png"
                                      />
                                      <a>programming</a>
                                      MF 10.0
                                  </span><br/>
                                  <span >
                                      <a-avatar
                                        src="http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank2.png"
                                      />
                                      <a>programming</a>
                                      DF 7.7
                                  </span>
                                  
                          </div>
                      <div class="listContentItem a-font-sizeup">
                        <a>상세보기</a>
                      </div>
                    </a-list-item>

                </a-list>
            </a-card>

    </a-layout-content>
  </div>
</template> 

<script>
import {checkConsonant, checkSpecial, checkSpace}  from "../../_utils/validation"
import moment from 'moment'
import { mapGetters } from 'vuex'
const columns = [
  {
    title : '우리팀 티어',
    colSpan : 0,
    dataIndex : 'ourTear',
    scopedSlots: { customRender: 'ourTear' },
  },
  {
    title : '우리팀',
    colSpan : 2,
    dataIndex : 'ourTeam',
    key : 'ourTeam',
  },
  {
    title : '컨트롤러',
    dataIndex: 'ourController',
    key: 'ourController',
    scopedSlots: { customRender: 'ourController' },    
  },
  {
    title : '상대팀 티어',
    colSpan : 0,
    dataIndex : 'yourTear',
    scopedSlots: { customRender: 'yourTear' },
  },
  {
    title : '상대팀',
    colSpan : 2,
    dataIndex: 'yourTeam',
    key: 'yourTeam',
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
    title: '공격포인트 / 평점',
    key: 'ap',
    dataIndex: 'ap',
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
  { label: '볼타공식', value: '214' },
  { label: '볼타친선', value: '204' },
];
const data = [
  // {
  //   ap: "3/2 10.0"
  // ,ourTeam: "tttesetsttse"
  // ,haCd: "h"
  // ,matchDate: "2021-01-22T15:15:23"
  // ,matchEndType: 0
  // ,matchResult: "승"
  // ,matchScore: "4:3"
  // ,yourTeam : 'asd상대'
  // ,ourTear: "http://s.nx.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank5.png"
  // ,yourTear: "http://s.nx.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank5.png"
  // ,opponentAid: "5bb865586022b271772e060d"
  // ,opponentController: "etc"
  // ,ourController: "keyboard"
  // },
];

export default {
  name: 'userVtMatch',
  data () { 
    return {
      nickName : '',
      moment : moment,
      columns,
      data,
      radioOptions,
      mode : '214',
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
.a-center{
  text-align: center;
}
.a-card{
    position: relative;
}
.ant-card-body {
    padding-top: 0% !important;
    padding-bottom: 0% !important;
}
.a-font-sizeup{
  font-size: @font-size-base+4;
}
.square{
  width: 100px;
  height: 100px;
  color: white;
  font-weight: 600;
}
.a-max-width{
  max-width: 15%;
}
</style>
