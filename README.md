# 원티드 프리온보딩 프론트엔드 챌린지 1

## React와 History API 사용하여 SPA Router 기능 구현하기

이번에 프리온보딩을 시작하면서 React도 처음 시작하다 보니 어려움이 많이 있다.

아직 챌린지를 완벽하게 구현할 능력이 되진 않지만 그래도 어느정도 흉내내려고 노력했다.

## 화면 구성

![root](./readme_img/root.png)

## 코드

```jsx
class App extends Component {
  state = {
    // 현재 페이지를 상태 값으로 관리
    pageName : '',
  }

  onChagePage = pageName => {
    // 버튼이 클릭되면 pageName 이라는 상태값을 바꿔주기 위한 메서드
    this.setState({pageName})
  }

  // 랭킹 페이지 버튼 클릭
  onRootClick = () => {
    const pageName = 'Root'
    window.history.pushState(pageName, '', '/')
    this.onChagePage(pageName)
  }

  // 유저 페이지 버튼 클릭
  onAboutClick = () => {
    const pageName = 'About'
    window.history.pushState(pageName, '', '/about')
    this.onChagePage(pageName)
  }

  render() {
    const { pageName } = this.state
    return (
      <div>
        <button className='link' onClick={this.onRootClick}>Root</button>
        <button className='link' onClick={this.onAboutClick}>About</button>
        {!pageName && <Root />}
        {pageName === 'Root' && <Root />}
        {pageName === 'About' && <About />}
      </div>
    )
  }
}
```

```jsx
function Root() {
  return (
    <div className='title'>
      <h1>root</h1>
    </div>
  )
}
```

```jsx
function About() {
  return (
    <div className='title'>
      <h1>about</h1>
    </div>
  )
}
```

## 후기

아직 부족한 점이 많기에 요구 사항을 완벽히 구현해내지 못했지만 챌린지를 하면서 router 기능을 어느정도 이해할 수 있는 시간이었다.