var tabel1 = 0;
var table2 = 0;
var Tables = /** @class */ (function () {
    function Tables(id) {
        this.id = id;
        this.total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.cols();
        this.row = 1;
        this.col = 1;
        this.value = 0;
        this.play = 1;
        this.temp = [];
    }
    //for button
    Tables.prototype.button = function (tab) {
        tab.setAttribute("align", "center");
        var h3 = document.createElement("h3");
        h3.style.textAlign = "center";
        h3.innerHTML = "<i>Team Total Score</i>";
        var score = document.createElement("h3");
        score.setAttribute("id", "totalscore" + this.id);
        score.style.textAlign = "center";
        score.innerHTML = "0";
        var btn = document.createElement("button");
        btn.setAttribute("id", "buttontable" + this.id);
        btn.addEventListener("click", this.whenclick());
        btn.style.borderRadius = "10px";
        btn.style.height = "30px";
        btn.style.width = "100px";
        btn.style.margin = "5px";
        btn.style.backgroundColor = "lightblue";
        btn.innerHTML = "<b>Hit</b>";
        tab.appendChild(h3);
        tab.appendChild(score);
        tab.appendChild(btn);
    };
    //for columns and rows
    Tables.prototype.cols = function () {
        var tab = document.createElement("div");
        var temp = 1;
        tab.style.margin = "0 auto";
        this.button(tab);
        //rows
        for (var i = 1; i <= 11; i++) {
            console.log(i);
            var row = document.createElement("div");
            row.style.display = "flex";
            row.style.flexDirection = "row";
            //columns
            for (var j = 1; j <= 8; j++) {
                var col = document.createElement("div");
                col.style.border = "1px solid";
                if (j == 1) {
                    col.style.width = "800px";
                    col.style.height = "30px";
                }
                else if (j == 8) {
                    col.style.width = "350px";
                    col.style.height = "30px";
                    col.setAttribute("id", "total" + this.id + "" + (i - 1));
                }
                else {
                    col.style.width = "350px";
                    col.style.height = "30px";
                    col.setAttribute("id", "" + this.id + "" + (i - 1) + "" + (j - 1));
                    col.setAttribute("value", "0");
                }
                col.style.margin = "3px";
                col.style.backgroundColor = "wheat";
                col.style.gap = "2px";
                col.style.display = "flex";
                col.style.flexDirection = "column";
                col.style.textAlign = "center";
                console.log(col);
                if (i == 1) {
                    if (j == 1) {
                        col.innerHTML = "<b>Team</b>";
                    }
                    else if (j == 8) {
                        col.innerHTML = "<b>Total</b>";
                    }
                    else {
                        col.innerHTML = "<b>B" + (j - 1) + "</b>";
                    }
                }
                else {
                    if (j == 1) {
                        col.innerHTML = "<b>Player " + (i - 1) + "</b>";
                    }
                    if (j == 8) {
                        col.innerHTML = "<b>" + this.total[i - 2] + "</b>";
                    }
                }
                row.appendChild(col);
            }
            tab.style.border = "1px solid";
            tab.appendChild(row);
        }
        document.getElementById("table" + this.id).appendChild(tab);
    };
    //onclick comes to this and checks for values and assign it
    Tables.prototype.whenclick = function () {
        var _this = this;
        return function () {
            _this.value = _this.value + 1;
            var val = _this.rand();
            document.getElementById(_this.id + "" + _this.row + "" + _this.col).innerHTML = "" + val;
            if (_this.col <= 6 && val != 0 && _this.value <= 5) {
                _this.col = _this.col + 1;
                _this.temp.push(val);
                _this.sum(_this.temp, _this.row);
                _this.totalScore();
            }
            else {
                _this.sum(_this.temp, _this.row);
                _this.row = _this.row + 1;
                _this.col = 1;
                _this.value = 0;
                _this.temp = [];
                _this.totalScore();
            }
        };
    };
    //total
    Tables.prototype.totalScore = function () {
        var score = document.getElementById("totalscore" + this.id);
        var sum = this.total.reduce(function (a, b) { return a + b; }, 0);
        score.innerHTML = "" + sum;
    };
    //sum of particular player
    Tables.prototype.sum = function (temp1, row1) {
        var arrSum = temp1.reduce(function (a, b) { return a + b; }, 0);
        console.log(arrSum);
        document.getElementById("total" + this.id + "" + row1).innerHTML = "<b>" + arrSum + "</b>";
        this.total[row1 - 1] = arrSum;
    };
    //generating random numbers
    Tables.prototype.rand = function () {
        return Math.floor(Math.random() * 6);
    };
    return Tables;
}());
var timeCount = /** @class */ (function () {
    function timeCount() {
        this.countdown();
        this.startCount = 60;
    }
    //count down
    timeCount.prototype.countdown = function () {
        var timediv = document.createElement("div");
        timediv.setAttribute("id", "timer");
        timediv.setAttribute("align", "center");
        timediv.style.display = "flex";
        timediv.style.flexDirection = "column";
        var timer = document.createElement("div");
        timer.style.margin = "0 auto";
        var h1 = document.createElement("h2");
        h1.style.textAlign = "center";
        h1.innerHTML = "<b>Time Remaining</b><br>";
        timer.appendChild(h1);
        var h2 = document.createElement("h3");
        var temp = 0;
        var _loop_1 = function (i) {
            setTimeout(function () {
                //console.log(i)
                h2.innerHTML = "" + i;
                this.startCount = this.startCount - 1;
                timer.appendChild(h2);
            }, 1000 * temp);
            temp = temp + 1;
        };
        for (var i = 60; i >= 0; i--) {
            _loop_1(i);
        }
        timediv.append(timer);
        document.getElementById("time").appendChild(timediv);
        var mom = document.createElement("div");
        mom.style.margin = "0 auto";
        var btn = document.createElement("button");
        btn.style.borderRadius = "10px";
        btn.style.height = "30px";
        btn.style.width = "300px";
        btn.style.margin = "5px";
        btn.style.backgroundColor = "lightblue";
        btn.addEventListener("click", this.results());
        btn.innerHTML = "<b>Generate Results</b>";
        mom.appendChild(btn);
        var br = document.createElement("br");
        mom.appendChild(br);
        var br1 = document.createElement("br");
        mom.appendChild(br1);
        var hr = document.createElement("hr");
        mom.appendChild(hr);
        var h4 = document.createElement("h3");
        h4.innerHTML = "<b><i>Winner</i></b>";
        mom.appendChild(h4);
        var winner = document.createElement("h2");
        winner.setAttribute("id", "winner");
        mom.appendChild(winner);
        var br2 = document.createElement("br");
        mom.appendChild(br2);
        var hr1 = document.createElement("hr");
        mom.appendChild(hr1);
        var m = document.createElement("h3");
        m.innerHTML = "<b><i>Man of the Match</i></b>";
        mom.appendChild(m);
        var man = document.createElement("h2");
        man.setAttribute("id", "man");
        mom.appendChild(man);
        timediv.appendChild(mom);
    };
    timeCount.prototype.results = function () {
        var _this = this;
        return function () {
            var t1 = document.getElementById("totalscore1").innerText;
            var t2 = document.getElementById("totalscore2").innerText;
            var team = 0;
            if (t1 > t2) {
                document.getElementById("winner").innerHTML = "<i>Team 1</i>";
                team = 1;
            }
            else {
                document.getElementById("winner").innerHTML = "<i>Team 2</i>";
                team = 2;
            }
            _this.manofthematch(team);
        };
    };
    timeCount.prototype.manofthematch = function (team) {
        var sum1 = [];
        for (var i = 1; i <= 10; i++) {
            sum1.push(document.getElementById("total" + team + "" + i).innerText);
        }
        console.log(sum1);
        var m = Math.max.apply(Math, sum1);
        console.log(m + "Highest");
        document.getElementById("man").innerHTML = "<i>Team &ensp;" + team + "<br>player &ensp;" + (sum1.indexOf("" + m) + 1) + "</i>";
    };
    return timeCount;
}());
new Tables(1);
document.getElementById("buttontable1").style.display = "none";
setTimeout(function () {
    document.getElementById("buttontable1").style.display = "block";
    new timeCount();
}, 3 * 1000);
setTimeout(function () {
    document.getElementById("team").innerHTML = "<i>Team 1 Stop the game</i>";
}, 63 * 1000);
setTimeout(function () {
    //let k=new timeCount();
    document.getElementById("team").innerHTML = "<i>Team 2 Start the game</i>";
    document.getElementById("timer").innerHTML = "";
    document.getElementById("buttontable1").style.display = "none";
    document.getElementById("buttontable2").style.display = "block";
    new timeCount();
}, 65 * 1000);
setTimeout(function () {
    document.getElementById("team").innerHTML = "<i>Team 2 Stop the game</i>";
    document.getElementById("buttontable1").style.display = "none";
    document.getElementById("buttontable2").style.display = "none";
}, 125 * 1000);
new Tables(2);
document.getElementById("buttontable2").style.display = "none";
