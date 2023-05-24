Basketball-Info <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white" /> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=flat&logo=javascript&logoColor=white" />
=============

https://ontothenextlevel.github.io/Basketball-Info/

미국프로농구 NBA의 관한 정보를 얻을 수 있는 사이트로 Main Page와 Player, Video, News, Arena 4개의 Menu Page로 구성된 웹사이트 입니다.

###### *해당 프로젝트의 파일 및 코드는 Code 폴더에 들어 있습니다.*

* * *

구현의의
-------------

#### 개발자스러운 마음가짐으로 개발하자
  
    매우 포괄적인 의미에서의 개발자의 마인드셋을 가지고 작업했습니다.
    
    부족한 코드 일지언정 이해를 바탕으로 책임질수 있는 코드를 작성했습니다.
    
    이미지의 사용을 최소한으로 하며, 동적으로 웹페이지가 풍성해질수 있도록 작업했습니다.
    
    살아있는 웹사이트를 위해 여러가지 API와 애니메이션을 넣어 작업했습니다.
    
    url의 적극적 활용으로 SEO를 고려하고 사용자의 Book Mark기능도 가능캐하는 개발했습니다.
    
    창의적인 아이다어와 재미난 생각을 가지고 구현 하는것을 겁내지 않았습니다. 
    
    부족해 보이는 부분은 그때그때 개선하며 안주하지 않고 개발했습니다.
    
    Zero Warning을 목표로 개발했습니다.
    

#### 정말 리액트를 한번 잘해보자
  
    리액트에 능통해지기 위해 다른 라이브러리의 사용을 최소한으로 하며, React Hooks들을 주로 이용하여 구현하였습니다.
    
    가독성을 높여주고 상태관리를 용이하게 하며 리액트에서 주력으로 채택하는 함수형 컴포넌트로 개발하였습니다.
    
    Virtual Dom을 사용하는 리액트 특성상 Dom에 직접 접근하는 방식의 코드는 지양했습니다.
    
    styled-components를 이용해 css를 구현했습니다.
    
* * *

<br/>

Detail
=============


Main Page
-------------
맨처음 보여지는 화면인 만큼 사용자에게 재미있는 경험을 선사하는걸 목적으로 두고 개발했습니다.

    초기에 구현한 메인페이지는 영상을 띄워놓고 스크롤해서 내려가면 AOS라이브러리를 통해 각 메뉴의 어울리는 이미지들이 
    
    나타나는 식의 구현을 했습니다. 허나 이 방법에서는 영상과 이미지의 큰 용량 때문에 버벅거리는 문제와 해당 소스들의 
    
    저작권의 문제가 발생할수 있다는 판단하에 아래와 같이 구현하는 방식으로 개선했습니다.

