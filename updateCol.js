const { artistsModel, calendarModel } = require("./Schema");
const mongoose = require("mongoose");

const atlasUri =
  "mongodb+srv://superuser:on8SkrvCS4Ps5jCs@clusterone-svz1y.gcp.mongodb.net/musicapp?retryWrites=true&w=majority";

mongoose.connect(atlasUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
  console.log("connected!");
});

const titles = [];

const titles2014 =
  "소극장콘서트 <비밀의화원>,메세나폴리스,UN 세계평화의날,서울대축제 티라노스트레스,자브라콘서트,열린음악회,별밤 마지막 가든스튜디오,모바일 앱 어워드 & 네트워킹 파티,롯데백화점 미니콘서트,연말콘서트 <YounHa>,SAF(SBS AWARDS FESTIVAL)";
const titles2015 =
  "서든어택 미니콘서트,9COMPLEX,아트인 콘서트,봄바람 콘서트,야호 콘서트,그린 플러그드,소극장 콘서트 <케세라세라>,사운드베리 페스타,디즈니 인 콘서트2,썸데이 페스티벌,멜로디 포레스트 캠프,KDB 대우증권 창립 45주년 콘서트,연말 콘서트 <FINAL FANTASY>";
const titles2016 =
  "인천대학교 대동제,경인교육대학교 대동제,고려대학교 입실렌티,윤하콘서트 <潤夏>,래드캐럿 뮤직 페스티벌,피버 페스티벌,제주 뮤직 페스티벌,썸데이 페스티벌,제2회 평화나눔음악회,세명대학교 청룡축전,한국교원대학교 동아리 대동제,숭실대학교 대동제,춘천교육대학교 대동제,DML 페스티벌 라디오DJ 콘서트,한강음악제";
const titles2017 =
  "건국대학교 대동제,성결대학교 대동제,경희대학교 대동제,의정부 시민과 함께하는 3050콘서트,경주 그린플러그드 페스티벌,썸데이 페스티벌,경희대학교 국제캠퍼스 대동제,동국대학교 대동제,건국대학교 글로벌캠퍼스 아우름제,평창 안심가로등 점등식,댕댕이 페스티벌,서울과학기술대학교 방송제,투유드림 8th 투유데이,윤하연말콘서트 <#RE>,잠금헤제 라이브,라이브페스트 인 파라다이스";
const titles2018 =
  "정규5집 RescuE 팬사인회(페럼타워),정규5집 RescuE 팬사인회(TCC센터),정규5집 RescuE 팬사인회(스타필드고양),달콤커피 베란다 라이브,현대백화점 충청점 미니콘서트,앵콜콘서트<RescuE>,카이스트 KAMF,BeautifulMintLife,광운대학교 대동제,한양대학교 대동제,덕성여자대학교 대동제,레인보우 뮤직 & 캠핑 페스티벌,현대 모터스튜디오 루프테라스 라이브,얼라이브 콘서트,GS뮤직 & 비어 페스티벌,KYD 명동문화대축제,벨기에 문화축제,썸데이 페스티벌,울산대학교 도어락,순천향대학교 피닉시아 축제,한양대학교 에리카 가을축제,경찰대학 청람축전,동덕여자대학교 대동제,중앙대학교 안성캠퍼스 범중앙인 축제,한국외국어대학교 퀸쿠아트리아,GrandMintFestival,동서울대학교 복정축전,대림대학교 임곡대동제,연말콘서트 <편지>";
const titles2019 =
  "YHolics 3기 팬미팅,별이 빛나는 밤에 출연,한국기술교육대학교 한맥제,BeautifulMintLife,명지대학교 대동제,한서대학교 자미원 대동제,동원대학교 대동제,청춘 모꼬지장,한세대학교 오순절축제,동국대학교 백상 대동제,서울여자대학교 서랑제,Stable Mindset 팬사인회(여성프라자 아트홀봄),with 청춘별밤콘서트,Stable Mindset 팬사인회(목동 방송회관 코바코홀),소극장콘서트 <潤夏>,소극장콘서트 <潤夏>,2019 대한민국 독서대전,2019 신한카드 루키 프로젝트 결선콘서트,정신건강 페스티벌 마음돌봄,한국항공대학교 항라비안나이트,충남대학교 백마 대동제,도동서원 세계문화유산 등재 기념음악회,한국산업기술대학교 TECHNO FESTIVAL,한양대학교 축제 RACHIOS,서강대학교 가을축제,한양여자대학교 행원제,제30회 정읍사 문화제,경희대학교 가을 대동제,송담대학교 BECK TO THE 송다-ㅁ,GrandMintFestival,광주과학기술원 가을축제,수현의 볼륨을 높여요 공개방송,연말콘서트 <Winter Flower>";

