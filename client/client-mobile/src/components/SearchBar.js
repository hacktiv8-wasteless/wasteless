import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, Pressable } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
  return (
    // <View style={styles.container}>
    //   <View style={clicked ? styles.searchBar__clicked : styles.searchBar__unclicked}>
    //     {/* search Icon */}
    //     <Feather name="search" size={20} color="black" style={{ marginLeft: 1 }} />
    //     {/* Input field */}
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Search"
    //       value={searchPhrase}
    //       onChangeText={setSearchPhrase}
    //       onFocus={() => {
    //         // setClicked(true);
    //       }}
    //     />
    //     {/* cross Icon, depending on whether the search bar is clicked or not */}
    //     {clicked && (
    //       <Entypo
    //         name="cross"
    //         size={20}
    //         color="black"
    //         style={{ padding: 1 }}
    //         onPress={() => {
    //           setSearchPhrase("");
    //         }}
    //       />
    //     )}
    //   </View>
    //   {/* cancel button, depending on whether the search bar is clicked or not */}
    //   {clicked && (
    //     <View>
    //       <Button
    //         title="Cancel"
    //         onPress={() => {
    //           Keyboard.dismiss();
    //           //   setClicked(false);
    //         }}
    //       ></Button>
    //     </View>
    //   )}
    // </View>
    <View
      style={{
        flexDirection: "row",
        marginVertical: 1,
        padding: 15,
        borderRadius: 30,
        backgroundColor: "#e3e3e3",
        marginVertical: 10,
      }}
    >
      <Ionicons name="search" size={20} color="gray" />
      <TextInput
        style={{
          paddingHorizontal: 10,
          flex: 1,
        }}
        placeholder="Search Reuseable Materials"
      />
      <Ionicons name="filter" size={20} color="gray" />
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "95%",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});

export default SearchBar;