![Main](https://github.com/ontothenextlevel/Basketball-Info/assets/119983922/4469deb1-e940-4209-b385-8dea7bae1a79)



    [ AnimationOrder, setAnimationOrder ] = useState(1) // 1,2,3 animation order
    
    if( AnimationOrder === 1 ){
    
      useEffect의 window.addEventListener("mousewheel",FirstAnimation) 로 FirstAnimation // useRef달아논 DOM요소 위치 가운데로
      
      setAnimationOrder(2) // 특정지점에서 다음 AnimationOrder로
     
    }
    
    else if( AnimationOrder === 2 ){
    
      useEffect의 window.addEventListener("mousewheel",SecondAnimation) 로 SecondAnimation // useRef달아논 DOM요소 넓이/높이
                                                                                             증가시켜 border만들기

      setAnimationOrder(3) // 특정지점에서 다음 AnimationOrder로

    }
    
    else if( AnimationOrder === 3 ){
    
      useEffect의 window.addEventListener("mousewheel",ThirdAnimation) 로 ThirdAnimation // 중앙의 navigation 보이기

    }
    
<br/>

    HashRouter을 통해 각 메뉴를 클릭했을때 해당 메뉴페이지로 라우팅
    
    재밌는 애니메이션을 위해 모든 스크롤이 끝나고 Navigation이 나타나지만 애니메이션을 원치않는 사용자를 위해 초기화면에도 메뉴로 이동할 방법 존재
    
 * * *

<br/>

Player Page ( Sportsdata.io NBA API )
-------------
팀별로 선수들의 리스트와 선수 개인정보를 볼 수 있는 페이지 입니다.
    
* ### PlayerListSection
  
  **PlayerCategory.js** *( 카테고리 구현 및 카테고리 상태 변경 )* > **PlayerPlayer.js** *( PlayerCategory.js에서 선택한 팀으로 API호출 및 결과 )*
    
      초기엔 30개팀 로고를 다 배치하고 클릭하면 해당 팀의 선수명을 쭉 보여주는 형식 이였습니다. 허나 저작권이 있는 팀로고를 사용하지 않고

      원하는 디자인을 구현하기 위해 select태그를 이용하지 않고 직접 리액트 hook을 통해 구현했습니다.

      선수들 리스트 같은 경우도 더욱 재미있는 구현을 위해 농구 유니폼의 디자인을 따와 구현했습니다.
    
![PlayerList](https://github.com/ontothenextlevel/Basketball-Info/assets/119983922/1ffe0c11-5a06-4c9f-9404-3d19fae82c2e)



PlayerCategory.js

     useEffect 안의 jsonTeamList에 map() 을 통해 카테고리 상의 3개 Drop Down 메뉴의 리스트 구현 // 기존엔 API로 불러오던 팀별 데이터를 quota exceeded 이슈와
                                                                                       최적의 구현 위해 직접 json파일을 만들어서 사용
                                                                                                                                                      
     3개의 Drop Down 메뉴가 종속 되어있는 관계이기 때문에 리스트를 만들때 array에 string 형식으로 넣지않고 object를 만들어서 key와 value로 구성함으로써
     filter() 를 통해 상위 Drop Down에서 선택한 분류 기준을 통해 하위 Drop Down의 리스트 내용을 동적으로 변경
     
     클릭을 통해 변경된 Drop Down 메뉴들의 value를 useNavigate를 통해 url에 나타냄으로써 SEO( Search Engine Optimization )도 고려하고 Book Mark기능도
     사용 할수있게 구현

PlayerPlayer.js
     
     PlayerCategory.js에서 useNavigate를 통해 설정된 Params( team value )를 useSearchParams르 사용해 API 호출
     
     API호출은 HTTP 클라이언트 라이브러리 Axios를 사용했고 async/await 비동기 통신을 사용하여 데이터를 받은뒤 setState에 넣어서 return문에서 State에 map()을 통해
     사용자에게 선수들을 보여주는 DOM요소로 만들어줌
     
     만들어진 선수(유니폼)들에 onClick 이벤트에 useNavigate를 통해 PlayerDetailSection으로 라우팅할 주소로 변경 // playerid를 포함함
     
     
* ### PlayerDetailSection
  
  **PlayerListSection** *( 선수 개인 선택 )* > **PlayerInfo.js** *( 선수 개인의 프로필 구현 )* 
    
      초기엔 div태그들로 만들어 놓은 틀에 정직하게 선택된 선수의 팀 컬러를 props로 전달 받아 정보를 덮어 씌우는 형식으로 구현했었습니다.
      
      허나 라우팅 되고 컴포넌트가 마운트 된 시점과 마운트 되며 불러오는 API 데이터를 통한 렌더링되는 시점의 차이에서 오는 간극을 오히려 이용해
      
      기본적으로 밋밋한 색감의 틀을 구현해두고 API 데이터를 통한 렌덩링 될때 애니메이션을 넣어 좀 더 생동감 있는 구현을 했습니다.
                                                                         
 ![PlayerDetail](https://github.com/ontothenextlevel/Basketball-Info/assets/119983922/ed100e28-6e12-489e-905e-ffddb0ef9c9b)

       
PlayerInfo.js

    PlayerListSection에서 onClick에 useNavigate를 통해 url에 설정한 params를 useParams를 사용해 가져와서 API를 호출
    
    API 데이터의 값들을 가공 할 수 있는 함수들을 만들어서 데이터를 가공함 // 무게,길이 등의 단위를 변환하거나 숫자에 ',' 를 찍는 작업

    news 아이콘을 클릭시의 해당 선수의 최신 소식을 API로 호출해서 보여줌 
    
    다시 PlayerListSection으로 돌아가는 ack 버튼을 구현 // 이 버튼의 구현 역시 useNavigate를 이용한 라우팅으로 구현했는데 라우팅이 되며 언마운트 되는 컴포넌트는
                                                     데이터가 지워지기 때문에 localStorage.setItem()를 통해 다시 돌아갈땐 불필요한 호출을 안하게함
                                                     이것 역시 API의 Quota Exceeded 에서 조금이나마 벗어나기 위한 구현
                                                    
* * *

<br/>

Video Page ( Youtube Data API v3 )
-------------             
             
NBA의 최신 영상과 팀별 영상을 볼 수 있는 페이지 입니다.

**VideoCategory.js** *( 카테고리 구현 )* > **VideoList.js** *( 영상리스트 구현 )* > **VideoPlayer.js** *( 영상 재생 )* // **VideoLoading.js** *( 로딩 애니메이션 )*

    사용한 API인 Youtube의 ui를 최대한 카피하며 기능하도록 구현해봤습니다. 

![VideoList](https://github.com/ontothenextlevel/Basketball-Info/assets/119983922/cd177122-9387-4340-a987-06f3e43076af)

VideoCategory.js

    useEffect를 사용해 jsonTeamList 팀명을 카테고리 메뉴로 구현 // return문에 jsx문법으로 filter()를 사용해 Division 별로( 5팀씩 6묶음 ) 나타냄
    
    Show/Hide 버튼을 구현해 toggle 형식으로 왼쪽으로 밀리고 들어오고 구현 
    
    다른 컴포넌트들이 마운트될때 props를 전달받아 jsx문법으로 삼항조건연산문 스타일로 상황에 따른 스타일 // VideoList가 메인일땐 리스트를 돋보이게 하는 스타일,
                                                                                     VideoPlayer가 메인일땐 플레이어를 해치지 않는 스타일
                                                                                     
    팀 click시 useNavigate를 통해 url에 params 설정 // 라우팅할 목적이 아니기에 path를 설정하는것이 아닌 쿼리파라미터를 설정함                                                                            
                                                                                     
    
VideoList.js    

    useEffect에서 useSearchParams로 가져온 쿼리파라미터를 통해 해당팀 API를 호출 // useEffect에 의존성배열에 SearchParams를 넣어서 사용자가 직접 url로 접근하더라도
                                                                        정상적으로 기능하도록 구현 
    
    useEffect에 addEventListener("scroll")을 이용하여 리스트 무한스크롤 구현 // scrollHeight,scrollTop,clientHeight 를 이용해 페이지의 바닥에서 스크롤이 이어지면
                                                                       불러온 다음번의 리스트를 불러옴. 이 기능은 youtube API 에서 pageToken이라는 파라미터를
                                                                       지원해서 편하게 구현 할 수 있었음

    다른 컴포넌트들이 마운트될때 props를 전달받아 jsx문법으로 삼항조건연산문 스타일로 상황에 따른 스타일 // VideoPlayer가 메인이 될때( 영상이 플레이 ) List가 측면으로 작게 이동
    
    선택한 영상의 video id를 가져다가 useState에 게속 추가해서 시청한 영상에 '시청됨' 표시 

    영상을 클릭하면 useNavigate를 통해 url에 params 설정과 props를 통해 VideoPlayer에 영상정보 전달

![VideoPlayer](https://github.com/ontothenextlevel/Basketball-Info/assets/119983922/511dd11d-f17c-48a8-9359-bac7c3194bc2)

VideoPlayer.js

    props를 전달받은 값이 있다면 해당 정보로 화면 구현, 받은 값이 없다면 ( url로 접근 ) useParams로 params를 이용해 API 호출해서 구현 // book mark 혹은 url로 접근시에도
                                                                                                                   기능하게 작업
VideoLoading.js
    
    페이지 API를 호출하는 모든 함수에 try/catch문을 이용해서 함수가 호출될떄 props.setLoading(true), try/catch문에 props.setLoading(false)로 로딩 애니메이션

                                                                                                                   
                                                                                                                   

* * *

<br/>

News Page ( ESPN NBA API )
-------------    

NBA의 최신 뉴스를 볼 수 있는 페이지 입니다.

* ### NewsSection

  **NewsList.js** *( 기사 리스트 및 주변 기능 구현 )* > **NewsArticle.js** *( 기사 페이지 구현 )* , **NewsControl.js** *( 컨트롤러 구현 )*

      공개된 NBA News API를 찾기 힘들어 고생하던중 ESPN에서 지원하던 API가 현재는 Key를 발급하진 않지만 Hidden으로 사용할 API가 있어서 사용했습니다.

      허나 이 API에선 특별한 Endpoint 없이 최신의 6개의 Article들 만을 제공하기에, 이 6개의 Article들을 가지고 재밌게 구현해봤습니다.

![NewsArticle](https://github.com/ontothenextlevel/Basketball-Info/assets/119983922/0be55ff0-5a41-4b1d-bd7e-23bf3633b1ed)

NewsList.js

    부모 컴포넌트에서 불러온 API 데이터의 이미지로 title에 hover 했을때 미리보기 구현

    SVG태그의 Path와 textPath를 이용해 농구공 디자인해서 구현
    
    props로 전달받은 article 의 title들을 농구공 라인처럼 구현 // 라인 구현때 Dom에 직접 접근하기 위한 useRef를 map(() => React.createRef()) 통해 다중선언,
                                                           getTotalLength()로 path의 길이를 구하고 getComputedTextLength()로 text의 길이를 구해서
                                                           text가 path 길이를 넘어가면 textPath의 startOffset 속성을 setInteval로 증가시켜
                                                           나머지 text 보이게 이동, text가 path 길이보다 짧으면 "-" 문자로 대체해서 채워놓아 라인 유지
                                                   
       
NewsArticle.js

    부모 컴포넌트에서 API를 불러온다음 return문에서 map()을 해당컴포넌트에 사용해 article 여러개를 구현함 // left 속성을 (index - CurrentIndex )* 100}vw 이렇게 각각 위치잡음

    
    
NewsControl.js

    부모 컴포넌트의 존재하는 CurrentIndex가 0( defaut )가 아닐때 보이게 // list에서 article의 title을 클릭하면 해당 index로 바뀜
    
    CurrentIndex를 +/-하는 이동 버튼을 구현해 슬라이드를 좌우로 이동

    click시에는 +/-하는 버튼을 2초 동안 꾹 누르고 있으면 다시 NewsArticle 들은 가리고 NewList를 보여줌 // onMouseDown 이벤트에 setTimer를 만들고 그 안에 setTimeout()를
                                                                                          2초로 설정하고 2초가 지난다면 CurrentIndex를 0으로하고, 2초 전에 
                                                                                          마우스를 띄어서 onMouseUp이 발생하면 clearTimeout(Timer) 해서
                                                                                          CurrentIndex를 0으로 바뀌지 않게해서 구현
                                                                                             

* * *

<br/>

Arena Page ( Google Map Api )
-------------    

최소한의 google map ui 위에 입맛대로 디자인과 기능을 넣은 페이지 입니다.

**ArenaCategory.js** *( 카테고리 구현 )* > **ArenaMap.js** ( Google Map 로드 및 ui 구현 )

    
    @react-google-maps/api 라이브러리를 사용해서 구현해봤습니다.
    
    그로인해 이전에 json형식의 데이터를 받아서 구현하던 다른 페이지와는 제약이 존재 했지만
    
    Marker, InfoWindow 같은 기능들을 최대한 활용해 동적으로 개발 했습니다.
    

![Arena](https://github.com/ontothenextlevel/Basketball-Info/assets/119983922/c9fe30f7-5146-4f54-bd2a-164af7d0777c)


ArenaCategory.js
    
    Toggle형식으로 전체를 선택하는 All button, 서부와 동부를 나누는 Conference button, 각각 5개팀씩을 가진 Division button 구현 // useState의 Computed property,
                                                                                                                  매개 변수의 사용 등으로 구현
    
    button들의 click으로 인해 변수의 값이 변하면 useEffect에서 useNavigate를 통해 url변경
    
    
    
ArenaMap.js

    부모 컴포넌트에서 useLoadScript를 통해 Google Map API를 비동기적으로 불러오고 로드되면 렌더링
    
    카테고리에서 선택한 division을 useSearchParams로 가져와 Marker로 표시 // useEffect에서 team list 에서 해당 division을 filter()해서

    이니셜로된 Marker를 hover하면 team 이름과 arena 이름 InfoWindow로 보여줌 // onMouseOver 이벤트에 setState에 Name을 넣어서 return문에 
                                                                       삼항 조건 연산자로 해당 팀의 InfoWindow가 렌더링

    이니셜로된 Marker를 click하면 zoom되서 arena 근처로 이동 // useState로 되어있는 ZoomLevel을 클릭시 변경해서 구현
    
    ZoomLevel이 일정 수준 확대 되면 원상복귀하는 back button 구현 // useState로 되어있는 ZoomLevel이 일정 수준 이상되면 렌더링, 
                                                            click시 Position, Zoomlevel 초기화 
    
    
* * *

<br/>

Additional
=============

Go Up Button
-------------   

click시 상단으로 이동하는 button을 페이지 컨셉에 맞게 구현해봤습니다

    초기엔 공모양의 React Icon만 가지고 구현을 시작했던 상단 이동 버튼을 좀 더 재미있게 표현하고자
    
    골대모양 Icon도 추가하고 Count도 추가한 뒤 지금의 스타일로 구현 했습니다.
    
    초기의 웹페이지의 레이아웃에선 모든 페이지에 import해서 사용했지만 UI의 변경으로 현재는 Player 페이지에서만 사용중 입니다.

![goUp](https://github.com/ontothenextlevel/Basketball-Info/assets/119983922/3f1303f6-7e10-4dc5-afcf-99ef0ce5472c)

GoUpButton.js

    필요에 따라 ( 스크롤시 or 높이 생기면 ) 보이는 기능 구현 // FirstBtnStatus를 false로 두다 addEventListener("scroll")로 첫 스크롤 발생시
                                                    FirstBtnStatus를 true로 해서 display:block, ResizeObserver()로 
                                                    document.body의 높이가 window.innerHeight보다 커지면 display:block
                                                    
    scrollTo()를 사용해 클릭시 window의 top:0으로 이동 
    
    농구공이 득점 되는듯한 기능 구현 // click시 BtnState를 true로 변경, BtnState가 true인 상태로 top:0되면 Score이 +1 증가 와 폭죽 애니메이션
                                이 상태에서 다시 스크롤이 발생하면 BtnState를 false로 해서 상태 복귀
                                                    
