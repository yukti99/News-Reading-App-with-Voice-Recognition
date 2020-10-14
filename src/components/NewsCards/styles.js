import { makeStyles } from '@material-ui/core/styles';

// this creates a hook that can me called in NewsCards.js
export default makeStyles({    
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '45vh',
        padding: '5%',
        borderTopLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderColor:'black',
        borderStyle:'solid',
        borderWidth:10,   
        fontFamily:"Comic Sans MS",
        

    },
    container: {
        padding: '0 5%',
        width: '100%',
        margin: 0,

    },
    /* for the example information */
    infoCard: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        color:'//#region ',

    },


});



