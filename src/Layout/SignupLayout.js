import { Box } from 'native-base';
import ShowLogInText from '../MoleculeComponents/ShowLogInText';

const SignupLayout = ({ children, navigation, bottom }) => (
  <Box width='100%' position='relative'>
    {children}
    <Box
      bottom={bottom || '20'}
      left='0'
      right='0'
      alignItems='center'
      position='absolute'
      zIndex={99}
    >
      <ShowLogInText onPress={() => navigation.navigate('Login')} />
    </Box>
  </Box>
);

export default SignupLayout;
