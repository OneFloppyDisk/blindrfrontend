const ip = "http://103.13.210.64"
// const ip = "http://103-13-210-64.cloud-xip.com"
// const ip = "http://172.16.1.41:8000"
const socketIp = ip.replace("http://", "ws://")
const isDev = true
export {ip, socketIp, isDev}
