import { Moon, Sun } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { TouchableOpacity } from 'react-native';

import { Icon } from './ui/icon';

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isDark = colorScheme === 'dark';

  return (
    <TouchableOpacity className="h-11 w-11 items-center justify-center" onPress={toggleColorScheme}>
      {isDark ? (
        <Icon as={Sun} size={24} strokeWidth={3} className="text-white" />
      ) : (
        <Icon as={Moon} size={24} strokeWidth={3} className="text-white" />
      )}
    </TouchableOpacity>
  );
}
