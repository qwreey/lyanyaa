import { StyleSheet, Text, View } from 'react-native';
import React,{ Component, type PropsWithChildren } from 'react';

export default class TabButton extends Component {
    constructor(props:PropsWithChildren) {
        super(props)
        this.state = {

        }
    }
    static defaultProps = {}
}


// export default function TabButton({ name, children }:{name:string, children:typeof Children}) {
//   return (
//     <View style={styles.container}>
//       <Text>wow</Text>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
