import { FlatList, Image, Text, View } from 'react-native';
import logoImg from '../../../assets/logo-nlw-esports.png';
import { GameCard } from '../../GameCard';
import { Heading } from '../../Heading';
import { styles } from './styles';
import { GAMES } from '../../../utils/games';

export function Home() {
  return (
    <View style={styles.container}>
      <Image
        source={logoImg}
        style={styles.logo} />

      <Heading title='Encontre o seu duo' subtitle='Selecione o game que deseja jogar ...' />

      <FlatList
        data={GAMES}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <GameCard
            data={item}
          />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.contentlist}
      />
    </View>
  );
}