import { config } from "../../../core/config"
import AsyncStorage from "@react-native-community/async-storage";
import IEmoji from "../../../interfaces/IEmoji";

export const getEmojisAction = () => {
  fetch(`${config.baseUrl}/emoji`)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((emoji: IEmoji[]) => {
      console.log(emoji);
      AsyncStorage.setItem('@emoji', JSON.stringify(emoji));
    });
}