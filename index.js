//alert('BROFIST.IO TRAINER, CODED BY ANON312'); 
//fuck da copyright 
//version 1.huiznaet.7 
//COMMANDS (type in chat) 
//fly - enable\disable fly mode 
//pos - get your position 
//cp <checkpoint_ name> - save checkpoint 
//goto checkpoint_ name> - move to checkpoint 
//tp <name> - teleport to player (didn't works on long range) 
//tpc <x> <y> - teleport to pos 
//speed <number> - change your speed (def. 300) 
//name <new_name> - change your name 
//skin <0-7> - change your skin (min 0, max 7) 
//status <status_string> - change your status 
//END 
if (this.broTrainer && this.broTrainer.removeEvents) broTrainer.removeEvents();
else this.broTrainer = {};

//VARS 
broTrainer.checkPoints = {
    start: [-79, 0],
    end: [1170, -82],
    lift: [345, -14]
}; //default checkpoints 

broTrainer.playerFly = false;
broTrainer.playerSpeed = 300;
broTrainer.playerSkin = parseInt(document.getElementsByClassName("skins")[0].children[1].getAttribute("id"));

broTrainer.magicEnabled = false;
broTrainer.shitEnabled = false; //suka, bl9, za4em!? 

broTrainer.playerStatus = '2CH POWER'; //rofl again 
broTrainer.statusEnabled = false;

//CHECKPOINTS 
broTrainer.addCheckPoint = (name) => {
    let pos = [plyer.position[0], plyer.position[1]];
    console.log('new checkpoint ' + name + ' at pos: ' + pos);
    broTrainer.checkPoints[name] = pos;
}
broTrainer.goToCheckPoint = (name) => {
    if (!broTrainer.checkPoints[name]) return console.log('point ' + name + ' not found');
    plyer.position = broTrainer.getCheckPoint(name);
    console.log('moved to ' + name);
}
broTrainer.getCheckPoint = (name) => {
    //TODO FIX IT 
    return [
        broTrainer.checkPoints[name][0],
        broTrainer.checkPoints[name][1]
    ];
}

//TELEPORT 
broTrainer.goToPlayer = (playerName) => {
    for (i in livePlayers) {
        if (livePlayers && livePlayers.gPlayer) {
            let targetPlayer = livePlayers.gPlayer;
            let targetPlayerName = targetPlayer.nameText._text;
            if (targetPlayerName == playerName) {
                console.log('moved to ' + playerName);
                plyer.position = [targetPlayer.position._x / 100, -targetPlayer.position._y / 100];
            }
        }
    }
}
broTrainer.goToPos = (x, y) => {
    console.log('moved to pos ' + x + ', ' + y);
    plyer.position = [x, y];
}

//FLY 
broTrainer.changePlayerFlyMode = () => {
    broTrainer.playerFly = !broTrainer.playerFly;
}

//SKIN 
broTrainer.changePlayerSkin = (skinId) => {
    broTrainer.playerSkin = skinId;
    graphics.setBio(gPlayer.nameText.text, skinId);
    network.sendMyBio([gPlayer.nameText.text, skinId]);
}

//NAME 
broTrainer.changePlayerName = (newName) => {
    graphics.setBio(newName, broTrainer.playerSkin);
    network.sendMyBio([newName, broTrainer.playerSkin]);
}

//SPEED 
broTrainer.moveWrapped = false;
broTrainer.wrapPlayerMove = () => { //TODO bind context and arrow func 
    plyer.left = function() {
        physics.velocity(plyer, this, -broTrainer.playerSpeed, null);
    };
    plyer.right = function() {
        physics.velocity(plyer, this, broTrainer.playerSpeed, null);
    };
    broTrainer.moveWrapped = true;
}
broTrainer.changePlayerSpeed = (speed) => {
    if (!broTrainer.moveWrapped) broTrainer.wrapPlayerMove();
    broTrainer.playerSpeed = speed;
}

//MAGIC 
broTrainer.doMagic = (timeout) => {
    if (broTrainer.playerSkin < 7)
        broTrainer.changePlayerSkin(broTrainer.playerSkin + 1);
    else
        broTrainer.changePlayerSkin(0);
    if (broTrainer.magicEnabled)
        setTimeout(() => {
            broTrainer.doMagic(timeout);
        }, timeout);
}
broTrainer.startMagic = (timeout) => {
    broTrainer.magicEnabled = true;
    if (timeout && timeout < 500) timeout = 500; //min 
    broTrainer.doMagic(timeout || 1000);
}
broTrainer.stopMagic = () => {
    broTrainer.magicEnabled = false;
}

