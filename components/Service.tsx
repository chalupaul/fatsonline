import { StyleSheet, Image } from 'react-native';
import { Text, TextProps, View } from '@/components/Themed';
import { Href, Link, LinkComponent } from 'expo-router';
import { Pressable } from 'react-native';
import { PropsWithChildren } from 'react';
import { InLent, InAdvent, In12DaysOfXmas, InEpiphany, ThroughBaptism, IsTransfiguration, UntilAscension, UntilPentecost, AfterPentecost, InHolyWeek, InEastertide, IsEpiphany } from '@/components/Calendar';
import { Entypo } from '@expo/vector-icons';

export function randstr(prefix: string) {
    return Math.random().toString(36).replace('0.',prefix + '_' || '');
}

export class Hour {
    date: Date = new Date();
    title?: string;
    text?: JSX.Element;
    prev?: string;
    next?: string;
    prevLink?: LinkComponent;
    nextLink?: LinkComponent;
    antiphon?: React.JSX.Element[];
    canticleAntiphon?: React.JSX.Element;
    

    constructor(date: Date) {
        // Advent
        //this.date = new Date('2024-12-02');
        // Lent
        //this.date = new Date('2024-03-10');
        this.date = date;

        if (this.inAdvent()) {
          this.antiphon = [
            <LText key={randstr('antiphon')}>Give glory to the coming King.</LText>,
            <CText key={randstr('antiphon')}>Oh, come let us worship him.</CText>
          ];
          
          if (this.date.getMonth() == 11 && this.date.getDate() == 17) {
            this.canticleAntiphon = (<CText>
              O Wisdom, 
              proceeding from the mouth of the Most High, 
              pervading and permeating all ceration, 
              mightily ordering all things: 
              Come and teach us the way of prudence.
            </CText>)
          } else if (this.date.getMonth() == 11 && this.date.getDate() == 18) {
            this.canticleAntiphon = (<CText>
              O Adonai and ruler of the house of Israel,
              who appeared to Moses in the burning bush
              and gave him the Law on Sinai:
              Come with an outstretched arm and redeem us.
            </CText>)
          } else if (this.date.getMonth() == 11 && this.date.getDate() == 19) {
            this.canticleAntiphon = (<CText>
              O Root of Jesse,
              standing as an ensign before the peoples,
              before whom all kings are mute,
              to whom the nations will do homage:
              Come quickly to deliver us.
            </CText>)
          } else if (this.date.getMonth() == 11 && this.date.getDate() == 20) {
            this.canticleAntiphon = (<CText>
              O Key of David and scepter of the house of Israel,
              you open and no one can close,
              you close and no one can open:
              Come and rescue the prisoners 
              who are in darkness and the shadow of death.
            </CText>)
          } else if (this.date.getMonth() == 11 && this.date.getDate() == 21) {
            this.canticleAntiphon = (<CText>
              O Dayspring,
              splendor of light everlasting:
              Come and enlighten those who sit in darknessand in the shadow of death.
            </CText>)
          } else if (this.date.getMonth() == 11 && this.date.getDate() == 22) {
            this.canticleAntiphon = (<CText>
              O King of the nations,
              the ruler they long for,
              the cornerstone uniting all people:
              Come and save us all, whom you formed out of clay.
            </CText>)
          } else if (this.date.getMonth() == 11 && this.date.getDate() == 23) {
            this.canticleAntiphon = (<CText>
              O Emmanuel,
              our king and our lawgiver,
              the anointed of the nations and their Savior:
              Come and save us,  o Lord our God.
            </CText>)
          } else {
            this.canticleAntiphon = (<CText>
              Fear not Mary, you have found favor with the Lord: Behold, you shall conceive and bear a Son. Alleluia.
            </CText>)
          }
        } else if (this.in12Days()) {
          this.antiphon = [
            <LText key={randstr('antiphon')}>Alleluia. Unto us a child is born.</LText>,
            <CText key={randstr('antiphon')}>Oh come, let us worship him. Alleluia.</CText>
          ];
          this.canticleAntiphon = (
            <CText>
              Today Christ is born; today salvation has appeared. Today the just exult and say, "Glory to God in the highest."
            </CText>
          );
        } else if (this.isTransfiguration() || this.throughBaptism()) {
          this.antiphon = [
            <LText key={randstr('antiphon')}>The Word was made flesh, and we beheld his glory.</LText>,
            <CText key={randstr('antiphon')}>Oh, come, let us worship him.</CText>
          ];
          this.canticleAntiphon = (<CText>
            Our Lord and Savior, begotten before all ages, revealed himself to the world. Alleluia.
          </CText>);
        } else if (this.inEpiphany()) {
          this.antiphon = [
            <LText key={randstr('antiphon')}>Give glory to God, our light and our life.</LText>,
            <CText key={randstr('antiphon')}>Oh, come, let us worship him.</CText>
          ];
          this.canticleAntiphon = (<CText>
            Our Lord and Savior, begotten before all ages, revealed himself to the world. Alleluia.
          </CText>);
        } else if (this.inLent()) {
          this.antiphon = [
            <LText key={randstr('antiphon')}>The Lord is near to those who call on him.</LText>,
            <CText key={randstr('antiphon')}>Oh, come, let us worship him.</CText>
          ];
          if (this.inHolyWeek()) {
            this.canticleAntiphon = (<CText>
              Glory to the cross of our Lord Jesus Christ, our salvation, life, and resurrection.
            </CText>);
          } else {
            this.canticleAntiphon = (<CText>
              Let justice roll down like water, and righteousness like an overflowing stream.
            </CText>);
          }
        } else if (this.isBeforeAscension()) {
          this.antiphon = [
            <LText key={randstr('antiphon')}>Alleluia. The Lord is risen indeed.</LText>,
            <CText key={randstr('antiphon')}>Oh, come, let us worship him. Alleluia.</CText>
          ];
          this.canticleAntiphon = (<CText>
            This is the day the Lord has made. Alleluia. Let us rejoice and be glad in it. Alleluia.
          </CText>);
        } else if (this.isBeforePentecost()) {
          this.antiphon = [
            <LText key={randstr('antiphon')}>Alleluia. Christ the Lord ascends into heaven.</LText>,
            <CText key={randstr('antiphon')}>Oh, come, let us worship him. Alleluia.</CText>
          ];
          this.canticleAntiphon = (<CText>
            This is the day the Lord has made. Alleluia. Let us rejoice and be glad in it. Alleluia.
          </CText>);
        } else if (this.isAfterPentecost()) {
          this.antiphon = [
            <LText key={randstr('antiphon')}>Give glory to God, our light and our life.</LText>,
            <CText key={randstr('antiphon')}>Oh, come, let us worship him. Allelulia.</CText>
          ];
          this.canticleAntiphon = (<CText>
            When he ascended on high he led a host of captives, and he gave gifts to men.
          </CText>)
        }
        else {
          this.antiphon = []
          this.canticleAntiphon = <></>
        }
    }

