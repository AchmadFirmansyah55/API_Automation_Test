const {describe} = require("mocha");
const assert = require('assert');
const { expect } = require("chai");


describe("Get users test",function(){

    let token='';

    before(async function() {
        const responseLogin = await fetch('https://belajar-bareng.onrender.com/api/login',{
            method  : 'POST',
            headers : {"Content-type":"application/json"},
            body    : JSON.stringify({
                username :"admin",
                password :"admin"
            })
        })
        const dataLogin = await responseLogin.json();
        token = dataLogin.token;
    })

    it("Should get user successfully",async function() {
        const response = await fetch('https://belajar-bareng.onrender.com/api/users',{
            method  : 'GET',
            headers : {"Content-type":"application/json",
            authorization : `Bearer ${token}`}
        })
        const data = await response.json();
        assert.strictEqual(response.status,200);
        assert.strictEqual(data.users[0].username,'Ridhwan');
    })
    
    it("Should not get user without token",async function() {
        const response = await fetch('https://belajar-bareng.onrender.com/api/users',{
            method  : 'GET',
            headers : {"Content-type":"application/json",
            authorization : ''}
        })
        const data = await response.json();
        assert.strictEqual(response.status,401);
    })
})