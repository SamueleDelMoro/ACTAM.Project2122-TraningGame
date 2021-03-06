const obstaclesArray = [];

class Obstacle{
    // Constructor
    constructor(note, duration, charNote){
        this.note = note;
        this.duration = duration;
        this.stack = stack;
        this.top = canvas.height-((notesHeight*this.note)+ notesHeight + this.stack);
        this.bottom = (notesHeight*this.note) - this.stack;
        this.x = canvas.width;
        this.width = 60*duration;
        this.color = 'darkgray';
        this.counted = false;
        this.endGame = false;
        this.collision = false;
        this.speed = velocity;
        this.charNote = charNote; 
    }

    // Draw the obstacle
    draw(c){
        if(this.note == -1){
            // Note doesn't not identified
            this.top = 20;
            this.bottom = 20;
            this.color = 'hsla('+ frame + ',100%, 50%, 1)';
        }
        else if(this.note== -2){
            // Pause
            this.top = 0;
            this.bottom = 0;
            this.color = 'hsla('+ frame + ',100%, 50%, 1)';
        }
        else if(this.collision == true){
            c.fillStyle = 'red';
            c.fillRect(this.x, 0, this.width, this.top);
            c.fillRect(this.x,canvas.height - this.bottom, this.width, this.bottom);    
        }else{
            if (this.note == 11){
                c.drawImage(tower, this.x, 0, this.width, this.top);
                c.drawImage(tower, this.x, canvas.height - this.bottom, this.width, this.bottom);
            } else if(this.width<=60){
                c.drawImage(laser, this.x, 0, this.width, this.top);
                c.drawImage(laser, this.x, canvas.height - this.bottom, this.width, this.bottom);
            }else if(this.note == 0 ){
                c.drawImage(grafite, this.x, 0, this.width, this.top);
                c.drawImage(grafite, this.x, canvas.height - this.bottom, this.width, this.bottom);
            }else{
                c.fillStyle = this.color;
                c.fillRect(this.x, 0, this.width, this.top);
                c.fillRect(this.x,canvas.height - this.bottom, this.width, this.bottom); 
            }
            /* Draw the notes */
            c.lineWidth = 3;
            // Notes taken
            if(player.x >= this.x-5 && !player.collision)c.strokeStyle = 'lightgreen';
            // Notes not available
            else if (player.collision && player.collision) c.strokeStyle = 'red';
            // Notes to take
            else c.strokeStyle = background.colorText;

            //If there are note with # ore b
            if(this.note == 1 || this.note == 3 ||this.note == 6 ||this.note == 8 ||this.note == 10){
                c.font = "40px Georgia";
                c.strokeText(this.charNote, this.x, this.top + 75);   
            }else{
                c.font = "50px Georgia";
                c.strokeText(this.charNote, this.x, this.top + 75);
                
            }
        }
    }

    // Update of the obstacle
    update(v){
        this.speed = v;
        this.x -= this.speed;
            if(!this.counted && (this.x+this.width) < 1 && this.note != -1){
                indexCurrentPlayerNote++;
                this.counted = true;
                obstaclesArray.pop(obstaclesArray[0]);
                if(obstaclesArray.length == 0) endOfTheGame = true;
            }
        this.draw(ctx);
    }
}

/* Functions */

// Function for identify the notes undefined
function undefinedNote(n){
    if (n.innerText == 'undefined'){
        n.innerText = '';
    }
    return n;
}

// Function for create the obstacles and update their positions
function handleObstacles(currentNote, currentDur, melodyLength){
    
    // Creation of the obstacle
    if( (indexObstacleMelody == 0 && indexObstacleMelody < melodyLength)    ||
        (indexObstacleMelody < melodyLength && (obstaclesArray[0].x + obstaclesArray[0].width + distance <= canvas.width) )
        ){
            obstaclesArray.unshift(new Obstacle(currentNote,currentDur,theMelody.stringNote[charNoteObstacles]));
            charNoteObstacles++;
            indexObstacleMelody++;           
    }
    
    // Update of the obstacles
        for(let i=0; i < obstaclesArray.length; i++){
            obstaclesArray[i].update(velocity);
        }

    // Delete the obstalces
    if(obstaclesArray.length > 30){
       obstaclesArray.pop(obstaclesArray[0]);
    }
}