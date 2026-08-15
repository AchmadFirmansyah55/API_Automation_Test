const {describe} = require("mocha");
const assert = require('assert');
const { expect } = require("chai");

describe("Add Users test",function(){

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
    
    it("Should add user successfully",async function() {
        const response = await fetch('https://belajar-bareng.onrender.com/api/add-user',{
            method  : 'POST',
            headers : {"Content-type":"application/json",
            authorization : `Bearer ${token}`},
            body    : JSON.stringify({
                username :'trondolo',
                age : 38
            })
        })
        const data = await response.json();
        assert.strictEqual(response.status,201);
        assert.strictEqual(data.message,'User successfully added, Hi trondolo!');
    })

    it("Should not add user with when username is blank",async function() {
        const response = await fetch('https://belajar-bareng.onrender.com/api/add-user',{
            method  : 'POST',
            headers : {"Content-type":"application/json",
            authorization : `Bearer ${token}`},
            body    : JSON.stringify({
                username :'',
                age : 40
            })
        })
        const data = await response.json();
        assert.strictEqual(response.status,400);
        assert.strictEqual(data.error,'Missing username or age');
    })
    
    it("Should not add user when age is blank",async function() {
        const response = await fetch('https://belajar-bareng.onrender.com/api/add-user',{
            method  : 'POST',
            headers : {"Content-type":"application/json",
            authorization : `Bearer ${token}`},
            body    : JSON.stringify({
                username :'Gufron',
                age : ''
            })
        })
        const data = await response.json();
        assert.strictEqual(response.status,400);
        assert.strictEqual(data.message,'Missing username or age');
    })
    
    it("Should not add user when username contains unique character",async function() {
        const response = await fetch('https://belajar-bareng.onrender.com/api/add-user',{
            method  : 'POST',
            headers : {"Content-type":"application/json",
            authorization : `Bearer ${token}`},
            body    : JSON.stringify({
                username :'achmad@ la',
                age : 33
            })
        })
        const data = await response.json();
        assert.strictEqual(response.status,400);
        assert.strictEqual(data.message,'Username must be alphabetic');
    })


    it("Should not add user when age contain unique character",async function() {
        const response = await fetch('https://belajar-bareng.onrender.com/api/add-user',{
            method  : 'POST',
            headers : {"Content-type":"application/json",
            authorization : `Bearer ${token}`},
            body    : JSON.stringify({
                username :'achmad',
                age : '38a!!'
            })
        })
        const data = await response.json();
        assert.strictEqual(response.status,400);
        assert.strictEqual(data.message,'Age must be numeric, not text!');
    })


    it("Should not add user when username is already registered",async function() {
        const response = await fetch('https://belajar-bareng.onrender.com/api/add-user',{
            method  : 'POST',
            headers : {"Content-type":"application/json",
            authorization : `Bearer ${token}`},
            body    : JSON.stringify({
                username :'trondolo',
                age : 55
            })
        })
        const data = await response.json();
        assert.strictEqual(response.status,400);
        assert.strictEqual(data.status,'username already exist');
    })

    it("Should not add user when username more than 10 characters",async function() {
        const response = await fetch('https://belajar-bareng.onrender.com/api/add-user',{
            method  : 'POST',
            headers : {"Content-type":"application/json",
            authorization : `Bearer ${token}`},
            body    : JSON.stringify({
                username :'Taufikhidayatmerdeka',
                age : 60
            })
        })
        const data = await response.json();
        assert.strictEqual(response.status,400);
        assert.strictEqual(data.status,'username cannot exceeds 10 characters');
    })

    it("Should not add user when age more than 3 digit numbers",async function() {
        const response = await fetch('https://belajar-bareng.onrender.com/api/add-user',{
            method  : 'POST',
            headers : {"Content-type":"application/json",
            authorization : `Bearer ${token}`},
            body    : JSON.stringify({
                username :'Taufik',
                age :6000
            })
        })
        const data = await response.json();
        assert.strictEqual(response.status,400);
        assert.strictEqual(data.status,'age cannot exceeds 999');
    })
})