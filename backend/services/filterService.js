const filterBadWords = async (text) => {
    const { Filter } = await import('bad-words');
    const filter = new Filter();

    // Add additional bad words from the user's list
    const additionalBadWords = [
        'arse', 'arsehead', 'arsehole', 'ass', 'ass hole', 'asshole',
        'bastard', 'bitch', 'bloody', 'bollocks', 'brotherfucker', 'bugger', 'bullshit',
        'child-fucker', 'Christ on a bike', 'Christ on a cracker', 'cock', 'cocksucker', 'crap', 'cunt',
        'dammit', 'damn', 'damned', 'damn it', 'dick', 'dick-head', 'dickhead', 'dumb ass', 'dumb-ass', 'dumbass', 'dyke',
        'fag', 'faggot', 'father-fucker', 'fatherfucker', 'fuck', 'fucked', 'fucker', 'fucking',
        'god dammit', 'goddammit', 'God damn', 'god damn', 'goddamn', 'Goddamn', 'goddamned', 'goddamnit', 'godsdamn',
        'hell', 'holy shit', 'horseshit',
        'in shit',
        'jackarse', 'jack-ass', 'jackass', 'Jesus Christ', 'Jesus fuck', 'Jesus Harold Christ', 'Jesus H. Christ', 'Jesus, Mary and Joseph', 'Jesus wept',
        'kike',
        'mental', 'mother fucker', 'mother-fucker', 'motherfucker',
        'nigga', 'nigra',
        'pigfucker', 'piss', 'prick', 'pussy',
        'shit', 'shit ass', 'shite', 'sibling fucker', 'sisterfuck', 'sisterfuck', 'sisterfucker', 'slut', 'son of a bitch', 'son of a whore', 'spastic', 'sweet Jesus',
        'tranny', 'twat',
        'wanker', 'putangina','pekpek','pepe','tite','kupal','tarantado','tanga','inutil','bobo','gago','pokpok','puta','tangina'
    ];

    filter.addWords(...additionalBadWords);

    return filter.clean(text);
};

module.exports = { filterBadWords };