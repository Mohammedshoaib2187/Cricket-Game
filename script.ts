let tabel1=0
let table2=0
class Tables
{
    id :number;
    total:Array<number>;
    row:number;
    col:number;
    value:number;
    play:number;
    temp:Array<number>;
    constructor(id:number){
        this.id=id
        this.total=[0,0,0,0,0,0,0,0,0,0]
        this.cols()
        this.row=1
        this.col=1
        this.value=0
        this.play=1
        this.temp=[]
    }
    
    //for button
    button(tab:HTMLDivElement){
        tab.setAttribute("align","center")

        let h3=document.createElement("h3")
        h3.style.textAlign="center"
        h3.innerHTML="<i>Team Total Score</i>"

        let score=document.createElement("h3")
        score.setAttribute("id","totalscore"+this.id)
        score.style.textAlign="center"
        score.innerHTML="0"
        
        let btn=document.createElement("button")
        btn.setAttribute("id","buttontable"+this.id)
        btn.addEventListener("click",this.whenclick())
        btn.style.borderRadius="10px"
        btn.style.height="30px"
        btn.style.width="100px"
        btn.style.margin="5px"
        btn.style.backgroundColor="lightblue"
        btn.innerHTML="<b>Hit</b>"

        tab.appendChild(h3)
        tab.appendChild(score)
        tab.appendChild(btn)

    }
    //for columns and rows
    cols()
    {   
        let tab=document.createElement("div")
        let temp=1
        tab.style.margin="0 auto"
        this.button(tab)
        //rows
        for(let i=1;i<=11;i++)
        {
            console.log(i)
            let row=document.createElement("div")
            row.style.display="flex"
            row.style.flexDirection="row"
            //columns
            for(let j=1;j<=8;j++)
            {
                
                let col=document.createElement("div")
                col.style.border="1px solid"
                if(j==1){
                    col.style.width="800px"
                    col.style.height="30px"
                }
                else if(j==8){
                    col.style.width="350px"
                    col.style.height="30px"
                    col.setAttribute("id","total"+this.id+""+(i-1))
                }
                else{
                    col.style.width="350px"
                    col.style.height="30px"
                    col.setAttribute("id",""+this.id+""+(i-1)+""+(j-1))
                    col.setAttribute("value","0")
                }
                col.style.margin="3px"
                col.style.backgroundColor="wheat"
                col.style.gap="2px"
                col.style.display="flex"
                col.style.flexDirection="column"
                col.style.textAlign="center"
                console.log(col)
                if(i==1){
                    if(j==1){
                        col.innerHTML="<b>Team</b>"
                    }
                    else if(j==8){
                        col.innerHTML="<b>Total</b>"
                    }
                    else{
                        col.innerHTML="<b>B"+(j-1)+"</b>"
                    }
                }
                else{
                    if(j==1){
                        col.innerHTML="<b>Player "+(i-1)+"</b>"
                    }
                    if(j==8){
                        col.innerHTML="<b>"+this.total[i-2]+"</b>"
                    }
                }
                
                row.appendChild(col)
            }
            tab.style.border="4px solid"
            tab.appendChild(row)
        }
        document.getElementById("table"+this.id).appendChild(tab)
    }
    //onclick comes to this and checks for values and assign it
    whenclick():()=>void{
        return ()=>{
            this.value=this.value+1
            let val=this.rand()
            document.getElementById(this.id+""+this.row+""+this.col).innerHTML=""+val
            if(this.col<=6 && val!=0 && this.value<=5){
                
                this.col=this.col+1
                this.temp.push(val)
                this.sum(this.temp,this.row)
                this.totalScore()
            }
            else{
                this.sum(this.temp,this.row)
                this.row=this.row+1
                this.col=1
                this.value=0
                this.temp=[]
                this.totalScore()
            }
        }
    }
    //total
    totalScore(){
        let score=document.getElementById("totalscore"+this.id)
        let sum=this.total.reduce((a, b) => a + b, 0)
        score.innerHTML=""+sum
    }
    //sum of particular player
    sum(temp1:Array<number>,row1:number){
        let arrSum=temp1.reduce((a, b) => a + b, 0)
        console.log(arrSum)
        document.getElementById("total"+this.id+""+row1).innerHTML="<b>"+arrSum+"</b>"
        this.total[row1-1]=arrSum
    }
    //generating random numbers
    rand():number{
        return Math.floor(Math.random() * 6);
    }
    
}
class timeCount
{
    startCount:number;
    constructor()
    {
        this.countdown()
        this.startCount=60;
    }
    
