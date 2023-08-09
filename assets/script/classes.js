// Knitgh or Sorcerer
// LittleMonster or BigMonster
class Charater {

    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name) {
        this.name = name
    }

    get life() {
        return this._life;
    }

    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife
    }
}

class Hero extends Charater {
    constructor() {
        super('HERO');
        this.life = 1000;
        this.attack = 200;
        this.defense = 200;
        this.maxLife = this.life;
    }
}

class Knitgh extends Charater {
    constructor() {
        super('GUERREIRO');
        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxLife = this.life;
    }
}

class Sorcerer extends Charater {
    constructor() {
        super('MAGO');
        this.life = 80;
        this.attack = 17;
        this.defense = 3;
        this.maxLife = this.life;
    }
}

class LittleMonster extends Charater {
    constructor() {
        super('ZOMBIE');
        this.life = 50;
        this.attack = 4;
        this.defense = 4;
        this.maxLife = this.life;
    }
}

class BigMonster extends Charater {
    constructor() {
        super('BIG ZOMBIE');
        this.life = 120;
        this.attack = 20;
        this.defense = 5;
        this.maxLife = this.life;
    }
}


class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
    }

    start() {
        this.update();
        
        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }

    update() {
        // Fighter 1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`; 
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`

        // Fighter 2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`
    }

    doAttack(attacking, attacked) {
        if (attacking.life <= 0 || attacked.life <= 0) {
            this.log.addMessage('Oponente está morto!!');
            return;
        }

        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);

        let actuaAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor
        console.log(actuaAttack)

        if (actuaAttack > actualDefense) {
            attacked.life -= actuaAttack;
            this.log.addMessage(`${attacking.name} causou ${actuaAttack.toFixed(2)} de dano em ${attacked.name}`)
        } else {
            this.log.addMessage(`${attacked.name} conseguiu defender!`);
        }
        
        this.update()
    }
}

class Log {
    list = [];

    constructor(listEl) {
        this.listEl = listEl;
    }

    addMessage(msg) {
        this.list.push(msg);
        this.render();
    }
    render() {
        this.listEl.innerHTML = '';
        
        for (let i in this.list) {
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}