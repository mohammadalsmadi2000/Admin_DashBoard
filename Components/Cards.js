import { Button, Card, Icon, Text } from 'react-native-elements';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

import React from 'react';

const users = [
  {
    name: 'Mohammad Smadi',
    avatar: 'https://scontent.famm10-1.fna.fbcdn.net/v/t39.30808-6/251144822_3127669824169473_8409598529014451957_n.jpg?stp=dst-jpg_p206x206&_nc_cat=107&ccb=1-5&_nc_sid=da31f3&_nc_ohc=z7k80rCVqdMAX9coDWI&_nc_ht=scontent.famm10-1.fna&oh=00_AT8FWBC6SVtwHkPUD51CUsagn1gto7EIu3BEKiCZ-wmsvg&oe=625654A3',
  },
  {
    name: 'Yazan Radaideh',
    avatar:
      'https://scontent.famm10-1.fna.fbcdn.net/v/t39.30808-6/221584791_1688069808064921_2963565023693269566_n.jpg?stp=dst-jpg_p206x206&_nc_cat=106&ccb=1-5&_nc_sid=da31f3&_nc_ohc=hHD0bHeVggwAX_A8_P2&_nc_ht=scontent.famm10-1.fna&oh=00_AT9GUKtjfQxaRwQM1NjyJI2wEBGWGq-KCGJ6aomIrXe-aA&oe=62575CEE',
  },
  {
    name: 'Ahmad Eraqi',
    avatar: 'https://scontent.famm10-1.fna.fbcdn.net/v/t1.6435-9/107950519_695256327687172_5678109357544741633_n.jpg?stp=dst-jpg_s206x206&_nc_cat=102&ccb=1-5&_nc_sid=da31f3&_nc_ohc=Wg4P3dz259YAX_MUpmg&tn=gvPalApP009kC0nF&_nc_ht=scontent.famm10-1.fna&oh=00_AT-ibIIvPe8_tJe-T0TI3aQCjAFNcTW9P59h941VuM2uAA&oe=62783C30',
  },
];



const Cards = () => {
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Card  >
            <Card.Title>ADMIN</Card.Title>
            <Card.Divider />
            {users.map((u, i) => {
              return (
                <View key={i} style={styles.user}>
                  <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{ uri: u.avatar }}
                  />
                  <Text style={styles.name}>{u.name}</Text>
                </View>
              );
            })}
          </Card>
         
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#393e42'
  },
  fonts: {
    marginBottom: 8,

  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
    
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default Cards;