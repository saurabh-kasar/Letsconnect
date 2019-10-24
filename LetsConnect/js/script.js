function reset()
{
    document.getElementById("myForm").reset();
}

function valid()
{
    var pwd = document.getElementById("pwd").value;
    var pwd1 = document.getElementById("pwd1").value;

    if(pwd == pwd1)
    {
        return true;
    }
    else{
        window.alert("Passwords don't match!");
        return false;
    }
}

function cancel()
{
location.href = "login.html";
}

function cancel1()
{
location.href = "index.html";
}

function saveData()
{

    var data = 
        {
        fname:document.getElementById("fname").value, 
        lname:document.getElementById("lname").value,
        gender:document.getElementById("gender").value, 
        email:document.getElementById("email").value,
        pwd:document.getElementById("pwd").value,
        status:"Offline"
        }
        

    var em = localStorage.getItem(document.getElementById("email").value);
    var p = document.getElementById("pwd").value;
    var fn = document.getElementById("fname").value;
    var ln = document.getElementById("lname").value;

    var letters = /^[a-zA-Z]+$/;

    if(fn.match(letters) && ln.match(letters))
    {
        if(p.length < 8)
        {
        return false;
        }
        else 
        {
            if(!em)
            {
            var email = document.getElementById("email").value;
            localStorage.setItem(document.getElementById("email").value, JSON.stringify(data));
            
            var temp = localStorage.getItem("Profiles");
            alert(temp);
            test = JSON.parse(temp);
            alert(test);            
            if(test == null)
            {
                test = [];
                test.push(email);
                alert(test);
                localStorage.setItem("Profiles", JSON.stringify(test));
                return true;
            }
            else
            {
                test.push(email);
                alert(test);
                localStorage.setItem("Profiles", JSON.stringify(test));
                alert("done");
            }

            document.getElementById("signup").action = "login.html";
            return true;
            }
            else{
            window.alert("User already exists!");
            location.href('login.html');
            }
        }
    }
    else
    {
        alert("Please enter only alphabets");
    }
}


function validate(){

    var val = valid();
    if(val == false)
     { 
     return false;
     }
     else{
         saveData();
         return true;
    }
}

function login()
{
    var em = document.getElementById("email").value;
    var str = JSON.parse(localStorage.getItem(em));
    if(str)
    {
        var pass = str.pwd;
        if(pass == document.getElementById("pwd").value)
        {
            sessionStorage.setItem("Online",em);
            str.status = "Online";
            alert(str.status);
            localStorage.setItem(em, JSON.stringify(str));
            document.getElementById("login").action = "home.html";
        }
        else
        {
            window.alert("Incorrect Username/Password!");
        }
    }
    else
    {
        window.alert("User does not exist!");
    }    
}
    


function update()
{
    var abc = localStorage.getItem(document.getElementById("email").value);
    var npwd = document.getElementById("pwd").value;
    
    if(npwd.length < 8)
    {
        return false;
    }
    else 
    {
        if(abc)
        {      
        var a= JSON.parse(abc);
        a.pwd = document.getElementById("pwd").value;
        var b = JSON.stringify(a);
        window.localStorage.setItem(a.email,b);
        window.forgot.action="login.html";
        }
        else
        {
        window.alert("User does not exist!");
        }
    }
}

function check()
{
    var pqr = localStorage.getItem(document.getElementById("email").value);
    if(pqr)
    {
        document.getElementById("new").hidden = false;
        document.getElementById("cnew").hidden = false;
        document.getElementById("snew").hidden = false;
        document.getElementById("cnf").hidden=true;
        return true;
    }
    else{
        window.alert("User does not exist! Try again!");
        location.href = "forgot.html";
        return false;
    }
}

function forgot(){

    var val = valid();
    if(val == false)
     { 
     return false;
     }
     else{
         update();
         return true;
    }
}

function logchk()
{
        let params = (new URL(document.location)).searchParams;
        let email = params.get("email");
        var obj = localStorage.getItem(email);
        if(obj)
        {
            document.getElementById("home").hidden = false;
            return true;
        }
        else
        {
            alert("Please login first");
            location.href = "index.html";
            return false;
        }
}


function logout()
{
    let params = (new URL(document.location)).searchParams;
    let email = params.get("email");
    var str = JSON.parse(localStorage.getItem(email));
    str.status = "Offline";
    alert(str.status);
    localStorage.setItem(email, JSON.stringify(str));
    sessionStorage.removeItem("Online");
    location.href = "index.html";    
}

function deregister()
{
    var ans = window.confirm("Do you really want to de-register?");
    alert(ans);
    if(ans)
    {
        let params = (new URL(document.location)).searchParams;
        let email = params.get("email");
        alert(email);
        sessionStorage.removeItem(email);
        localStorage.removeItem(email);
        alert("De-registered successfully!");
        location.href = "index.html";   
    }
    else
    {   
    }
}

function online()
    {       
        for(i=0; i<=localStorage.length-1; i++)
        {
            let email = sessionStorage.getItem("Online");
            var table = document.getElementById("users");
            var row = table.insertRow(1);
            var key1 = window.localStorage.key(i);
            var obj = JSON.parse(localStorage.getItem(key1));
            var s = obj.status;
            
            if(s == "Online" && obj.email != email)
            {
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    cell1.innerHTML = obj.fname + " " + obj.lname;
                    cell2.innerHTML = obj.email;
                    cell3.innerHTML = s;
            }
        } 
    }

function setoffline()
{
    var email = sessionStorage.getItem("Online");
    var obj = JSON.parse(localStorage.getItem(email));
    obj.status="Offline";
    localStorage.setItem(email,JSON.stringify(obj));
    return true;
}