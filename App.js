import React, { Component } from "react";
import { Text, TextInput, View, Button, TouchableHighlight } from "react-native";
import axios from "axios";
import { styles } from "./components/styles";
import { Journal, User } from "./components/user";
import { updateLocal, check, Today } from "./components/helpers";
class App extends Component {
  constructor(props) {
    super(props);
    this.j = new Journal();
    this.u = new User();
    if (check() == false) {
      updateLocal(this.j);
    }
    else{
    old = check();
    this.j=old;
    }
    this.state = {
      quote: "",
      author: "",
      date: "",
      entry:"",
    };
  }

  
  setData(res, author, today,entry) {
    this.setState({
      quote: res,
      author: author,
      date: today,
      entry: entry,
    });
  }

  // same as on refresh
  componentDidMount = () => {
    td = Today();
    this.setData("", "", td);
    this.getNewQuote();
  };


  getNewQuote = async () => {
    let url = "https://api.quotable.io/random";
    axios.get(url).then((res) => {
      const data = res.data.content;
      const author = res.data.author;
      console.log("ONE:" + data + " " + author + "\n");
      this.setData(data, author, td);
    });
  };
onSubmitEdit=()=>{
  (entry) => this.j.add(entry)
}
  render() {
    const { quote, author, date } = this.state; //Destructuring
    return (
      <View style={styles.container}>
        <Text
          style={{
            color: "khaki",
            paddingTop: 80,
            paddingBottom: 30,
            fontSize: 25,
            alignSelf: "center",
          }}
        >
          Quote of the day!
        </Text>

        <View className={styles.quotebox}>
          <Text style={styles.date}>{date}</Text>
          <View>
            <View style={{ alignSelf: "center", padding: 12 }}>
              <Text style={styles.quote}>{quote}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Text style={styles.author}>- {author}</Text>

          <View style={{ padding: 30, marginTop: "30%" }}>
            <TextInput
              style={styles.Input}
              placeholder="How is your day going?"
              onSubmitEditing={this.onSubmitEdit}
            ></TextInput>
              <TouchableHighlight onPress={this.onSubmitEdit}>
              <Text>Press this button to submit editing</Text>
              </TouchableHighlight>
            <View
              style={{
                backgroundColor: "black",
                width: "30%",
                marginBottom: 10,
              }}
            ></View>

            <Button
              style={styles.refresh}
              title="Refresh Quote"
              onPress={this.getNewQuote}
            />
            <Button
              style={styles.history}
              title="History"
              onPress={() => {
                this.j.display();
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default App;
