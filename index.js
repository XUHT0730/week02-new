import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp ({
    data(){
        return{
           apiUrl : 'https://vue3-course-api.hexschool.io/v2',
           apiPath : 'hedy-api-path',
           products : [],
           tempProduct: {},
        };
    },
    methods: {
        checkLogin(){
            const url = `${this.apiUrl}/api/user/check`;
            axios.post(url)
             .then(()=>{
                //console.log('驗證成功');
                alert('驗證成功 歡迎光臨 ~');
                this.getProducts();
             })
             .catch((err)=>{
                alert(err.response.data.message);
                window.location = "login.html";
             })
        },
        getProducts(){
            //https://vue3-course-api.hexschool.io/ 新增資料的網址
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
            axios.get(url)
                .then((res) => {
                this.products = res.data.products;
                })
                .catch((err) => {
                alert(err.response.data.message);
            })
            /*this.products=[
                {
                    category: "甜甜圈",
                    content: "尺寸：14x14cm",
                    description:
                      "濃郁的草莓風味，中心填入滑順不膩口的卡士達內餡，帶來滿滿幸福感！",
                    id: "-L9tH8jxVb2Ka_DYPwng",
                    is_enabled: 1,
                    origin_price: 150,
                    price: 99,
                    title: "草莓莓果夾心圈",
                    unit: "個",
                    num: 10,
                    imageUrl:
                      "https://images.unsplash.com/photo-1583182332473-b31ba08929c8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fGRvbnV0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
                    imagesUrl: [
                      "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2832&q=80",
                      "https://images.unsplash.com/photo-1559656914-a30970c1affd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTY0fHxkb251dHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
                    ],
                  },
                  {
                    category: "蛋糕",
                    content: "尺寸：6寸",
                    description:
                      "蜜蜂蜜蛋糕，夾層夾上酸酸甜甜的檸檬餡，清爽可口的滋味讓人口水直流！",
                    id: "-McJ-VvcwfN1_Ye_NtVA",
                    is_enabled: 16,
                    origin_price: 1000,
                    price: 900,
                    title: "蜂蜜檸檬蛋糕",
                    unit: "個",
                    num: 1,
                    imageUrl:
                      "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80",
                    imagesUrl: [
                      "https://images.unsplash.com/photo-1618888007540-2bdead974bbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80",
                    ],
                  },
                  {
                    category: "蛋糕",
                    content: "尺寸：6寸",
                    description: "法式煎薄餅加上濃郁可可醬，呈現經典的美味及口感。",
                    id: "-McJ-VyqaFlLzUMmpPpm",
                    is_enabled: 1,
                    origin_price: 700,
                    price: 600,
                    title: "暗黑千層",
                    unit: "個",
                    num: 15,
                    imageUrl:
                      "https://images.unsplash.com/photo-1505253149613-112d21d9f6a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
                    imagesUrl: [
                      "https://images.unsplash.com/flagged/photo-1557234985-425e10c9d7f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA5fHxjYWtlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
                      "https://images.unsplash.com/photo-1540337706094-da10342c93d8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
                    ],
                  },
            ];*/
        },
        openProduct(item){
            this.tempProduct = item; //產品訂購區等同於指定的訂購
        }
      },
    mounted() {
        //mounted 將 token 取出，並直接設定到 axios 的預設內容中，
        //這種寫法可以不用在每次發送請求時重複帶入 token 這段
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,"$1",
          );
         // 夾帶 token 在 header 中，只要加入一次就可以重複使用
        //https://axios-http.com/zh/docs/config_defaults
        axios.defaults.headers.common['Authorization'] = token;
        // 觸發確認是否登入
        this.checkLogin();
      }
}).mount('#app');