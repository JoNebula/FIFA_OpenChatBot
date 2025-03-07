const scriptName  = "유저프로필조회";

function getNickname(msg){
        var ovo = msg.split(" ");
        var nickname = ovo[1];
   return nickname;
}

function getProfile(replier, msg, imgRank){
   var nickname = getNickname(msg); 
   try{
   var url ="https://fconline.nexon.com/datacenter/rank_m?";
      var doc=org.jsoup.Jsoup.connect(url+"strCharacterName="+nickname).ignoreContentType(true).get();

     var icon = doc.select("span.ico_rank").get(0).select("img").attr("src");
      const regex = /ico_rank\d+/;
      const match = icon.match(regex);

      if (match) { const rankLevel = match[0]; }
      var tear = imgRank[rankLevel];
      var name = doc.select("span.name.profile_pointer").get(0).text();
      var rank = doc.select("span.td.rank_no").get(0).text();
     var price = doc.select("span.price").text();
      var td_rank = doc.select("span.td.rank_before").get(0).text();
      var win_rate = doc.select("span.td.rank_r_rate").get(0).text();
      var win_point = doc.select("span.td.rank_r_win_point").get(0).text();
      var rank_per = doc.select("span.td.rank_percent").get(0).text();

      var prntStr = "< "+nickname+" >\n티어:"+tear+"\n순위: "+String(rank)+"\n구단가치: "+price+"\n승률: "+win_rate+"\n랭킹점수: "+win_point+"\n승/무/패: "+td_rank+"\n상위백분율: "+rank_per;
      replier.reply(prntStr);
   } catch(error){
   replier.reply("오류가 발생하였습니다. 가능한 오류 원인은 다음과 같습니다.\n1) 플레이어가 상위 10000위 안에 없을 경우 정보를 확인할 수 없습니다.\n2) 유저명에 오타가 있을 수 있습니다.\n3) FC Online이 점검중일 경우 사용 불가합니다.");
   }
}


// 실행
function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
   const imgRank = {
         "ico_rank0" : "슈챔",
         "ico_rank1" : "챔스",
         "ico_rank2" : "슈챌",
         "ico_rank3" : "챌1부" ,
         "ico_rank4" : "챌2부" ,
         "ico_rank5" : "챌3부",
         "ico_rank6" : "월클1부",
         "ico_rank7" : "월클2부" ,
         "ico_rank8" : "월클3부" ,
         "ico_rank9" : "프로1부" ,
         "ico_rank10" : "프로2부"};
         
   if (msg.startsWith("!프로필")){
      getProfile(replier, msg, imgRank);
   }
   if (msg=="!hi"){
      replier.reply(msg);
   }
}
