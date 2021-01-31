/* 
    유저 라우팅
*/
var express = require('express');
var router = express.Router();
var env = require('dotenv');
env.config();
var request = require('request');
const axios = require('axios');		
const cheerio = require('cheerio');		
const async = require('async');

var options={
    uri : ''
    ,method:''
    ,headers :{
        'Authorization': process.env.nexonAPIKEY,
        'Content-Type': 'application/json'
    }
    ,qs :{}
}

router.get('/rank', function(req, res) {
    var params = req.query;
    console.log("/user/rank \n",params);

    var vs1, vsD, vsV;
    var returnData={};
    // 유저 accessId 조회
    accessIdSearch(params.nickName, 'nick').then(resolveData=>{
        // 유저 아이디가 없는경우
        if(resolveData.reCd && resolveData.reCd ==='04'){
            resolveData.nickName = params.nickName;
            res.json(resolveData);
        }else{

        returnData.level = resolveData.result.level;
        returnData.nickName = resolveData.result.nickname;
        // 2. 유저식별자로 최고티어 조회
        options.uri = `https://api.nexon.co.kr/fifaonline4/v1.0/users/${resolveData.result.accessId}/maxdivision`
        options.qs ={};
        apiSend(options).then(resolveData=>{
            console.log(resolveData.result);
            
            // vs1 50, vsD 52, vsV 214;
            resolveData.result.find(
                (item,idx)=>{
                    return item.matchType===50
                }) ? vs1 = resolveData.result.find(
                    (item,idx)=>{
                        return item.matchType===50
                    }): '';
            resolveData.result.find(
                (item,idx)=>{
                    return item.matchType===52
                }) ? vsD = resolveData.result.find(
                    (item,idx)=>{
                        return item.matchType===52
                    }): '';
            resolveData.result.find(
                (item,idx)=>{
                    return item.matchType===214
                }) ? vsV = resolveData.result.find(
                    (item,idx)=>{
                        return item.matchType===214
                    }): '';
            if(vs1 || vsD){
            // 3. 일반 등급 조회
            options.uri = `https://static.api.nexon.co.kr/fifaonline4/latest/division.json`
            options.qs = {};
            apiSend(options).then(resolveData=>{
                console.log('★★★ 일반 등급 조회 성공 ★★★\n');
                var temp;
                if(vs1){
                    temp=resolveData.result.find((item, idx)=>{
                        return item.divisionId === vs1.division
                    })
                    temp? vs1.divisionName = temp.divisionName :''
                } 
                if(vsD){
                    temp=resolveData.result.find((item, idx)=>{
                        return item.divisionId === vsD.division
                    })
                    temp? vsD.divisionName = temp.divisionName :''
                }
                if(vsV){
                    // 4. 볼타 등급 조회
                    options.uri=` https://static.api.nexon.co.kr/fifaonline4/latest/division_volta.json`
                    options.qs={};
                    options.qs = {};
                    apiSend(options).then(resolveData=>{
                        console.log('★★★ 볼타 등급 조회 성공 ★★★\n');
                        vsV ? temp=resolveData.result.find((item, idx)=>{
                            return item.divisionId === vsV.division
                        }) : ''
                        temp ? vsV.divisionName = temp.divisionName : '';
                        
                        returnData.rank =[vs1,vsD,vsV];
                        returnData.reCd ='01';
                        returnData.nickName = params.nickName;
                    }).then(()=>{
                        setTimeout(()=>{
                            res.json(returnData);
                        },3000);
                    });
                }else{ // 볼타 등급만 없는경우
                    returnData.rank =[vs1,vsD,vsV];
                    returnData.reCd ='01';
                    returnData.nickName = params.nickName;
                    res.json(returnData);
                }         
            });
        }else if(vsV){ // 볼타 등급만 있는경우
            // 4. 볼타 등급 조회
            options.uri = ` https://static.api.nexon.co.kr/fifaonline4/latest/division_volta.json`
            apiSend(options).then(resolveData=>{
                console.log('★★★ 볼타 등급 조회 성공 ★★★\n');
                vsV ? temp=resolveData.result.find((item, idx)=>{
                    return item.divisionId === vsV.division
                }) : ''
                temp ? vsV.divisionName = temp.divisionName : '';
                
                returnData.rank =[vs1,vsD,vsV];
                returnData.reCd ='01';
                returnData.nickName = params.nickName;
                res.json(returnData);
            });
        }else{ // 등급이 없는경우
            console.log('등급 기록이 없습니다.','\n');
            res.json({reCd:'04'});
        }
   
        });
        }
    });
});

