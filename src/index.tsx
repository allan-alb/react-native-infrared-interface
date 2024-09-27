import { NativeModules } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-infrared-interface' doesn't seem to be linked. Make sure: \n\n` +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const InfraredInterface = NativeModules.InfraredInterface
  ? NativeModules.InfraredInterface
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function hasIrEmitter(): Promise<boolean> {
  return InfraredInterface.hasIrEmitter();
}

export function getCarrierFrequencies(): Promise<
  {
    minFrequency: number;
    maxFrequency: number;
  }[]
> {
  return InfraredInterface.getCarrierFrequencies();
}

export function transmit(
  carrierFrequency: number,
  pattern: string
): Promise<string> {
  return InfraredInterface.transmit(carrierFrequency, pattern);
}
