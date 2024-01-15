import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

type CustomNavigationProps = StackNavigationProp<RootStackParamList>;

const useCustomNav = () => {
  const navigation = useNavigation<CustomNavigationProps>();

  const goTo = (to: keyof RootStackParamList) => navigation.navigate(to);

  return { goTo };
};

export default useCustomNav;