    DaysInMonth() {
        const month = this.date.getUTCMonth() + 1  // Remember indexes start at 0, but months start at 1
        const year = this.date.getUTCFullYear()
        const monthdate = new Date(year, month, 0).getDate();
        return monthdate
    }
    DaysInYear() {
        const year = this.date.getUTCFullYear()
        return ((year % 4 === 0 && year % 100 > 0) || year %400 == 0) ? 366 : 365;
    }
    DayOfYear() {
        return (Date.UTC(this.date.getUTCFullYear(), this.date.getUTCMonth(), this.date.getUTCDate()) - Date.UTC(this.date.getUTCFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
    }

    inLent() {
        return InLent(this.date);
    }

    inHolyWeek() {
        return InHolyWeek(this.date);
    }

    inAdvent() {
        return InAdvent(this.date);
    }

    in12Days() {
        return In12DaysOfXmas(this.date);
    }

    isEpiphany() {
        return IsEpiphany(this.date);
    }

    inEpiphany() {
        return InEpiphany(this.date);
    }

    inEasterTide() {
        return InEastertide(this.date);
    }

    throughBaptism() {
        return ThroughBaptism(this.date);
    }

    isTransfiguration() {
        return IsTransfiguration(this.date);
    }

    isBeforeAscension() {
        return UntilAscension(this.date);
    }

    isBeforePentecost() {
        return UntilPentecost(this.date);
    }

    isAfterPentecost() {
        return AfterPentecost(this.date);
    }

    private _makeLink(hourName: string | undefined, isPrev: boolean) {
        const hrn: string = `${hourName}`.toLowerCase();
        const hrnFixed: string = hrn.charAt(0).toUpperCase() + hrn.slice(1)
        return (
            <Link href={("/(hours)/" + hrn) as Href<string>} replace asChild>
                <Pressable>
                    <Text style={styles.title}>{isPrev && '<'} {hrnFixed} {!isPrev && '>'}</Text>
                </Pressable>
            </Link>
        )
    }

    makeNext() {
        if (this.next === undefined) return null;
        return this._makeLink(this.next, false);
    }

    makePrev() {
        if (this.prev === undefined) return null;
        return this._makeLink(this.prev, true);
    }
}

interface HourServiceProps {
    hour: Hour;
}



export default function HourService(props: HourServiceProps): JSX.Element {
    //const cross = useAssets([require('../assets/images/cross.png')])[0] as ImageSourcePropType;
    const cross = require('../assets/images/luther_rose.png')
    const privLink: any = props.hour.makePrev();
    const nextLink: any = props.hour.makeNext();
    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between', alignContent: 'center', width: '100%', paddingHorizontal: 15}}>
            <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 2.5}}>
                <Link href="/" asChild>
                    <Image style={styles.image} source={cross} resizeMode='contain'/>
                </Link>
            </View>
            <View style={{flex: 1, paddingLeft: 10}}>
                <Text style={styles.title}>{props.hour.title}</Text>
                <Text>{props.hour.date.toLocaleDateString("en-US", dateOptions)}</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', flex: .05}}>
                <Link href="/info" asChild>
                    <Pressable>
                        <Entypo name="info-with-circle" size={24} />
                    </Pressable>
                </Link>

