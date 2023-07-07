# 원티드 프리온보딩 프론트엔드 챌린지 1

## 사전과제

https://github.com/vercel/next.js/

`npm start`가 실행될 때의 코드를 `Github`에서 찾아보았다.

root 디렉터리에서 `package`에 있을 것 같아서 이동해보니 `create-next-app` 디렉터리가 있는 것으로 보아 올바른 경로인듯 했다.

여러 폴더들 중 `next`란 이름의 폴더를 발견했고, 계속 따라서 들어갔더니(next/src/cli)에 `next-start.js`를 발견했다.

```js
const nextStart: CliCommand = async (argv) => {
const validArgs: arg.Spec = {
  // Types
  '--help': Boolean,
  '--port': Number,
  '--hostname': String,
  '--keepAliveTimeout': Number,

  // Aliases
  '-h': '--help',
  '-p': '--port',
  '-H': '--hostname',
}
```

위 코드는 인자값으로 오는 도움말, 포트번호, 호스트이름, keepalive와 그에 따른 별칭을 받는 것으로 보인다.

```js
let args: arg.Result<arg.Spec>
try {
  args = arg(validArgs, { argv })
} catch (error) {
  if (isError(error) && error.code === 'ARG_UNKNOWN_OPTION') {
    return printAndExit(error.message, 1)
  }
  throw error
}
```

위 코드는 인자값으로 받은 문자열이 유효하지 않은 문자열이면 에러를 반환해준다.

```js
if (args['--help']) {
  console.log(`
    Description
      Starts the application in production mode.
      The application should be compiled with \`next build\` first.

    Usage
      $ next start <dir> -p <port>

    <dir> represents the directory of the Next.js application.
    If no directory is provided, the current directory will be used.

    Options
      --port, -p          A port number on which to start the application
      --hostname, -H      Hostname on which to start the application (default: 0.0.0.0)
      --keepAliveTimeout  Max milliseconds to wait before closing inactive connections
      --help, -h          Displays this message
  `)
  process.exit(0)
}
```

만약 `--help`를 인자값으로 받으면 `console.log()`로 도움말을 출력해준다.

```js
const dir = getProjectDir(args._[0])
const host = args['--hostname']
const port = getPort(args)
```

인자값으로 받은 값들을 각각의 변수에 넣어주고

```js
const keepAliveTimeoutArg: number | undefined = args['--keepAliveTimeout']
if (
  typeof keepAliveTimeoutArg !== 'undefined' &&
  (Number.isNaN(keepAliveTimeoutArg) ||
    !Number.isFinite(keepAliveTimeoutArg) ||
    keepAliveTimeoutArg < 0)
) {
  printAndExit(
    `Invalid --keepAliveTimeout, expected a non negative number but received "${keepAliveTimeoutArg}"`,
    1
  )
}

const keepAliveTimeout = keepAliveTimeoutArg
  ? Math.ceil(keepAliveTimeoutArg)
  : undefined

const config = await loadConfig(
  PHASE_PRODUCTION_SERVER,
  resolve(dir || '.'),
  undefined,
  undefined,
  true
)
```

인자값으로 받은 `keepAliveTimeoutArg`가 유효한 값(숫자, 유한, 양수)이 아니면 에러 메시지를 출력해주고, `keepAliveTimeout`에 `keepAliveTimeoutArg`를 올림한 값을 넣어준다.

```js
await startServer({
  dir,
  isDev: false,
  hostname: host,
  port,
  keepAliveTimeout,
  useWorkers: !!config.experimental.appDir,
})
```

마지막으로 위 과정에서 받은 인자값들을 `startServer`에 넣어 실행한다.

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