router.get('/match', function(req, res) {
    var params = req.query;
    console.log("/user/match \n",params);

    var matchList=[];
    // 1. 유저 닉네임으로 식별자 조회
    accessIdSearch(params.nickName, 'nick').then(resolveData=>{
        // 유저 아이디가 없는경우
        if(resolveData.reCd && resolveData.reCd ==='04'){
            res.json(resolveData);
        }else{        //2. 유저식별자로 최근매치 조회
        options.uri = `https://api.nexon.co.kr/fifaonline4/v1.0/users/${resolveData.result.accessId}/matches`
        options.qs = {
            matchtype : '50'
            ,offset : 0 // 시작위치
            ,limit : 10 // 제한
        };

        apiSend(options).then(async resolveData=> {
            console.log("★★★ 매치 리스트 조회 성공 ★★★ \n");
            var detailResult = resolveData.result;
            
            for(var i of detailResult){ 
                //3. 매치별 매치 상세조회
                options.uri = `https://api.nexon.co.kr/fifaonline4/v1.0/matches/${i}`
                options.qs ={};
                await apiSend(options).then(resolveData=>{
                    matchList.push(resolveData.result);
                });
            }//for
            return matchList; 
        }).then(async matchList2=> {
            var i=0;
            for(const match of matchList2){
                var detail = match;
                let matchDefaultInfo = {};
                if(detail.matchInfo[0].nickname.toUpperCase() === params.nickName.toUpperCase()){
                    //홈
                    matchDefaultInfo.haCd = 'h';
                    matchDefaultInfo.opponent = detail.matchInfo[1].nickname;
                    matchDefaultInfo.opponentAid = detail.matchInfo[1].accessId;
                    matchDefaultInfo.opponentController = detail.matchInfo[1].matchDetail.controller;
                    matchDefaultInfo.matchEndType = detail.matchInfo[0].matchDetail.matchEndType;
                    matchDefaultInfo.matchResult = detail.matchInfo[0].matchDetail.matchResult;
                    matchDefaultInfo.matchScore = matchDefaultInfo.matchEndType ==0 ? detail.matchInfo[0].shoot.goalTotalDisplay+":"+detail.matchInfo[1].shoot.goalTotalDisplay
                    : matchDefaultInfo.matchEndType ==1 ? '3:0' : '0:3';
                }else{ 
                    //어웨이
                    matchDefaultInfo.haCd = 'a';
                    matchDefaultInfo.opponent = detail.matchInfo[0].nickname;
                    matchDefaultInfo.opponentAid = detail.matchInfo[0].accessId;
                    matchDefaultInfo.opponentController = detail.matchInfo[0].matchDetail.controller;
                    matchDefaultInfo.matchEndType = detail.matchInfo[1].matchDetail.matchEndType;
                    matchDefaultInfo.matchResult = detail.matchInfo[1].matchDetail.matchResult;
                    matchDefaultInfo.matchScore = matchDefaultInfo.matchEndType ==0 ? detail.matchInfo[1].shoot.goalTotalDisplay+":"+detail.matchInfo[0].shoot.goalTotalDisplay
                    : matchDefaultInfo.matchEndType ==1 ? '3:0' : '0:3'
                }
                await getProfile(matchDefaultInfo.opponent,matchDefaultInfo.opponentAid).then(resolveData=>{
                    matchDefaultInfo.maxTear = resolveData.maxTear;
                    matchDefaultInfo.bp = resolveData.bp;
                    matchDefaultInfo.matchDate = detail.matchDate;
                    resolveData.changeNickname ? matchDefaultInfo.changeNickname=resolveData.changeNickname :'';
                    detail.matchDefaultInfo = matchDefaultInfo;
                    // matchList.push(detail);
                    matchList[i]=detail;
                    i++;
                });
            }
            setTimeout(()=>{
                let returnData = {
                    matchList : matchList
                    ,reCd : '01'
                }
                res.json(returnData);
            },12000);
        });
        }
    });
});
    const apiSend = ((options) =>{
        return new Promise(function(resolve, reject){
            request(options, function (error, response, body){
                if(error){
                    console.log("네트워크 에러\n",error);
                }else{
                    console.log('★★★ 통신성공\n',options.uri);
                    let returnData={};
                    if(body){returnData.result = JSON.parse(body)};
                    returnData.response = response;
                    resolve(returnData);
                }
            });
        });
    });
    const accessIdSearch = ((param,cd) =>{
        //유저 닉네임으로 식별자 조회
        return new Promise(function(resolve, reject){
            options.uri = 'https://api.nexon.co.kr/fifaonline4/v1.0/users/';
            if(cd === 'aId'){
                options.uri += param;
            }else if(cd ==='nick'){
                options.qs.nickname=param;
            }
            apiSend(options).then(resolveData=>{
                if(resolveData.response.statusCode == 404){ // 아이디가 없는경우
                    let returnData={};
                    console.log('아이디가 없는 경우');
                    returnData.reCd ='04';
                    resolve(returnData);
                }else{
                    resolve(resolveData);
                }
            });
        });
    });

    
    const getHtml = async (url) => {
        try {
          return await axios.get(url);
        } catch (error) {
          console.error("************gethtml 에러",url,"\n",error);
        }
    };
    const getProfile = (nickname,opponentId)=>{
        return new Promise(async function(resolve, reject){
            var userData={};
            var profileSearhUrl = `http://fifaonline4.nexon.com/profile/common/PopProfile?strCharacterName=${encodeURI(nickname)}`;

            const result = await getHtml(profileSearhUrl).then(async html=>{
                const $ = cheerio.load(html.data);
                var snData = $('div.header > div.tab_list.large > ul > li.tab5 > a').eq(4).attr('href');
                userData.maxTear = $('div.header > div.coach_info > div.rank > div > img').attr('src');
                    
                if(!snData){ // 닉네임이 변경된 유저
                    userData.nickChange=true;
                    await accessIdSearch(opponentId, 'aId').then(async resolveData=>{
                        if(resolveData.reCd && resolveData.reCd ==='04'){
                            console.log('탈퇴한 유저');
                        }
                        //2. 유저식별자로 최근매치 조회
                        if(resolveData.result.nickname){
                            let reSearhUrl = `http://fifaonline4.nexon.com/profile/common/PopProfile?strCharacterName=${encodeURI(resolveData.result.nickname)}`;
                            await getHtml(reSearhUrl).then(async html=>{
                                console.log('닉네임 변경',nickname,' > ',resolveData.result.nickname);
                                userData.changeNickname = resolveData.result.nickname;
                                const $ = cheerio.load(html.data);
                                snData = $('div.header > div.tab_list.large > ul > li.tab5 > a').eq(4).attr('href');
                                userData.maxTear = $('div.header > div.coach_info > div.rank > div > img').attr('src');
                                return snData;
                                // resolve(userData);
                            }).then(async res => {
                                if(res){
                                    var profileSearhUrl2 = 'http://fifaonline4.nexon.com'+res;
                                    await getHtml(profileSearhUrl2).then(html=>{
                                        const $ = cheerio.load(html.data);
                                        userData.bp = $('div[class=text]').eq(3).text();
                                    }).then( res =>{
                                        console.log(userData);
                                        resolve(userData);
                                    });
                                }
                            });
                            // resolve(snData);
                        }else{
                            resolve(userData);
                        }
                    });
                }
                return snData;
            })
            .then(async res => {
                if(res){
                    var profileSearhUrl2 = 'http://fifaonline4.nexon.com'+res;
                    await getHtml(profileSearhUrl2).then(html=>{
                        const $ = cheerio.load(html.data);
                        userData.bp = $('div[class=text]').eq(3).text();
                    }).then( res =>{
                        console.log(userData);
                        resolve(userData);
                    });
                }
            });
        });
    }

module.exports = router;