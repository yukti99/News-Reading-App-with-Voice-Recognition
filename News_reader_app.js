intent('What does this app do?','What can I do here?',reply('This is a News Reading App.'));


/* REGISTER WITH newsapi.org TO GET NEWS API KEY */
const API_KEY = '';
let savedArticles = [];

// News by Source
intent('Give me the news from $(source* (.*))', (p) => {
    // retrieve the value from the actual source by what users asks
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
    
    if(p.source.value) {
        // to convert it  into a proper url format
        NEWS_API_URL = `${NEWS_API_URL}&sources=${p.source.value.toLowerCase().split(" ").join('-')}`
    }
    
 
    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);
        
        if(!articles.length) {
            p.play('Sorry, please try searching for news from a different source');
            return;
        }
        // save the articles in a global variable
        savedArticles = articles;        
        p.play({ command: 'newHeadlines', articles });
        // | is used to bring unique wordsfor Alan to use to not sound redundant while serving a user
        // using this format Alan, is going to sometimes say latest and other times recent 
        p.play(`Here are the (latest|recent) ${p.source.value}.`);
        p.play('Would you like me to read the news headlines?');
        p.then(confirmation);
        
    });
    
})


 
// News by specific search topic
intent('What\'s up with $(topic* (.*))', (p) => {
    // retrieve the value from the actual source by what users asks
    let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;
    
    if(p.topic.value){
        // to convert it  into a proper url format
        NEWS_API_URL = `${NEWS_API_URL}&q=${p.topic.value}`
    }    
    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);
        
        if(!articles.length) {
            p.play('Sorry, please try searching the news for a different topic');
            return;
        }
        // save the articles in a global variable
        savedArticles = articles;        
        p.play({ command: 'newHeadlines', articles });
        // | is used to bring unique wordsfor Alan to use to not sound redundant while serving a user
        // using this format Alan, is going to sometimes say latest and other times recent 
        p.play(`Here are the (latest|recent) articles on ${p.topic.value}.`);
        p.play('Would you like me to read the news headlines?');
        p.then(confirmation);
        
    });
   
})


// News by a particular category
const CATEGORIES = [ 'entertainment', 'health', 'science','business', 'general','sports', 'technology'];
const CATEGORIES_INTENT = `${CATEGORIES.map((category) => `${category}~${category}`).join('|')}|`;

intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(category~ ${CATEGORIES_INTENT})`,
       `(read|show|get|bring me|give me) (the|) (recent|latest) $(category~ ${CATEGORIES_INTENT}) $(N news|headlines)`, (p) => {
    // retrieve the value from the actual source by what users asks
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=in`;
    
    if(p.category.value){
        // to convert it  into a proper url format
        NEWS_API_URL = `${NEWS_API_URL}&category=${p.category.value}`
    }    
    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);
        
        if(!articles.length) {
            p.play('Sorry, please try searching the news for a different category');
            return;
        }
        // save the articles in a global variable
        savedArticles = articles;        
        p.play({ command: 'newHeadlines', articles });
        // | is used to bring unique wordsfor Alan to use to not sound redundant while serving a user
        // using this format Alan, is going to sometimes say latest and other times recent 
        if(p.category.value) {
            p.play(`Here are the (latest|recent) articles on ${p.category.value}.`);        
        } else {
            p.play(`Here are the (latest|recent) news`);   
        }
        
        p.play('Would you like me to read the news headlines?');
        p.then(confirmation);
        
    });   
});

const confirmation = context(() => {
   
    intent('(yes|ya|sure|please do|I would love you to|please read|that will be great|that will do)', async (p) => {
         p.play('here we go then!');
        for(let i = 0; i < savedArticles.length; i++){
            // for reading the article
            p.play({ command: 'highlight', article: savedArticles[i]});
            p.play(`${savedArticles[i].title}`);
        }
    })
    
    intent('(no|not needed|not required)', (p) => {
        p.play('Sure, Have a nice day.')
    })
})
// to open an article
intent('open (the|) (article|) (number|) $(number* (.*))', (p) => {
    if(p.number.value) {
        p.play({ command:'open', number: p.number.value, articles: savedArticles})
    }
})

intent('(go|take me|) back','exit','main menu','home page','close this', (p) => {
    p.play('Sure, going back');
    p.play({ command: 'newHeadlines', articles: []})
})
