import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  hasIrEmitter,
  getCarrierFrequencies,
  transmit,
} from 'react-native-infrared-interface';

const turnOnMagcubicProjector =
  '9121 4465 626 486 645 496 622 515 650 467 647 492 650 488 622 492 652 491 616 1640 645 1635 651 1629 599 1634 646 1634 622 1638 620 1638 644 1634 621 497 615 523 618 1640 641 497 645 1610 645 491 623 517 620 493 618 1663 625 1634 663 508 612 1631 598 516 630 1627 622 1658 621 1636 623 40199 9085 2196 610';

export default function App() {
  const [feedbackText, setFeedbackText] = useState<string>('');

  const checkHasIr = async () => {
    const hasIr = await hasIrEmitter();

    console.log('hasIr: ', hasIr);
    setFeedbackText(`Has IR transmitter: ${hasIr}`);
  };

  const checkCarrierFrequencies = async () => {
    const carrierFrequencies = await getCarrierFrequencies();

    console.log('carrierFrequencies: ', carrierFrequencies);
    setFeedbackText(
      `Available carrier frequencies: \n\n${JSON.stringify(carrierFrequencies)}`
    );
  };

  const transmitData = async () => {
    try {
      const transmitResult = await transmit(38000, turnOnMagcubicProjector);

      console.log('transmitResult', transmitResult);
      setFeedbackText(`${transmitResult}`);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.feedbackText}>{feedbackText}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={checkHasIr}>
        <Text>Check has IR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={checkCarrierFrequencies}>
        <Text>Check carrier frequencies</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={transmitData}>
        <Text>Transmit command</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  infoContainer: {
    backgroundColor: '#333',
    width: '60%',
    minHeight: 100,
    borderRadius: 8,
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackText: {
    color: '#4AF626',
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#333',
    borderRadius: 8,
    marginVertical: 4,
  },
});
