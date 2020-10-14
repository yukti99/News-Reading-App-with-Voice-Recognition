import React from 'react';
// for better user-interface design for both mobile and web, also provided animation and good text styles
import { Grid, Grow, Typography } from '@material-ui/core'; // a popular react ui framework
import useStyles from './styles.js';
import NewsCard from './NewsCard/NewsCard';

const infoCards = [
    { color: '#FF6347', title: 'Top News',info:'To get updated with the latest news and articles, simple try saying the above!', text: 'Give me the latest news' ,example:'Hey!'},
    { color: '#00bfff', title: 'News by Categories', info: 'Some categories can be Entertainment, Health, Science, Business, General, Sports, Technology and many more...', text: 'Give me the latest Science news' },
    { color: '#e6005c', title: 'News on a Topic', info: 'Some terms can be Apple, Coronavirus, Smartphones, Donald Trump, bitcoin...', text: 'What\'s up with Coronavirus' },
    { color: '#70db70', title: 'News through Sources', info: 'Some sources include CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me the news from CNN' },
];

const NewsCards = ({articles,activeArticle}) =>{
    const classes = useStyles();
    if (!articles.length){
        return(
            <Grow in>
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {infoCards.map((infoCard)=>(
                        <Grid item xs={12} sm={6} md={4} lg={3} className={classes.infoCard}>
                            <div className={classes.card} style={{ borderColor: infoCard.color, backgroundColor:'#F8F8FF'}}>
                                <Typography variant="h5" style={{ fontFamily: 'cursive', fontWeight: 'bold'}}>{infoCard.title}</Typography>
                                <Typography variant="h6" style={{ color: infoCard.color }}>SAY: <br /> <i style={{ fontWeight: 'bold', fontFamily: 'cursive' }}>{infoCard.text}</i></Typography>
                                {infoCard.info 
                                    ? (<Typography variant="h6" style={{ fontFamily: 'sans-serif' }}>
                                       
                                            {infoCard.info}
                                    </Typography>):null}
                                
                            </div>
                        </Grid>

                    ))}
                </Grid>
            </Grow>
        );
    }

    return (
        <Grow in>
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {articles.map((article, i) => (
                    // spacing in grid is 12, to accomodate different sized of the screen 
                    <Grid item xs={12} sm={6} md={4} lg={3} style={{display:'flex'}}>
                        <NewsCard article={article} activeArticle={activeArticle} i={i} />
                    </Grid>                    
                ))}
            </Grid>         
        </Grow>
    );
}

export default NewsCards;