    //count down
    countdown()
    {
        let timediv=document.createElement("div")
        timediv.setAttribute("id","timer")
        timediv.setAttribute("align","center")
        timediv.style.display="flex"
        timediv.style.flexDirection="column"

        let timer=document.createElement("div")
        
        timer.style.margin="0 auto"

        let h1=document.createElement("h2")
        h1.style.textAlign="center"
        h1.style.color="red"
        h1.innerHTML="<b>Time Remaining</b><br>"
        timer.appendChild(h1)

        let h2=document.createElement("h3")
        h2.setAttribute("id","timerem")
        let temp=0
        for(let i=60;i>=0;i--)
        {
            setTimeout(function(){
                //console.log(i)
                h2.innerHTML=""+i
                this.startCount=this.startCount-1
                timer.appendChild(h2)
                
            },1000*temp)
            temp=temp+1
        }

        timediv.append(timer)
        document.getElementById("time").appendChild(timediv)

        let mom=document.createElement("div")
        mom.style.margin="0 auto"
            let btn=document.createElement("button")
            btn.style.borderRadius="10px"
            btn.style.height="30px"
            btn.style.width="300px"
            btn.style.margin="5px"
            btn.style.backgroundColor="lightblue"
            btn.addEventListener("click",this.results())
            btn.innerHTML="<b>Generate Results</b>"
            mom.appendChild(btn)
        
        
        let br=document.createElement("br")
        mom.appendChild(br)
        let br1=document.createElement("br")
        mom.appendChild(br1)
        let hr=document.createElement("hr")
        mom.appendChild(hr)
        let h4=document.createElement("h3")
        h4.innerHTML="<b><i>Winner</i></b>"
        mom.appendChild(h4)
        let winner=document.createElement("h2")
        winner.setAttribute("id","winner")
        mom.appendChild(winner)

        let br2=document.createElement("br")
        mom.appendChild(br2)
        let hr1=document.createElement("hr")
        mom.appendChild(hr1)
        let m=document.createElement("h3")
        m.innerHTML="<b><i>Man of the Match</i></b>"
        mom.appendChild(m)
        let man=document.createElement("h2")
        man.setAttribute("id","man")
        mom.appendChild(man)

        timediv.appendChild(mom)


    }
    results():()=>void{
        return ()=>{
            let t1=document.getElementById("totalscore1").innerText
            let t2=document.getElementById("totalscore2").innerText
            let team=0
            if(t1==t2)
            {
                document.getElementById("winner").innerHTML="<i>Draw</i>"
                document.getElementById("man").innerHTML="None"
            }
            else{
                if(t1>t2)
                {
                    document.getElementById("winner").innerHTML="<i>Team 1</i>"
                    team=1
                }
                else{
                    document.getElementById("winner").innerHTML="<i>Team 2</i>"
                    team=2
                }
            

                this.manofthematch(team)
            }
        }
    }
    manofthematch(team:number)
    {
        let sum1=[]
        for(let i=1;i<=10;i++)
        {
            sum1.push(document.getElementById("total"+team+""+i).innerText)
        }
        console.log(sum1)
        let m=Math.max(...sum1)
        console.log(m+"Highest")
        document.getElementById("man").innerHTML="<i>Team &ensp;"+team+"<br>player &ensp;"+(sum1.indexOf(""+m)+1)+"</i>"
    }
}
new Tables(1);
document.getElementById("buttontable1").style.display="none"
setTimeout(()=>{
    document.getElementById("buttontable1").style.display="block"
    new timeCount();

},3*1000)

setTimeout(()=>{
    document.getElementById("team").innerHTML="<i>Team 1 Stop the game</i>"
},63*1000)
setTimeout(() => {
    //let k=new timeCount();
    document.getElementById("team").innerHTML="<i>Team 2 Start the game</i>"
    document.getElementById("timer").innerHTML=""
    document.getElementById("buttontable1").style.display="none"
    document.getElementById("buttontable2").style.display="block"
    new timeCount()
}, 65*1000);
setTimeout(()=>{
    document.getElementById("team").innerHTML="<i>Team 2 Stop the game</i>"
    document.getElementById("buttontable1").style.display="none"
    document.getElementById("buttontable2").style.display="none"
},125*1000)
new Tables(2);
document.getElementById("buttontable2").style.display="none"