//SHIT 
broTrainer.makeDaShit = (timeout) => {
    if (!broTrainer.shitEnabled) return;
    plyer.left();
    setTimeout(() => {
        plyer.right();
        setTimeout(() => {
            broTrainer.makeDaShit(timeout);
        }, timeout);
    }, timeout);

}
broTrainer.startShit = (timeout) => {
    broTrainer.shitEnabled = true;
    broTrainer.makeDaShit(timeout || 1000);
}
broTrainer.stopShit = () => {
    broTrainer.shitEnabled = false;
}

//STATUS 
broTrainer.updateStatus = () => {
    if (!broTrainer.statusEnabled) return;
    let timeout = 250;
    broTrainer.sendIntoChat(broTrainer.playerStatus);
    setTimeout(() => {
        network.sendMsg(13); //send into chat and reset string 
        gPlayer.chatText.text = '';
        setTimeout(() => {
            broTrainer.updateStatus();
        }, timeout);
    }, timeout);

}
broTrainer.showPlayerStatus = (status) => {
    broTrainer.playerStatus = status;
    broTrainer.statusEnabled = true;
    broTrainer.updateStatus();
}
broTrainer.hidePlayerStatus = () => {
    broTrainer.statusEnabled = false;
}

//HELPERS 
broTrainer.showPlayerPos = () => {
    //i know, fuck me 
    setTimeout(() => {
        //TODO fix it 
        let x = plyer.position[0].toString().slice(0, 5);
        let y = plyer.position[1].toString().slice(0, 5);
        let posString = x + ',' + y;
        console.log(posString);
        gPlayer.chatText.text = posString;
    }, 1000);
}
broTrainer.sendIntoChat = (text) => {
    for (let i = 0; i <= text.length - 1; i++) {
        gPlayer.chatText.text += text;
        network.sendMsg(text);
    }
}

//EVENTS 
broTrainer.pressEvent = (event) => {
    switch (event.keyCode) {
        case 13:
            {
                let rawCommand = this.gPlayer.chatText._text;
                let command = rawCommand.split(' ')[1];
                let data = rawCommand.replace(command, '').trim();
                switch (command) {
                    case 'cp':
                        {
                            broTrainer.addCheckPoint(data);
                            break;
                        }
                    case 'goto':
                        {
                            broTrainer.goToCheckPoint(data);
                            break;
                        }
                    case 'fly':
                        {
                            broTrainer.changePlayerFlyMode();
                            break;
                        }
                    case 'speed':
                        {
                            broTrainer.changePlayerSpeed(data);
                            break;
                        }
                    case 'tp':
                        {
                            broTrainer.goToPlayer(data);
                            break;
                        }
                    case 'tpc':
                        {
                            let pos = data.split(' ');
                            broTrainer.goToPos(++pos[0], ++pos[1]);
                            break;
                        }
                    case 'pos':
                        {
                            broTrainer.showPlayerPos();
                            break;
                        }
                    case 'skin':
                        {
                            broTrainer.changePlayerSkin(data);
                            break;
                        }
                    case 'name':
                        {
                            broTrainer.changePlayerName(data);
                            break;
                        }
                    case 'magic':
                        {
                            if (data == 'stop')
                                broTrainer.stopMagic();
                            else
                                broTrainer.startMagic(data);
                            break;
                        }
                    case 'shit':
                        {
                            if (data == 'stop')
                                broTrainer.stopShit();
                            else
                                broTrainer.startShit(data);
                            break;
                        }
                    case 'status':
                        {
                            broTrainer.showPlayerStatus(data);
                            break;
                        }
                    default:
                        {
                            if (broTrainer.statusEnabled)
                                broTrainer.hidePlayerStatus();
                            break;
                        }
                }
            }
    }
};
broTrainer.downEvent = (event) => {
    switch (event.keyCode) {
        case 40:
            {
                if (broTrainer.playerFly) plyer.invMass = 1;
                break;
            }
        case 38:
            {
                if (broTrainer.playerFly) plyer.invMass = -1;
                break;
            }
    }
};
broTrainer.upEvent = (event) => {
    switch (event.keyCode) {
        case 40:
            {
                if (broTrainer.playerFly) plyer.invMass = 0;
                else plyer.invMass = 1;
                break;
            }
        case 38:
            {
                if (broTrainer.playerFly) plyer.invMass = 0;
                else plyer.invMass = 1;
                break;
            }
    }
};

broTrainer.addEvents = () => {
    this.addEventListener('keypress', broTrainer.pressEvent);
    this.addEventListener('keydown', broTrainer.downEvent);
    this.addEventListener('keyup', broTrainer.upEvent);
}

broTrainer.removeEvents = () => {
    this.removeEventListener('keypress', broTrainer.pressEvent);
    this.removeEventListener('keydown', broTrainer.downEvent);
    this.removeEventListener('keyup', broTrainer.upEvent);
}

broTrainer.addEvents();