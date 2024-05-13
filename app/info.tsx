import { StyleSheet, Image } from 'react-native';
import { View, Text } from '@/components/Themed';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { A } from '@expo/html-elements';

export default function Info(): JSX.Element {
  const isPresented = router.canGoBack();
  const cross = require('../assets/images/favicon.png')
  return (
      <View style={styles.container}>
          <View style={{flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between', alignContent: 'center', width: '100%', paddingHorizontal: 15}}>
              <View>
                  <Text style={styles.title}>About MyBreviary</Text>
              </View>
          </View>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <View style={styles.body}>
              <Text style={styles.text}>
                I'm a proud Lutheran and I love Jesus. I've spent a long time looking for a daily office that I liked, 
                and finally found one. But after working through 
                <A href="https://www.alpb.org/product/for-all-the-saints-a-prayer-book-for-and-by-the-church/"> For All The Saints </A> 
                from the American Lutheran Publishing Board as a devotional for a few years, I found myself wanting to make a few changes. 
                For starters, I wanted to make it easier to have lessons in every liturgy, and the four daily lessons with opening and closing 
                prayers is really best suited for once per day lessons. Additionally, I wanted a reading system that went through the entire 
                Bible in a year and didn't skip over the weirder or more boring parts, and I wanted a monthly Psalter that could flex and 
                accomidate February just as well as it could May. I didn't want to read Psalm 95 every morning in Matins, then immediately read it again 
                as part of the monthly Psalm reading. In reality, what I was realizing was that as wonderful as this printed book is, there's some inflexibility 
                to it, as every new option requires more and more pages. And as good as it was, For All The Saints was already 4 full volumes, 
                each one over a thousand pages. Really, it was time to make something digital.
              </Text>
              <Text style={styles.text}>
                So what you see here is basically a digital approximation of only the daily prayers in For All The Saints. All the writings of saints 
                and influential pastors of the past are removed, as are all the prayers in the lessons and psalms. This is just the liturgical parts. 
              </Text>
              <Text style={styles.text}>
                There are a few changes added too. I shored up some of the wording to make it more consistent between the different services, found a few 
                places where an Allelulia would sneak in during Lent and cleaned that up, put the "be" back in the Glory Be, and put ridiculous Latin titles 
                over the various sections because I like them. There are some fundamental changes to the readings though that are worth going over.
              </Text>
              <Text style={styles.text}>
                <Text style={{fontWeight: 'bold'}}>Matins: </Text>Read through the Bible in a year. The Old Testament is ordered according to the Tanakh, and the New Testament is roughly in order of 
                something akin to "gospel/epistle corrolation" and for the Pauline epistles, written order. It's basically Mark, Peters, and Jude
                followed by Matthew, James, and Hebrews, then Luke, Acts, and Paul according to written order, then the Johanine works.
              </Text>
              <Text style={styles.text}>
                <Text style={{fontWeight: 'bold'}}>Midday: </Text>This lesson goes the book of Job every month. Why Job? Because I was already reading Psalms and Proverbs every month, and Job was the last of 
                the Hebrew Poetry books left and it seemed a shame to leave it behind. We also alternate between the Nicene and Apostles Creeds every day.
              </Text>
              <Text style={styles.text}>                
                <Text style={{fontWeight: 'bold'}}>Vespers: </Text>Vespers goes through a chapter or two of Proverbs every day. I've found it's not a bad way to reflect on your day. You could do far worse at any rate.
              </Text>
              <Text style={styles.text}>
                <Text style={{fontWeight: 'bold'}}>Compline: </Text>This service is best kept as short as possible. It uses the historical short lessons, with one or two extra so you get a new lesson every 
                day of the week. The same is true for the prayers listed in that section. I added enough other historical short prayers to have a different one every day. 
                Finally, Psalm 4 is read every day because that service just needs a Psalm!
              </Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingHorizontal: 40}}>
            <Image style={styles.image} source={cross} resizeMode='contain'/>
            <Text style={{fontStyle: 'italic', paddingBottom: 5}}>Your <Text style={{fontWeight: 'bold'}}>word</Text> is a lamp to my feet and a light to my path. (Ps 119:104)</Text>
            <Text style={{fontStyle: 'italic', paddingBottom: 5}}>For we walk by <Text style={{fontWeight: 'bold'}}>faith</Text>, not by sight. (2 Cor 5:7)</Text>
            <Text style={{fontStyle: 'italic', paddingBottom: 5}}>For sin will have no dominion over you, since you are not under law but under <Text style={{fontWeight: 'bold'}}>grace</Text>. (Rom 6:14)</Text>
          </View>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <View style={styles.footer}>
          <Link href="../" style={{...styles.title, paddingBottom: 25}}>&lt; Back</Link>
          <StatusBar style="light" />
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
      padding: 10,
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
  },
  body: {
      paddingHorizontal: 15,
  },
  title: {
      fontSize: 24,
      fontWeight: 'normal',
      paddingTop: 0,
  },
  separator: {
      marginVertical: 20,
      height: 1,
      width: '100%',
  },
  footer: {
      flex: 1,
      flexWrap: 'wrap',
      width: '100%',
      paddingHorizontal: 40,
      flexDirection: "row",
      justifyContent: 'space-between',
  },
  textContainer: {
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
  },
  textHeader: {
      flex: .035
  },
  text: {
      flex: 1, 
      flexDirection: 'row',
      flexWrap: 'wrap',
      fontStyle: 'normal', 
      fontWeight: 'normal',
      paddingBottom: 10,
      marginHorizontal: 40
  },
  image: {
    flex: 1,
    height: 400,
    width: 400,
    /*backgroundColor: '#0553',*/
  },
});