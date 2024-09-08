
export function getRarity(rare){
    let rarity = ''
    if(rare === 1){
        rarity = 'S'
    } else if(rare === 2){
        rarity = 'A'
    } else if(rare === 3){
        rarity = 'B'
    } else if(rare === 4){
        rarity = 'C'
    } else if(rare === 5){
        rarity = 'D'
    }

    return rarity
}

export function getType(cardType){
    let type = ''
    if (cardType === 1){
        type = "mage"
    }
    else if(cardType === 2){
        type = "assassin"
    }
    else if(cardType === 3){
        type = "fighter"
    }
    else if(cardType === 4){
        type = "tank"
    }
    else{
        type = 'No type'
    }
    return type
}
