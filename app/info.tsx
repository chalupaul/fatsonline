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
                and finally found 
                <A href="https://www.alpb.org/product/for-all-the-saints-a-prayer-book-for-and-by-the-church/"> For All The Saints </A> 
                from the American Lutheran Publishing Board. After working through it in its entirity, I found myself wanting to make a few changes. 
              </Text>
              <Text style={styles.text}>
                For starters, I wanted to make it easier to have lessons in every liturgy. The four daily lessons in the book have only one set of opening and closing prayers, 
                meaning it looks like it was meant to be read only once. Additionally, I wanted a reading system that went through the entire 
                Bible in a year and didn't skip over the weird or boring parts. I wanted a monthly Psalter that could flex and 
                accomidate February just as well as it could May, and also was aware of the daily readings. In other words, I didn't want to read Psalm 95 every morning in Matins, 
                then immediately read it again as part of the monthly Psalm reading. 
              </Text>
              <Text style={styles.text}>
                Also, I found myself hurrying through the historical writings of church fathers and influential pastors of the past, ultimately skipping them most days. 
                The topics they write about are out of touch with today's world, and I found them increasingly nationalistic, morally legalistic, and espousing theological concepts 
                that are no longer as widely believed in modern scholarship.
              </Text>
              <Text style={styles.text}>
                The prayers also had some similar problems, but mostly I found they were one sentence prayers closed by a length mantra invoking the Trinity, which feels like a relic of 
                the early church days when they were fighting through all that. It just really started feeling like vain words.
              </Text>
              <Text style={styles.text}>                
                And once you cut both the lessons and the prayers, you realize most of what is left is a daily plan and selections of Biblical text to be read. In reality, what I was 
                realizing was that as wonderful as this printed book is, there's some inflexibility to it, as every new option requires more and more pages. 
                And as good as it was, For All The Saints was already 4 full volumes, each one over a thousand pages. Really, it was time to make something digital.
              </Text>
              <Text style={styles.text}>
                So what you see here is basically that--a digital approximation of the daily prayers in For All The Saints. All the writings of church fathers 
                and influential pastors of the past are removed, as are all the prayers in the lessons and psalms. What remains is only the liturgical parts and 
                a Bible in a year lectionary. 
              </Text>
              <Text style={styles.text}>
                The Bible in a year lectionary part you may find a bit strange, so it's worth going over. It starts in Tanakh order of the Old Testament, 
                and New Testament is Gospels matrixed into epistles. 
                It's basically Mark, Peters, and Jude followed by Matthew, James, and Hebrews, then Luke, Acts, and Paul according to written order, then the Johanine corpus. 
                You'll read this both in Matins and Vespers. Nones and Compline go through Job and Proverbs respectively on a mothly cadence.
              </Text>
              <Text style={styles.text}>
                There are a few changes added too to the services that will be different than the printed For All The Saints. I shored up some of the wording to make 
                it more consistent between the different services, fixed a few places where an Allelulia would sneak in during Lent, added a few short lessons and prayers 
                so that there was one every day of the week, put the "be" back in the Glory Be, and added ridiculous Latin titles over the various sections just because I like them. 
                Finally, rather than reciting hymns I've never heard or sung before, I opted to toss in a Kyrie and a Gloria. There are probably a few more changes, but you get the gist.
              </Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingHorizontal: 40}}>
            <Image style={styles.image} source={cross} resizeMode='contain'/>
            <Text style={{fontStyle: 'italic', padding: 5}}>Your <Text style={{fontWeight: 'bold'}}>word</Text> is a lamp to my feet and a light to my path. (Ps 119:104)</Text>
            <Text style={{fontStyle: 'italic', padding: 5}}>For we walk by <Text style={{fontWeight: 'bold'}}>faith</Text>, not by sight. (2 Cor 5:7)</Text>
            <Text style={{fontStyle: 'italic', padding: 5}}>For sin will have no dominion over you, since you are not under law but under <Text style={{fontWeight: 'bold'}}>grace</Text>. (Rom 6:14)</Text>
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
    height: 350,
    width: 350,
    padding: 10
    /*backgroundColor: '#0553',*/
  },
});