            </View>
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <View style={styles.body}>
                {props.hour.text}
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <View style={styles.footer}>
                <View style={{paddingBottom: 25}}>{privLink !== null && privLink}</View>
                <View></View>
                <View style={{paddingBottom: 25}}>
                    {nextLink !== null && nextLink}
                </View>
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
        fontWeight: 'normal'
    },
    image: {
        flex: 1,
        height: 50,
        width: 50,
        /*backgroundColor: '#0553',*/
      },
});

export function Section(props: PropsWithChildren) {
    return (
        <View style={{marginVertical: 10}}>{props.children}</View>
    )
}
export function SectionTitle(props: TextProps): JSX.Element {
    return (
        <Text style={{fontVariant: ['small-caps'], paddingBottom: 5, fontSize: 16}}>{props.children}</Text>
    )
}
export function LText(props:TextProps) {
    return (
        <View>
            <View style={styles.textContainer}>
                <Text style={styles.textHeader}>
                    L:
                </Text>
                <Text style={styles.text}>
                    {props.children}
                </Text>
        </View>
    </View>
    )
}

export function CText(props:TextProps) {
    return (
        <View>
            <View style={styles.textContainer}>
                <Text style={styles.textHeader}>
                    C:
                </Text>
                <Text style={styles.text}>
                    {props.children}
                </Text>
        </View>
    </View>
    )
}

export function NText(props:TextProps) {
    return (
        <View>
            <View style={styles.textContainer}>
                <Text style={styles.textHeader}>
                </Text>
                <Text style={styles.text}>
                    {props.children}
                </Text>
        </View>
    </View>
    )
}

export function TextSpacer() {
    return <View><span>&nbsp;</span></View>
}

export function GloryBe(props:TextProps) {
    return (
    <Section>
        <SectionTitle>Gloria Patri</SectionTitle>
        <View>
            <CText>
                Glory be to the Father, and to the Son, and to the Holy Spirit; 
                as it was in the beginning, is now and will be forever.
            </CText>
            <TextSpacer />
            <NText>Amen.</NText>
        </View>
        <View>{props.children}</View>
    </Section>
    )
}

export function Kyrie() {
    return (
        <Section>
            <SectionTitle>Kyrie Eleison</SectionTitle>
            <LText>O Lord,</LText>
            <CText>Have mercy upon us.</CText>
            <TextSpacer />
            <LText>O Christ,</LText>
            <CText>Have mercy upon us.</CText>
            <TextSpacer />
            <LText>O Lord,</LText>
            <CText>Have mercy upon us.</CText>
            <TextSpacer />
            <NText>Amen.</NText>
        </Section>
    )
}

