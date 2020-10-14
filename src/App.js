import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
// to add Alan AI  to our application
import alanBtn from '@alan-ai/alan-sdk-web';
// import NewsCards from components folder
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './style.js';


// GET YOUR ALAN KEY TO USE THIS AMAZING VOICE ASSISTANT FROM alan.app.com
const alanKey = '';

const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const classes = useStyles();
    const [activeArticle,setActiveArticle] = useState(-1);

    useEffect(()=>{
        // provide the key that allows us to use Alan
        alanBtn({
            key:alanKey,
            onCommand: ({command,articles,number}) => {
                if (command === 'newHeadlines'){
                    console.log(articles);
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }else if (command === 'highlight'){
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                }else if (command==='open'){
                    console.log(number);
                    // in case the bots ends up understanding 4 as four or 2 as two
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];

                    if (parsedNumber > articles.length) {
                        alanBtn().playText('Please try that again...');
                    } else if (article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Sure! Opening...');
                    } else {
                        alanBtn().playText('Please try that again...');
                    }
                }

            }
        })
    },[])
    return (
        <div>
            <div className={classes.imgContainer}>
                <img src={require('./images/color_news.png')} className={classes.topImg} alt="NEWS"/>
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    );
}
export default App;
