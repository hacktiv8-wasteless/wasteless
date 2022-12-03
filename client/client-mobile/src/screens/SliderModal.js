import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { Button, FormControl, Modal, Input, ScrollView, Center, VStack, Slide, Box } from "native-base";

const { width, height } = Dimensions.get("screen");

export default function SliderModal({ setModalVisible, modalVisible }) {
  return (
    <Modal isOpen={modalVisible} onClose={setModalVisible} size="full" safeAreaTop={true}>
      <Modal.Content height={height * 0.8} style={{ marginBottom: 0, marginTop: "auto" }}>
        <Modal.CloseButton />
        <Modal.Header>Return Policy</Modal.Header>
        <Modal.Body>
          <ScrollView>
            <Text>Create a 'Return Request' under “My Orders” section of App/Website. Follow the screens that come up after tapping on the 'Return’ button. Please make a note of the Return ID that we generate at the end of the process. Keep the item ready for pick up or ship it to us basis on the return mode.</Text>
          </ScrollView>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setModalVisible(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={() => {
                setModalVisible(false);
              }}
            >
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

const styles = StyleSheet.create({});
