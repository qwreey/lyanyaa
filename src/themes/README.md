
ThemeProvider: 테마를 로드하고 적절한 *Context* 를 반환합니다. 유저의 테마
               설정값과 네이티브 테마를 확인하는 역할을 수행합니다.
               state 트리거해서 테마도 업데이트 해줌
ThemeBase : 모든 테마의 베이스가 되어지며, ToastBackground, ToastText 등과 같은 모든
            컴포넌트들의 색들을 프로퍼티로 가집니다. 실질적으로 사용 X
            extendable interface 입니다
ThemeImporter : 추후 Misskey 의 테마나 유저가 JSON 으로 테마를 추가할 수 있게 해주는
                외부 Importer 입니다 > 아직은 더미 상태

GeneralMapper : TextColor, BackgroundColor, TopbarColor 와 같이 필요한 최소의 색만
                가지고 ThemeBase 의 모든 컴포넌트 색에 매핑을 해줍니다,
                ToastText, TopbarText 와 같이 같은 색을 사용하는게 있는 경우
                자동으로 TextColor 로 매핑합니다.
                *모든 프로퍼티는 XXXColor 로 작명합니다*
Dark : 다크 테마이며 GeneralMapper 로 구현됩니다
Light : 라이트 테마이며 GeneralMapper 로 구현됩니다


몰겠고 싹다 지워버리고 Provider 만 남겨두자 그리고 storage 같은 접근은 여기서 하지 말고 Main 이 좀 하면 안될까
