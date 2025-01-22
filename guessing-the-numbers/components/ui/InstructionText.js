import Colors from '../../constants/colors';
import { Text } from 'react-native';

function InstructionText({ children, style }) {
  return (
    <Text
      style={[
        {
          color: Colors.accent500,
          fontSize: 20,
          fontWeight: 'bold',
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export default InstructionText;
