import { StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { View, Text } from '@/components/Themed';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { A } from '@expo/html-elements';

type ExternalLinkProps = {
  url: string
  text: string
}
const ExternalLink = (props: ExternalLinkProps) => {
  const handlePress = async () => {
    const supported = await Linking.canOpenURL(props.url);

    if (supported) {
      await Linking.openURL(props.url);
    } else {
      console.error(`Don't know how to open this URL: ${props.url}`);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={{ color: 'blue', textDecorationLine: 'underline'}}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

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
                and finally found <ExternalLink url="https://www.alpb.org/product/for-all-the-saints-a-prayer-book-for-and-by-the-church/" text="For All The Saints" /> from 
                the American Lutheran Publishing Board. Now after working through it in its entirity, I find myself wanting to make a few changes. 
              </Text>
              <Text style={styles.text}>
                For starters, I want to make it easier to have lessons in every service. The four daily lessons in the book have only one set of opening and closing prayers, 
                meaning it looks like it is meant to be read only once per day. Additionally, I want a reading system that covers the entire 
                Bible in a year without skipping over the weird or boring parts. I also want a monthly Psalter that flexes to accomidate February just as well as it does May.
              </Text>
              <Text style={styles.text}>
                Speaking of the lessons, I find myself hurrying through the historical writings of Church fathers and influential pastors of the past, ultimately skipping them most days. 
                The topics they wrote about are out of touch with today's world, and I find their texts increasingly nationalistic, morally legalistic, and espousing theological concepts 
                that are no longer widely attested in modern scholarship. This has honestly become more damaging than beneficial for me, and the genesis of this project is addressing that very thing. 
              </Text>
              <Text style={styles.text}>
                The prayers also have some similar theological problems, but mostly I find they are simply one sentence prayers closed by a lengthy mantra invoking the Trinity like you would "empower a spell". This mantra feels like a relic of 
                earlier church days when the councils were fighting through Trinitarianism and Christology. But now, they just feel like vain words. The same is true for components of the service that are frequently repeated
                like the Glory Be, and even the Venite. Finally, the hymns are problematic. For starters, the hymns seem to be mostly medieval which makes relating to them difficult. 
                Similar to the prayer problem, their last verse is almost always just invoking the Trinity like an Athanasian zealot. But the main issue is that they are just no longer appropriate for these services. 
                Let's face it: These are basically done by individuals or at best a their immediate family.
                Singing a medieval hymn nobody has ever heard sung before is not exactly edifying to the participants, especially if you're by yourself. 
              </Text>
              <Text style={styles.text}>
                So anyway, once I decided to cut all that, most of what is left is just a seasonal structured liturgy plan. So what you see here is basically a digital approximation 
                of the underpinning structure in For All The Saints. All the writings of influential pastors of the past are removed, as are all the prayers in the lessons, and hymns. What remains is only the liturgical parts, and 
                I have added a bit to that in order to make the services smoother. There is also a Bible in a year lectionary in ESV. 
                Thus what you see is my attepmt to bring this wonderful form of daily prayer to a modern Lutheran audience who wants to pray the hours more devotionally,
                all the while staying in tradition with the original office of hours that this whole notion is based on.
              </Text>
              <Text style={styles.text}>
                To that end, you'll find quite a few changes. The confession is said every service, first and foremost.  I think the Book of Common Prayer gets this part right. 
                After all, it's not like I only sin right before Vespers. I have also added some prayer hints to the various services. This is mostly based on the original hourly themes, 
                but includes contemplative morning meditation in Matins and the Examen in Vespers. Finally, after some experimentation I discovered that Psalm fatigue is real.
                After you do Vinete/Jubilate and then 3 more immediately following, it gets harder to effectively pray a Psalm with every new one. 
                So this breviary foregoes the traditional daily Psalms in favor of just having a monthly Psalm rotation in all services.
              </Text>
              <Text style={styles.text}>
                The Bible in a year lectionary part you may find a bit strange, so it's worth going over. 
                It starts in the Old Testament with Hebrew Scripture order, which is likely <ExternalLink url="https://en.wikipedia.org/wiki/Hebrew_Bible#Books" text="different than you're used to"/> seeing, but has some neat advantages.
                The New Testament changes quite a bit as with the Gospels matrixed into the epistles. 
                It's basically Mark, Peters, and Jude followed by Matthew, James, and Hebrews, then Luke, Acts, and Paul according to written order, then the Johanine corpus. 
                This is basically so that the Gospels are spread out a bit more and the epistles are closer to their related Gospel material. 
                These readings are only in Matins and Vespers. Noon has alternating Apostles and Nicene creeds, and Compline is the shortest as most of the time it is undergone immediately before bed.
              </Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingHorizontal: 40, paddingTop: 40}}>
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