const titles2020 =
  "Unstable Mindset 팬사인회(목동 예술인센터 로운홀),Unstable Mindset 팬사인회(상암 에스플렉스 센터),Unstable Mindset 팬사인회(상암 KBS 미디어센터),Unstable Mindset 팬사인회(영등포 TCC센터),Unstable Mindset 팬사인회(상암 KBS 미디어센터)";

const dates2014 = [
  0530,
  0912,
  0921,
  1001,
  1009,
  1014,
  1102,
  1127,
  1207,
  1228,
  1231
];
const dates2015 = [
  0228,
  0319,
  0328,
  0410,
  0515,
  0523,
  0530,
  0815,
  0905,
  0906,
  0920,
  1018,
  1219
];
const dates2016 = [
  0518,
  0519,
  0527,
  0710,
  0804,
  0813,
  0827,
  0903,
  0910,
  0921,
  0928,
  0929,
  1006,
  1007,
  1008
];
const dates2017 = [
  0516,
  0518,
  0524,
  0706,
  0909,
  0917,
  0919,
  0920,
  1025,
  1027,
  1028,
  1130,
  1201,
  1225,
  1228,
  1231
];
const dates2018 = [
  0113,
  0114,
  0120,
  0126,
  0214,
  0313,
  0331,
  0513,
  0515,
  0523,
  0525,
  0602,
  0707,
  0728,
  0804,
  0813,
  0825,
  0902,
  0914,
  0918,
  0919,
  0920,
  0921,
  1005,
  1012,
  1021,
  1026,
  1101,
  1231
];
const dates2019 = [
  0209,
  0321,
  0510,
  0511,
  0514,
  0515,
  0516,
  0518,
  0522,
  0523,
  0523,
  0706,
  0713,
  0720,
  0726,
  0804,
  0830,
  0831,
  0905,
  0918,
  0920,
  0921,
  0925,
  0926,
  0926,
  0927,
  0928,
  1001,
  1008,
  1020,
  1107,
  1109,
  1224
];

const dates2020 = [0111, 0112, 0118, 0119, 0201];

const titleArr2014 = titles2014.split(",");
const titleArr2015 = titles2015.split(",");
const titleArr2016 = titles2016.split(",");
const titleArr2017 = titles2017.split(",");
const titleArr2018 = titles2018.split(",");
const titleArr2019 = titles2019.split(",");
const titleArr2020 = titles2020.split(",");

const strs = [
  titleArr2014,
  titleArr2015,
  titleArr2016,
  titleArr2017,
  titleArr2018,
  titleArr2019,
  titleArr2020
];
const dates = [
  dates2014,
  dates2015,
  dates2016,
  dates2017,
  dates2018,
  dates2019,
  dates2020
];

// for (let i = 0; i < strs.length; i++) {
//   console.log(strs[i].length, dates[i].length);
//   if (strs[i].length === dates[i].length) {
//     console.log("true");
//   } else {
//     console.log("false");
//   }
// }

let year = 2014;

for (let j = 0; j < strs.length; j++) {
  let months = [];

  for (let k = 0; k < strs[j].length; k++) {
    let month = {};
    month["title"] = strs[j][k];
    month["date"] = String(dates[j][k]);
    months.push(month);
  }

  let calendar = new calendarModel({
    artist: "younha",
    year: `${year}`,
    month: months
  });

  calendar.save();
  // calendarModel.create(
  //   {
  //     artist: "younha",
  //     year: `${year}`,
  //     month: months
  //   },
  //   (err, docs) => {
  //     if (err) throw err;

  //     console.log(docs);
  //   }
  // );

  year++;
}

// calendarModel.updateOne(
//   { artist: "younha" },
//   {
//     month: months
//   },
//   function(err, res) {
//     if (err) throw err;
//     console.log(res);
//   }
// );
