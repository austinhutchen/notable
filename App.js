import React, { Component } from "react";
import {
  StyleSheet,
  Linking,
  Text,
  View,
  Button,
  AsyncStorage,
  state,
  setState,
} from "react-native";
import axios from "axios";
import { styles } from "./components/styles";
import { Journal, User } from "./components/user";
import {updateLocal, check} from './components/helpers'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
    };
  }

  setData(res, author) {
    this.setState({
      quote: res,
      author: author,
    });
  }

  // same as on refresh
  componentDidMount = () => {
    this.getNewQuote();
  };

  getNewQuote = async () => {
    let url = "https://api.quotable.io/random";
    axios.get(url).then((res) => {
      const data = res.data.content;
      const author = res.data.author;
      console.log("ONE:" + data + " " + author + "\n");
      this.setData(data, author);
    });
  };

  render() {
    

    const { quote, author } = this.state; //Destructuring
    return (
      <View style={styles.container}>
        <Text style={{ color: "white", padding: 60, fontSize: 30 }}>
          Random Quotes
        </Text>

        <View className={styles.quotebox}>
          <View className={styles.quote}>
            <Text style={{ color: "white", fontSize: 20 }}>{quote}</Text>
          </View>
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <Text style={styles.author}>{author}</Text>
          </View>

          <View style={{ padding: 30, marginTop: "30%" }}>
            <View
              style={{
                backgroundColor: "black",
                width: "30%",
                marginBottom: 10,
              }}
            ></View>
            <Button
              style={{ backgroundColor: "black" }}
              title="New Quote"
              onPress={this.getNewQuote}
            />
            <Button
              title="Tweet"
              style={{ color: "#0ac6f0", padding: 20, fontSize: 16 }}
              onPress={() =>
                Linking.openURL(
                  `https://twitter.com/intent/tweet?text=${quote} ${author}`
                )
              }
            ></Button>
          </View>
        </View>
      </View>
    );
  }
}

export default App;
