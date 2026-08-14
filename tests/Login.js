const assert = require('assert')

describe("Login Test",function(){
    it("Should login successfully",async function() {
        const response = await fetch('https://belajar-bareng.onrender.com/api/login',{
            method  : 'POST',
            headers : {"Content-type":"application/json"},
            body    : JSON.stringify({
                username :"admin",
                password :"admin"
            })
        })
        const data = await response.json();
        assert.strictEqual(response.status,200);
        assert.strictEqual(data.message,'Login successful');
    })

    it("Should not login with invalid username",async function() {
        const response = await fetch('https://belajar-bareng.onrender.com/api/login',{
            method  : 'POST',
            headers : {"Content-type":"application/json"},
            body    : JSON.stringify({
                username :"jokowi",
                password :"admin"
            })
        })
        const data = await response.json();
        assert.strictEqual(response.status,401);
        assert.strictEqual(data.message,'Invalid username or password!');
    })

        it("Should not login with invalid password",async function() {
        const response = await fetch('https://belajar-bareng.onrender.com/api/login',{
            method  : 'POST',
            headers : {"Content-type":"application/json"},
            body    : JSON.stringify({
                username :"admin",
                password :"gibran"
            })
        })
        const data = await response.json();
        assert.strictEqual(response.status,401);
        assert.strictEqual(data.message,'Invalid username or password!');
    })

        it("Should not login with blank username",async function() {
        const response = await fetch('https://belajar-bareng.onrender.com/api/login',{
            method  : 'POST',
            headers : {"Content-type":"application/json"},
            body    : JSON.stringify({
                username :"",
                password :"admin"
            })
        })
        const data = await response.json();
        assert.strictEqual(response.status,400);
        assert.strictEqual(data.message,'Username or password is required');
    })

            it("Should not login with blank password",async function() {
        const response = await fetch('https://belajar-bareng.onrender.com/api/login',{
            method  : 'POST',
            headers : {"Content-type":"application/json"},
            body    : JSON.stringify({
                username :"admin",
                password :""
            })
        })
        const data = await response.json();
        assert.strictEqual(response.status,400);
        assert.strictEqual(data.message,'Username or password is required');
    })
})