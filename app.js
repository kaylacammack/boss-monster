let claimedReward = 0;

let heroes = [
    {
        name: 'Slate Slabrock',
        type: 'dwarf',
        damage: 5,
        health: 100,
        healthCost: 100,
        level: 1 
    },
    {
        name: 'Flint Ironstag',
        type: 'elf',
        damage: 10,
        health: 50,
        healthCost: 50,
        level: 1
    }
]

let boss = {
    health: 100,
    maxHealth: 100,
    damage: 5,
    level: 1,
    reward: 50
}

function attackBoss() {
    let totalDamage = 0;
    heroes.forEach(hero => {
        totalDamage += hero.damage;
    });
    
    totalHealth = updateBossHealth(totalDamage)
    if (totalHealth === 0) {
        raiseBossLevel();
    }

    document.getElementById('boss-health').innerText = totalHealth;
}

function updateBossHealth(damage) {
    let health = boss.health -= damage;
    if (health >= 0) {
        return health;
    } else {
        return 0;
    }
}

function updateHeroHealth(){
    let dwarfHealth = heroes.find(hero => hero.type === 'dwarf').health;
    let elfHealth = heroes.find(hero => hero.type === 'elf').health;
    let elfText = document.getElementById('elf-health');
    let dwarfText = document.getElementById('dwarf-health');

    elfHealth < 0 ? elfText.innerText = 0 : elfText.innerText = elfHealth; 

    dwarfHealth < 0 ? dwarfText.innerText = 0 : dwarfText.innerText = dwarfHealth;

}

function raiseBossLevel() {
    boss.level ++;
    boss.health = boss.maxHealth * boss.level;
    boss.reward = boss.reward * boss.level;
    heroes[0].health = 100;
    heroes[1].health = 50;
    claimReward()
    updateHeroHealth();
}

function attackHeroes() {
    heroes.forEach(hero => {
        hero.health -= boss.damage * boss.level;
    })
    updateHeroHealth();
}

function claimReward() {
    claimedReward += boss.reward;
    document.getElementById('boss-reward').innerText = claimedReward; 
}

function buyHealth(heroName) {
    let hero = heroes.find(hero => hero.name === heroName);
    if (claimedReward >= hero.healthCost) {
        claimedReward -= hero.healthCost;
        hero.health = hero.healthCost;
        document.getElementById('boss-reward').innerText = claimedReward; 
    }
    updateHeroHealth();
}

setInterval(attackHeroes, 5000);