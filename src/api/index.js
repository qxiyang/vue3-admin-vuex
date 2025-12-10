import request from '../untils/request';

export default {//换种写法，可以不用每次从api调用，直接挂载在main.js上,用对象的方式返回
    login(data){
        return request.post('/login',data)
    },
    Indexindex(){
        return request.get('/Index/index')
    }
}