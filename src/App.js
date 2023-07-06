import './App.css'
import React, {Component} from 'react'

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

function Root() {
  return (
    <div className='title'>
      <h1>root</h1>
    </div>
  )
}

function About() {
  return (
    <div className='title'>
      <h1>about</h1>
    </div>
  )
}

export default App