export function Gloria() {
    return (
        <Section>
            <SectionTitle>Gloria</SectionTitle>
            <LText>Glory to God in the highest!</LText>
            <CText>And on earth peace among those with whom he is pleased!</CText>
            <TextSpacer />
            <NText>Amen.</NText>
        </Section>
    )
}

export function AgnusDei() {
    return (
        <Section>
            <SectionTitle>Agnus Dei</SectionTitle>
            <LText>Lamb of God, you take away the sins of the world.</LText>
            <CText>Grant us peace.</CText>
        </Section>
    )
}

export function Oremus() {
    return (
        <>
        <Section>
            <SectionTitle>Oremus</SectionTitle>
            <LText>Let us pray...</LText>
            <TextSpacer />
            <NText><Text style={{fontStyle: "italic"}}>Prayer is Spoken.</Text></NText>
        </Section>
            
        </>
    )
}

export function Venite() {
    return (
        <Section>
            <SectionTitle>Venite</SectionTitle>
            <CText>
            Oh come, let us sing to the Lord;
            let us make a joyful noise to the rock of our salvation!
            Let us come into his presence with thanksgiving;
            let us make a joyful noise to him with songs of praise!
            For the Lord is a great God,
            and a great King above all gods.
            In his hand are the depths of the earth;
            the heights of the mountains are his also.
            The sea is his, for he made it,
            and his hands formed the dry land.
            </CText>
            <TextSpacer />
            <NText>
            Oh come, let us worship and bow down;
            let us kneel before the Lord, our Maker!
            For he is our God,
            and we are the people of his pasture,
            and the sheep of his hand.
            Today, if you hear his voice,
            do not harden your hearts, as at Meribah,
            as on the day at Massah in the wilderness,
            when your fathers put me to the test
            and put me to the proof, though they had seen my work.
            For forty years I loathed that generation
            and said, “They are a people who go astray in their heart,
            and they have not known my ways.”
            Therefore I swore in my wrath,
            “They shall not enter my rest.”
            </NText>
        </Section>
    )
}

export function VoceMea() {
    return (
        <Section>
            <SectionTitle>Voce Mea Ad Dominum Clamavi</SectionTitle>
            <CText>
                O Lord, I call upon you; hasten to me!
                Give ear to my voice when i call to you!
                Let my prayer be counted as incense before you,
                and the lifting up of my hands as the evening sacrifice!
            </CText>
            <TextSpacer />
            <NText>
                Set a guard, O Lord, over my mouth;
                keep watch over the door of my lips!
                Do not let my heart incline to any evil,
                to busy myself with wicked deedsin company with men who work iniquity,
                and let me not eat of their delicacies!
            </NText>
            <TextSpacer />
            <NText>
                Let a righteous man strike me--it is a kindness;
                let him rebuke me--it is oil for my head;
                let my head not refuse it.
                Yet my prayer is continually against their evil deeds.
                When their judges are thrown over the cliff,
                then they shall hear my words, for they are pleasant.
                As when one plows and breaks up the earth,
                so shall our bones be scattered at the mouth of Sheol.
            </NText>
            <TextSpacer />
            <NText>
                But my eyes are toward you, O God, my Lord;
                in you I seek refuge; leave me not defenseless!
                Keep me from the trap that they have laid for me
                and from the snares of evildoers!
                Let the wicked fall into their own nets,
                while I pass by safely.
            </NText>
        </Section>
    )
}

export function Benedictus() {
    return (
        <Section>
            <SectionTitle>Benedictus</SectionTitle>
            <CText>
                Blessed be the Lord God of Israel,
                for he has visited and redeemed his people
                and has raised up a horn of salvation for us
                in the house of his servant David,
                as he spoke by the mouth of his holy prophets from of old,
                that we should be saved from our enemies
                and from the hand of all who hate us;
                to show the mercy promised to our fathers
                and to remember his holy covenant,
                the oath that he swore to our father Abraham, to grant us
                that we, being delivered from the hand of our enemies,
                might serve him without fear,
                in holiness and righteousness before him all our days.
            </CText>
            <TextSpacer />
            <NText>
                And you, child, will be called the prophet of the Most High;
                for you will go before the Lord to prepare his ways,
                to give knowledge of salvation to his people
                in the forgiveness of their sins,
                because of the tender mercy of our God,
                whereby the sunrise shall visit us from on high
                to give light to those who sit in darkness and in the shadow of death,
                to guide our feet into the way of peace.
            </NText>
        </Section>
    )
}

