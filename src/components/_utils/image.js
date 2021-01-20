export function getRankImage(gameCd,code) {
    var imageUrl ='';
    if(gameCd==='sc'){
        switch(code){
            case 800: 
                imageUrl='http://s.nx.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank0.png'
                break
            case 900: 
                imageUrl='http://s.nx.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank1.png'
                break
            case 1000: 
                imageUrl='http://s.nx.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank2.png'
                break
            case 1100: 
                imageUrl='http://s.nx.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank3.png'
                break
            case 1200: 
                imageUrl='http://s.nx.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank4.png'
                break
            case 1300: 
                imageUrl='http://s.nx.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank5.png'
                break
            case 2000: 
                imageUrl='http://s.nx.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank6.png'
                break
            case 2100: 
                imageUrl='http://s.nx.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank7.png'
                break
            case 2200: 
                imageUrl='http://s.nx.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank8.png'
                break
            case 2300: 
                imageUrl='http://s.nx.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank9.png'
                break
            case 2400: 
                imageUrl='http://s.nx.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank10.png'
                break
            case 2500: 
                imageUrl='http://s.nx.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank11.png'
                break
            case 2600: 
                imageUrl='http://s.nx.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank12.png'
                break
            case 2700: 
                imageUrl='http://s.nx.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank13.png'
                break
            case 2800: 
                imageUrl='http://s.nx.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank14.png'
                break
            case 2900: 
                imageUrl='http://s.nx.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank15.png'
                break
            case 3000: 
                imageUrl='http://s.nx.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank16.png'
                break
            case 3100: 
                imageUrl='http://s.nx.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank17.png'
                break
            default :
                imageUrl='http://s.nx.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank_default.png'
                break
        }
    }else if(gameCd ==='vt'){
        switch(code){
            case 1100:
                imageUrl = 'http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank2.png'
                break
            case 2000:
                imageUrl = 'http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank3.png'
                break
            case 2100:
                imageUrl = 'http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank4.png'
                break
            case 2200:
                imageUrl = 'http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank5.png'
                break
            case 2300:
                imageUrl = 'http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank6.png'
                break
            case 2400:
                imageUrl = 'http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank7.png'
                break
            case 2500:
                imageUrl = 'http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank8.png'
                break
            case 2600:
                imageUrl = 'http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank9.png'
                break
            case 2700:
                imageUrl = 'http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank10.png'
                break
            case 2800:
                imageUrl = 'http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank11.png'
                break
            case 2900:
                imageUrl = 'http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank12.png'
                break
            case 3000:
                imageUrl = 'http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank13.png'
                break
            case 3100:
                imageUrl = 'http://s.nx.com/s2/game/fo4/obt/rank/volta/ico_rank14.png'
                break
            default:
                imageUrl ='http://s.nx.com/s2/game/fo4/obt/rank/large/update_2009/ico_rank_default.png'
                break
        }
    }

    return imageUrl;
}