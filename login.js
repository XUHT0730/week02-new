import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
const app = createApp({
    data() {
      return {
        user: {
            username : "",
            password : "",
        },
      };
    },
    methods: {
      login(){
        //宣告一個 apiUrl 變數存放 API 網址
        const apiUrl ='https://vue3-course-api.hexschool.io/v2/admin/signin';
        axios.post(apiUrl, this.user)
        .then((res) =>{
            //若登入成功，就會執行 .then 的內容，
           // 寫入 cookie 的token
          // 使用 expired 設置有效時間
            const { token, expired} = res.data; // 使用解構方式將 token, expired 兩個變數從回傳的資料中取出
          //console.log(new Date(expired));
          //https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
          //myToken為自訂，可自行更改
          document.cookie = `myToken=${token}; expires=${new Date(expired)}; path=/`;
          window.location = 'index.html';
        })
         .catch((err)=>{
            console.dir(err);
            alert(err.response.data.message);
         });
      },
    }
  })
  
  app.mount('#app');