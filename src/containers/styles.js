import { StyleSheet } from 'react-native-auto-stylesheet';
export const s = StyleSheet.create({
    img: {
        height: 130,
        width: 150,
        borderRadius:20,
        backgroundColor: 'orange'
    },
    Text1: {
        fontSize: 13,
        alignSelf:'center'
    },
    Text2:{
        fontSize: 17,
        fontWeight:'bold',
        padding: 5
    },
    Text3:{
        fontSize: 15, 
        paddingHorizontal: 5
    },
    Text4:{
        fontSize: 10, 
        color:'white',
        backgroundColor:"green", 
        // borderColor:'grey', 
        padding:7, 
        borderRadius: 10
    },
    Text5:{
        fontSize: 10, 
        color:'black',
        borderWidth:1,
        // backgroundColor:"green",
        borderColor:'orange', 
        padding:7, 
        borderRadius: 10
    },
    Text6:{
        fontSize: 17, 
        fontWeight:"bold"
    },
    View1:{
        backgroundColor: 'white',
        padding: 10,
        // paddingVertical: 20
    },
    View2:{
      backgroundColor:"white",
      borderRadius:8,
      flex:1,
      marginHorizontal: 10,
      marginBottom:10,
    },
    View3:{
        backgroundColor:'#E3E3E3',
        alignContent:"center",
        justifyContent:"space-around",
        borderRadius: 40,
        padding: 20,
        borderColor: '#C9C9C9',
        marginHorizontal:10,
        borderWidth: 2
    },
    View4:{
        alignItems:"center",
        backgroundColor:"white",
        marginHorizontal:10,
        marginVertical:10,
        padding:7,
        paddingHorizontal:10,
        borderRadius: 8,
        justifyContent:'space-between',
        flexDirection:"row",
    },
    View5:{
        flex: 1,
        justifyContent:"center" ,
        backgroundColor:'white',
        borderRadius: 30,
        marginVertical: 170,
        padding: 20
    },
    View6:{
        width:10, 
        borderTopLeftRadius: 5, 
        borderBottomLeftRadius: 5
    }
},

);

// export const s = { ...scaledView, ...scaledText };
