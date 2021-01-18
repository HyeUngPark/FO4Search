/* 
    유저 라우팅
*/
var express = require('express');
var router = express.Router();
var env = require('dotenv');
env.config();
var request = require('request');

router.get('/rank', function(req, res) {
    var params = req.query;
    console.log("/user/rank \n",params);

    // 1. 유저 닉네임으로 식별자 조회
    var options={
        uri : 'https://api.nexon.co.kr/fifaonline4/v1.0/users/'
        ,method:'GET'
        ,headers :{
            'Authorization': process.env.nexonAPIKEY,
            'Content-Type': 'application/json'
        }
        ,qs :{
            nickname : params.nickName
        }
    }
    var returnData={};
    var vs1, vsD, vsV;
    
    // new Promise(resolve=>{
        request(options, function (error, response, body) {
            if(error) console.log("에러에러(wise 점검 및 인터넷 연결 안됨)");
            if (!error && response.statusCode == 200) {
                console.log('★★★ 유저 식별자 조회 성공 ★★★\n',body,'\n');
                if(Object.keys(body).length){
                    var result = JSON.parse(body);
                    // console.log(typeof(body));
                    returnData.level = result.level;
                    returnData.nickName = result.nickname;
                    // resolve(body);
                    options.uri = `https://api.nexon.co.kr/fifaonline4/v1.0/users/${result.accessId}/maxdivision`
                    //2. 유저식별자로 최고티어 조회
                    request(options, function (error, response, body) {
                        if(error) console.log("에러에러(wise 점검 및 인터넷 연결 안됨)");
                        if (!error && response.statusCode == 200) {
                            // console.log(typeof(body));
                            var result = JSON.parse(body);
                            console.log('★★★ 최고 티어 조회 성공 ★★★\n',result);
                            // vs1 50, vsD 52, vsV 214;
                            result.find(
                                (item,idx)=>{
                                    return item.matchType===50
                                }) ? vs1 = result.find(
                                    (item,idx)=>{
                                        return item.matchType===50
                                    }): ''
                            result.find(
                                (item,idx)=>{
                                    return item.matchType===52
                                }) ? vsD = result.find(
                                    (item,idx)=>{
                                        return item.matchType===52
                                    }): ''
                            result.find(
                                (item,idx)=>{
                                    return item.matchType===214
                                }) ? vsV = result.find(
                                    (item,idx)=>{
                                        return item.matchType===214
                                    }): ''
                            
                            if(vs1 || vsD){
                                
                            // 3. 일반 등급 조회
                            options.uri = `https://static.api.nexon.co.kr/fifaonline4/latest/division.json`
                            request(options, function (error, response, body) {
                                if(error) console.log("에러에러(wise 점검 및 인터넷 연결 안됨)");
                                if (!error && response.statusCode == 200) {
                                    var result = JSON.parse(body);
                                    // console.log('★★★ 일반 등급 조회 성공 ★★★\n',result);
                                    console.log('★★★ 일반 등급 조회 성공 ★★★\n');
                                    var temp;
                                    vs1 ? temp=result.find((item, idx)=>{
                                        return item.divisionId === vs1.division
                                    }) : ''
                                    temp ? vs1.divisionName = temp.divisionName : '';
                                    vsD ? temp=result.find((item, idx)=>{
                                        return item.divisionId === vsD.division
                                    }) : ''
                                    temp ? vsD.divisionName = temp.divisionName : '';
                                    if(vsV){
                                        // 4. 볼타 등급 조회
                                        options.uri = ` https://static.api.nexon.co.kr/fifaonline4/latest/division_volta.json`
                                        request(options, function (error, response, body) {
                                            if(error) console.log("에러에러(wise 점검 및 인터넷 연결 안됨)");
                                            if (!error && response.statusCode == 200) {
                                                var result = JSON.parse(body);
                                                // console.log('★★★ 볼타 등급 조회 성공 ★★★\n',result);
                                                console.log('★★★ 볼타 등급 조회 성공 ★★★\n');
                                                vsV ? temp=result.find((item, idx)=>{
                                                    return item.divisionId === vsV.division
                                                }) : ''
                                                temp ? vsV.divisionName = temp.divisionName : '';
                                                
                                                returnData.rank =[vs1,vsD,vsV];
                                                returnData.reCd ='01';
                                                res.json(returnData);
                                                console.log(returnData);
                                            }else{
                                                console.log('볼타 등급 조회 실패',body,'\n');
                                            }
                                        });
                                    }else{ // 볼타 등급만 없는경우
                                        returnData.rank =[vs1,vsD,vsV];
                                        returnData.reCd ='01';
                                        res.json(returnData);
                                    }
                                }else{
                                    console.log('일반 등급 조회 실패',body,'\n');
                                }
                            });
                            }else if(vsV){ // 볼타 등급만 있는경우
                                // 4. 볼타 등급 조회
                                options.uri = ` https://static.api.nexon.co.kr/fifaonline4/latest/division_volta.json`
                                request(options, function (error, response, body) {
                                    if(error) console.log("에러에러(wise 점검 및 인터넷 연결 안됨)");
                                    if (!error && response.statusCode == 200) {
                                        var result = JSON.parse(body);
                                        console.log('★★★ 볼타 등급 조회 성공 ★★★\n',result);
                                        vsV ? temp=result.find((item, idx)=>{
                                            return item.divisionId === vsV.division
                                        }) : ''
                                        temp ? vsV.divisionName = temp.divisionName : '';
                                        
                                        returnData.rank =[vs1,vsD,vsV];
                                        returnData.reCd ='01';
                                        // return returnData;
                                        res.json(returnData);
                                    }else{
                                        console.log('볼타 등급 조회 실패',body,'\n');
                                    }
                                });
                            }
                        }else{
                            console.log('최고 티어 조회 실패',body,'\n');
                        }
                    });
                }
            }else if(response.statusCode == 404){
                // err code 404 아이디가 없는경우
                console.log('아이디가 없는 경우\n',body,'\n',response.statusCode);
                returnData.reCd ='04';
                res.json(returnData);
            }else{
                // 기타
            }
        });
    // }).then(value=>{
    // });
    // });
});

module.exports = router;