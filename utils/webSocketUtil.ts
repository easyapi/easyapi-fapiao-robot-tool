import SockJS from 'sockjs-client/dist/sockjs.min.js'
import Stomp from 'stompjs'

let stompClient: any = null
let taxNumber: any = ''

/**
 * 机器人状态
 */
function handlerRobotState(message: any) {
  const robotState = JSON.parse(message.body)
  localStorage.setItem('robotState', JSON.stringify(robotState))
}

/**
 * 连接失败
 */
function socketError() {
  setTimeout(connect, 2 * 1000)
}

/**
 * 订阅
 */
function subscribe() {
  // 发票机器人工作状态
  stompClient.subscribe(`/topic/${taxNumber}/shop/robot-state`, (message: any) => {
    handlerRobotState(message)
  })
}

/**
 * 连接
 */
export function connect() {
  const config = useRuntimeConfig()
  const socketUrl = `${config.public.baseUrl}/easyapi-socket`

  const socket = new SockJS(socketUrl)
  stompClient = Stomp.over(socket)
  // 清除控制台的打印
  // stompClient.debug = null;
  stompClient.connect({}, subscribe, socketError)
}

/**
 * 取消订阅
 */
export function disconnect() {
  if (stompClient)
    stompClient.disconnect()
}

/**
 * 设置税号
 */
export function setTaxNumber(data: any) {
  taxNumber = data
}
