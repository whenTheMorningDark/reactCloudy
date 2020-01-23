import axios from "axios";

export const baseUrl = "http://localhost:8081";
// axios 的实例和拦截配置
const axiosInstance = axios.create({
  baseUrl: baseUrl
});
axiosInstance.interceptors.response.use(
  res => res.data,
  err => {
    console.log(err, "网络错误");
  }
)
export {
  axiosInstance
}