export function Magnificat() {
    return (
        <Section>
            <SectionTitle>Magnificat</SectionTitle>
            <CText>
                My soul magnifies the Lord, 
                and my spirit rejoices in God my Savior, 
                for he has looked on the humble estate of his servant. 
                For behold, from now on all generations will call me blessed; 
                for he who is mighty has done great things for me, and holy is his name. 
                And his mercy is for those who fear him from generation to generation. 
                He has shown strength with his arm; 
                he has scattered the proud in the thoughts of their hearts; 
                he has brought down the mighty from their thrones and exalted those of humble estate; 
                he has filled the hungry with good things, and the rich he has sent away empty. 
                He has helped his servant Israel, in remembrance of his mercy, 
                as he spoke to our fathers, to Abraham and to his offspring forever.
            </CText>
        </Section>
    )
}

export function OurFatherText() {
    return (
        <>
        <CText>
            Our Father, who art in heaven, halowed be thy name.
            Thy kingdom come, thy will be done, on earth as it is in heaven.
            Give us this day our daily bread, and forgive us our tresspasses
            as we forgive those who tresspass against us.
            And lead us not into temptation, but deliver us from evil.
            For thine is the kingdom, and the power, and the glory forever and ever.
        </CText>
        <TextSpacer />
        <NText>Amen.</NText>
        </>
    )
}
export function OurFather() {
    return (
        <Section>
            <SectionTitle>Pater Noster</SectionTitle>
            <LText>Lord, remember us in your kingdom, and teach us to pray:</LText>
            <OurFatherText />
        </Section>
    )
}

export function ApostlesCreed() {
    return (
        <Section>
          <SectionTitle>Apostles Creed</SectionTitle>
          <CText>
            I believe in God, the father almighty, creator of heaven and earth.
          </CText>
          <TextSpacer />
          <NText>
            I believe in Jesus Christ, his only Son, our Lord,
            who was conceived by the Holy Spirit,
            born of the Virgin Mary,
            suffered under Pontius Pilate,
            was crucified, died, and was buried.
            He descended to the dead.
            On the third day he rose again.
            He ascended into heaven.
            He is seated at the right hand of the Father,
            and he will come to judge the living and the dead.
          </NText>
          <TextSpacer />
          <NText>
            I believe in the Holy Spirit,
            the holy catholic church,
            the communion of saints,
            the forgiveness of sins,
            the resurrection of the body,
            and the life everlasting.
          </NText>
          <TextSpacer />
          <NText>Amen.</NText>
        </Section>
    )
}

export function NiceneCreed() {
    return (
        <Section>
            <SectionTitle>Nicene Creed</SectionTitle>
            <CText>
                I believe in one God, the Father Almighty, maker of heaven and earth and of all things visible and invisible.
            </CText>
            <TextSpacer />
            <NText>
                And in one Lord Jesus Christ, the only-begotten Son of God, begotten of His Father before all worlds, 
                God of God, Light of Light, very God of very God, begotten, not made, being of one substance with the Father, 
                by whom all things were made; who for us men and for our salvation came down from heaven and was incarnate 
                by the Holy Spirit of the virgin Mary and was made man; and was crucified also for us under Pontius Pilate. 
                He suffered and was buried. And the third day He rose again according to the Scriptures and ascended into 
                heaven and sits at the right hand of the Father. And He will come again with glory to judge both the living and the dead, 
                whose kingdom will have no end.
            </NText>
            <TextSpacer />
            <NText>
                And I believe in the Holy Spirit, the Lord and Giver of Life, who proceeds from the Father and the Son, 
                who with the Father and the Son together is worshiped and glorified, who spoke by the prophets. 
                And I believe in one holy Christian and apostolic Church, I acknowledge one Baptism for the remission of sins, 
                and I look for the resurrection of the dead and the life of the world to come.
            </NText>
            <TextSpacer />
            <NText>Amen.</NText>
        </Section>
    )
}