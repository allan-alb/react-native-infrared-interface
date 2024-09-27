# react-native-infrared-interface

A React Native interface for using Infrared (IR) transmitter in Android devices

## Installation

```sh
npm install react-native-infrared-interface
```

## Usage

#### `hasIrEmitter()`: Check whether the device has an infrared emitter

```js
import { hasIrEmitter } from 'react-native-infrared-interface';

// ...

const hasIr = await hasIrEmitter();

// returns a boolean value
// may also return null
```

---

#### `getCarrierFrequencies()`: Query the infrared transmitter's supported carrier frequencies

```js
import { getCarrierFrequencies } from 'react-native-infrared-interface';

// ...

const carrierFrequencies = await getCarrierFrequencies();

// return value will be an array of objects
// containing the minFrequency and maxFrequency of each frequency (in Hertz)
```

---

#### `transmit(carrierFrequency, pattern)`: Transmit an infrared pattern

- `carrierFrequency`: The IR carrier frequency in Hertz.
- `pattern`: The pattern to transmit.

```js
import { transmit } from 'react-native-infrared-interface';

// ...

const deviceCommand = '7723 6933 882 186 345 987 162 876 110 188 648';

// ...

const transmitResult = await transmit(38000, deviceCommand);

// returns "Transmission completed" string when successfully executed
```

### Example app

This library's repository also includes an [example app](/example/) that demonstrates usage of the library. You need to run it to test any changes you make.

---

#### Not available for iOS

<small>This library doesn't have any implementations for iOS as Apple devices do not have IR blasters.</small>

---

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Inspired by [danielr18](https://github.com/danielr18)'s [react-native-ir-manager](https://github.com/danielr18/react-native-ir-manager).
Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
