// import React, { Component } from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default class ReadScreen extends Component {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.text}>Read Story</Text>
//             </View>
//         )
//     }
// }
// const styles=StyleSheet.create({
//     container:{
//         flex:1,
//         justifyContent:'center',
//         alignItems:'center'
//     },
//     text:{
//         backgroundColor:'blue',
//         fontSize:30,
//         width:200,
//         textAlign:'center'
//     }
// })
import React, { Component } from "react";
import { ScrollView, Text, View, FlatList, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import firebase from 'firebase/app'
import db from '../config.js'

export default class ReadScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allStories: [],
            lastVisibleTransaction: null,
            search: ''
        }
    }
    fetchMoreStory = async () => {
        var text = this.state.search
        var enteredText = text.split("")
        console.log(enteredText)
        if (enteredText.length > 0) {
            if (enteredText && enteredText[0].toUpperCase() === 'B') {
                const query = await db.collection("stories").where('title', '==', text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
                query.docs.map((doc) => {
                    this.setState({
                        allStories: [...this.state.allStories, doc.data()],
                        lastVisibleTransaction: doc
                    })
                })
            }

        }
    }

    componentDidMount = async () => {
        const query = await db.collection('stories').get()
        query.docs.map((doc) => {
            this.setState({
                allStories: [...this.state.allStories, doc.data()],
                lastVisibleTransaction: doc
            })
        })
    }
    searchStory = async (text) => {
        var enteredText = text.split('')
        var text = text.toUpperCase()
        const transaction = await db.collection('stories').where('title', '==', text).get()
        console.log(this.state.allStories)
        transaction.docs.map((doc) => {
            this.setState({
                allStories: [...this.state.allStories, doc.data()],
                lastVisibleTransaction: doc
            })
        })


    }
    render() {
        return (

            <View style={styles.container}>
                <View style={styles.searchBar}>
                    <TextInput style={styles.bar} placeholder="enter title" onChangeText={(text) => {
                        this.setState({
                            search: text
                        })
                    }}></TextInput>
                    <TouchableOpacity style={styles.searchButton} onPress={() => {
                        this.searchStory(this.state.search)
                    }}><Text>Search</Text></TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.allStories}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{"title: " + item.title}</Text>
                            <Text>{"Author: " + item.author}</Text>
                            <Text>{"Story: " + item.story}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={this.fetchMoreStory}
                    onEndReachedThreshold={0.7}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:
        { flex: 1, marginTop: 20 },
    searchBar: {
        flexDirection: 'row',
        height: 40,
        width: 'auto',
        borderWidth: 0.5,
        alignItems: 'center',
        backgroundColor: 'grey',
    },
    bar: {
        borderWidth: 2,
        height: 30,
        width: 300,
        paddingLeft: 10,
    },
    searchButton: {
        borderWidth: 1,
        height: 30,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green'
    }
})