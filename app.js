let timeShow=document.querySelector(".time-show");
let timeSelect=document.querySelectorAll(".time-select");
let inputTime=document.querySelector(".input-time");
let inputBtn=document.querySelector(".inputBtn");
let videoDisplay=document.querySelector("video");
let videoSelect=document.querySelectorAll(".video-select");
let song=document.querySelector("audio");
let songSelect=document.querySelectorAll(".song-select");
let duration;
let source;
let pause=document.querySelector(".pause");
let play=document.querySelector(".play");
let stop,check=false,sec=59,i,d,fill=0,s;
let restart=document.querySelector(".restart");
let outline=document.querySelector(".moving-outline circle");

let outlineLength = outline.getTotalLength();
outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;


inputBtn.addEventListener("click",function(){
inputBtn.setAttribute("data-time",inputTime.value);
});
  timeSelect.forEach(time=>{
      time.addEventListener("click",function(){
          duration=this.getAttribute("data-time");
          timeShow.innerHTML=`${Math.floor(duration/60)}:${Math.floor(duration%60)}:0`;
          d=duration;
          outline.style.strokeDashoffset = outlineLength;
          s=outlineLength/(d*sec);
          restart.disabled = true;

          duration--;
          i=sec;
          fill=0;
        });
     
  });

videoSelect.forEach(video=>{
    video.addEventListener("click",function(){
        source=this.getAttribute("data-video");
        videoDisplay.setAttribute("src",source);
    
    });
});

songSelect.forEach(songs=>{
    songs.addEventListener("click",function(){
        source=this.getAttribute("data-sound");
        song.setAttribute("src",source); 
    });
});


restart.addEventListener("click",function(){
   
  duration=d-1;
  i=sec;
  outline.style.strokeDashoffset = outlineLength;
  fill=0;
  restart.style.opacity="0.5";
  restart.style.color="#96cccc";
  restart.disabled = true;

  pausevs();
});



    pause.addEventListener("click",pausevs);
    function pausevs(){
        if(duration>=0){if(i>=0){
        play.style.display="block";
        pause.style.display="none";
        videoDisplay.play();
        song.play();
        restart.disabled = true;
        restart.style.opacity="0.5";
        check=true;
        forTime();}
        else{
            alert("please select time");
        }
    }
    }

    play.addEventListener("click",playvs);
    function playvs(){    
    pause.style.display="block";
        play.style.display="none";
        videoDisplay.pause();
        song.pause();
        check=false; 
        restart.disabled = false;
    restart.style.opacity="1";
}
   

function forTime(){
stop=setInterval(function(){
        if(check===true){
            if(i>0){  
            timeShow.innerHTML=`${Math.floor(duration/60)}:${Math.floor(duration%60)}:${i}`;    
            i--;
           
            }
            else if(i===0){
            timeShow.innerHTML=`${Math.floor(duration/60)}:${Math.floor(duration%60)}:${i}`;   
            
            duration--;
            i=sec;
           
            }
            if(duration<0){
                i=sec;
               
                playvs();
               
                clearInterval(stop);
               
            }
            
            
            outline.style.transition = outline.style.WebkitTransition =
            'stroke-dashoffset 2s ease';
            if(outlineLength-fill>=0){
            outline.style.strokeDashoffset = outlineLength-fill;
            fill+=s;}
        }
        
        else{
            clearInterval(stop);
        }
    },1000);

}


